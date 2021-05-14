const HttpStatus = require('http-status-codes');
const createBuildEntityFrom = require('../services/createBuildEntity');
const { NotFound } = require('../constants/httpErrors');

/**
 * A generic controller factory.
 */
const createGenericController = (sequelizeEntity, validateOwner = false) => {
  const buildEntity = createBuildEntityFrom(sequelizeEntity);

  /**
   * Verifies the user that is doing the request is owner of an entity.
   */
  const isOwner = (req, entity) => {
    const isUserEntity = entity.dataValues.password !== undefined;
    if (!req.auth) // not authenticated
      return false;
    if (isUserEntity) 
      return entity.id === req?.auth.userId;
    return entity.userId && entity.userId === req.auth.userId;
  };

  const hasAccess = (req, entity) => {
    if (!validateOwner)
      return true;

    return isOwner(req, entity);
  }

  const controller = {
    getById(req, res, next) {
      sequelizeEntity
        .findByPk(req.params.id)
        .then(entity =>
          entity && hasAccess(req, entity) ? res.status(HttpStatus.OK).send(entity) : next(NotFound)
        )
        .catch(next);
    },

    add(req, res, next) {
      if (validateOwner)
        req.body.userId = req.auth.userId;

      sequelizeEntity
        .create(buildEntity(req.body))
        .then(entity => res.status(HttpStatus.CREATED).send(entity))
        .catch(next);
    },

    list(req, res, next) {
      const query = {
        order: [
          ['id', 'ASC']
        ],
      };

      if (validateOwner && req.auth)
        query['where'] = { userId: req.auth.userId };

      sequelizeEntity
        .findAll(query)
        .then(entities => res.status(HttpStatus.OK).send(entities))
        .catch(next);
    },

    update(req, res, next) {
      sequelizeEntity
        .findByPk(req.params.id)
        .then(entity => {
          if (!entity || !hasAccess(req, entity))
            throw NotFound;

          return entity.update(buildEntity(req.body));
        })
        .then((result) => {
          res.status(HttpStatus.OK).send(result)
        })
        .catch(next);
    },

    delete(req, res, next) {
      sequelizeEntity
        .findByPk(req.params.id)
        .then(entity => {
          if (!entity || !hasAccess(req, entity))
            next(NotFound);

          return entity.destroy();
        })
        .then(() => res.status(HttpStatus.NO_CONTENT).send())
        .catch(next);
    },

    hasAccess: hasAccess
  }

  return controller;
}

module.exports = createGenericController;