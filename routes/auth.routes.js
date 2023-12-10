const { Router } = require('express');

const { login, signUp } = require('../controllers/auth.controller');

const router = Router();

router.route('/login').post(login);
router.route('/sign-up').post(signUp);

module.exports = router;
