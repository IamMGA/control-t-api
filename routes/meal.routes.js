const express = require('express');
const router = express.Router();
const mealController = require('../controllers/meal.controller');
const secureMiddleware = require('../middleware/secure.middleware');
const mealsMiddleware = require('../middleware/meals.middleware');

router.get('/', secureMiddleware.isAuthenticated, mealController.list);
router.get('/:id', secureMiddleware.isAuthenticated, mealsMiddleware.checkValidId, mealController.get);
router.post('/', secureMiddleware.isAuthenticated, mealController.create);
router.put('/:id', secureMiddleware.isAuthenticated, mealsMiddleware.checkValidId, mealsMiddleware.isMealCreator, mealController.edit);

module.exports = router;