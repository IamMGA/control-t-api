const express = require('express');
const router = express.Router();
const secureMiddleware = require('../middleware/secure.middleware');

const usersController = require('../controllers/users.controller');

router.post('/', usersController.create);
router.put('/', usersController.editProfile);

module.exports = router;