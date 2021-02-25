'use strict';

const auth = require('./common/auth').authenticate('jwt');
const express = require('express');
const user = require('./user');

const router = express.Router();

// Public routes:
router.use(user.path, user.router);

// Protected routes:
router.use(auth);

module.exports = router;
