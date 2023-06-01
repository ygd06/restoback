const router = require('express').Router();
const { signUp,verifyOtp, createMenu, addCart } = require('../controllers/userController');

router.route('/signup')
.post(signUp);
router.route('/signup/verify')
.post(verifyOtp);
router.route('/menustore')
.post(createMenu);
router.route('/addtocart')
.post(addCart);

module.exports = router