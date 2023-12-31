
const express = require('express');
const router = express.Router();
const AuthenticationController = require('../controller/Authentication.controller');
const AuthenticationMiddleware = require('../middleware/Authentication.middleware');

router.post('/login', AuthenticationController.loginUser);
router.post('/register', AuthenticationController.registerUser);
router.get('/verify/:token', AuthenticationController.verifyEmail);
router.post('/forgot-password', AuthenticationController.sendOtp);
router.post('/reset-password', AuthenticationController.resetPassword);
router.put('/updateUser', AuthenticationMiddleware.authenticate, AuthenticationController.updateUser);
router.post('/userLocation', AuthenticationMiddleware.authenticate, AuthenticationController.updateUserLocation);
module.exports = router;    