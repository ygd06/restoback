const router = require('express').Router();
const { signUp,verifyOtp, createMenu, addCart, hotel, getHotel,getallhotels, deleteHotel, getMenu, getallmenu, deleteMenu } = require('../controllers/userController');

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

router.route('/hotel/getallhotels')
.get(getallhotels);
router.route('/menustore/getallmenu')
.get(getallmenu);



module.exports = router