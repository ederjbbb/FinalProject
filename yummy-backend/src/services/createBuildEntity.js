/**
 * Creates a buildEntity function for a specific sequelize entity
 */
const createBuildEntityFrom = (sequelizeEntity) => {
    const _sequelizeEntity = sequelizeEntity;

    return (requestBody) => {
        const entity = {};
        Object.keys(_sequelizeEntity.rawAttributes).forEach(attribute => {
            if (requestBody.hasOwnProperty(attribute))
                entity[attribute] = requestBody[attribute];
        });
        return entity;
    }
}

module.exports = createBuildEntityFrom;