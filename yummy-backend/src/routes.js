const express = require('express');
const router = express.Router();
const {
    authMerchant,
    authCustomer,
    authAdmin,
    auth
} = require('./midlewares/auth');
const { 
    authController,
    usersController,
    restaurantsController,
    mealsController,
    ordersController
} = require('./controllers');

/* Status */
const ok = (_, res) => res.send({result: 'Ok', env: `${process.env.NODE_ENV}` });
router.get('/', ok);
router.get('/api/v1/status', ok);

/* Auth */
router.post('/api/v1/auth/sendSMS', authController.sendSMS);
router.post('/api/v1/auth/validateSMS', authController.validateSMS);
router.post('/api/v1/auth/login', authController.login);
router.post('/api/v1/auth/logout', auth, authController.logout);
router.post('/api/v1/auth/logoutAll', auth, authController.logoutAll);
router.post('/api/v1/auth/renew', auth, authController.renew);

/* Users */
router.post('/api/v1/users', usersController.add);
router.get('/api/v1/users/email/:email', usersController.getByEmail);
router.get('/api/v1/users/me', auth, usersController.getByTokenId);
router.patch('/api/v1/users/:id', auth, usersController.update);
router.post('/api/v1/users/:customerId/block', authMerchant, usersController.block);
router.post('/api/v1/users/:customerId/unblock', authMerchant, usersController.unblock);
router.delete('/api/v1/users/:id', authAdmin, usersController.delete);
router.get('/api/v1/users/', authAdmin, usersController.list);
router.get('/api/v1/users/:id', authAdmin, usersController.getById);

/* Restaurants */
router.get('/api/v1/restaurants/public', restaurantsController.listPublic);
router.get('/api/v1/restaurants', auth, restaurantsController.list);
router.get('/api/v1/restaurants/:id', auth, restaurantsController.getById);
router.patch('/api/v1/restaurants/:id', authMerchant, restaurantsController.update);
router.delete('/api/v1/restaurants/:id', authMerchant, restaurantsController.delete);
router.post('/api/v1/restaurants', authMerchant, restaurantsController.add);


/* Meals */
router.get('/api/v1/restaurants/:restaurantId/meals', auth, mealsController.list);
router.get('/api/v1/restaurants/:restaurantId/meals/:id', auth, mealsController.getById);
router.post('/api/v1/restaurants/:restaurantId/meals', authMerchant, mealsController.add);
router.patch('/api/v1/restaurants/:restaurantId/meals/:id', authMerchant, mealsController.update);
router.delete('/api/v1/restaurants/:restaurantId/meals/:id', authMerchant, mealsController.delete);

/* Orders */ 
router.patch('/api/v1/orders/:id', auth, ordersController.update);
router.get('/api/v1/orders/', auth, ordersController.list);
router.get('/api/v1/orders/:id', auth, ordersController.getById);
router.post('/api/v1/orders/', authCustomer, ordersController.add);
router.post('/api/v1/orders/:id/meals/', authCustomer, ordersController.addMealToOrder);

module.exports = router;
