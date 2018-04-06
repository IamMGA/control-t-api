const express = require('express');
const router = express.Router();
const intakeController = require('../controllers/intake.controller');

const secureMiddleware = require('../middleware/secure.middleware');

router.get('/', secureMiddleware.isAuthenticated, intakeController.todayIntakes);
router.post('/', secureMiddleware.isAuthenticated, intakeController.addIntake);
router.post('/list', secureMiddleware.isAuthenticated, intakeController.intakesByDates);

module.exports = router;