const router = require('express').Router();
const { signUp,verifyOtp, createMenu, addCart, hotel, getHotel, deleteHotel, getMenu, deleteMenu } = require('../controllers/userController');

router.route('/signup')
.post(signUp);
router.route('/signup/verify')
.post(verifyOtp);
router.route('/menustore')
.post(createMenu)
.get(getMenu)
.delete(deleteMenu);
router.route('/addtocart')
.post(addCart);
router.route('/hotel')
.post(hotel)
.get(getHotel)
.delete(deleteHotel);



module.exports = router