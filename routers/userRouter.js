const router = require('express').Router();
const { signUp,verifyOtp, createMenu, addCart, hotel, getHotel,getallhotels, deleteHotel, getMenu, getallmenu, deleteMenu, username, getallusernames } = require('../controllers/userController');
const {Signup,Signin} = require('../controllers/flutterfestcontroller');

router.route('/signup')
.post(signUp);


router.route('/festsignup')
.post(Signup);
router.route('/festsignin')
.post(Signin);

router.route('/signup/verify')
.post(verifyOtp);
router.route('/username')
.post(username);
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
router.route('/username/getallusernames')
.get(getallusernames);



module.exports = router