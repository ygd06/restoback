const router = require('express').Router();
const { signUp,verifyOtp, createMenu, addCart, hotel } = require('../controllers/userController');

router.route('/signup')
.post(signUp);
router.route('/signup/verify')
.post(verifyOtp);
router.route('/menustore')
.post(createMenu);
router.route('/addtocart')
.post(addCart);
router.route('/hotel')
.post(hotel);

module.exports = router