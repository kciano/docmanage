const express = require('express');
const router = express.Router();

const { requireSignin, adminMiddleware } = require('../controller/auth.controller');
const { read, update } = require('../controller/user.controller');

router.get('/user/:id', requireSignin, read);
router.put('/user/update', requireSignin, update);
router.put('/admin/update', requireSignin, adminMiddleware, update);

module.exports = router;