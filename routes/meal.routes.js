const express = require('express');
const router = express.Router();
const mealController = require('../controllers/meal.controller');
const secureMiddleware = require('../middleware/secure.middleware');

router.get('/', mealController.list);
router.post('/', mealController.create);
router.get('/:text', mealController.get);
router.put('/:id', mealController.edit);

module.exports = router;