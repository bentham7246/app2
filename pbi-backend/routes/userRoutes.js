const express = require('express');

// const { createUser } = require('../controllers/userController');
const {
  login
} = require('../controllers/authController');

const router = express.Router();


router.post('/login', login);


module.exports = router;
