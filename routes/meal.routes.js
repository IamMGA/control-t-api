const express = require('express');
const router = express.Router();
const mealController = require('../controllers/meal.controller');
const secureMiddleware = require('../middleware/secure.middleware');

router.post('/', mealController.create);

module.exports = router;