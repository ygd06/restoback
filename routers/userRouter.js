const router = require('express').Router();
<<<<<<< HEAD
const { signUp,verifyOtp, createMenu, addCart, hotel, getHotel,getallhotels, deleteHotel, getMenu, getallmenu, deleteMenu, username, getallusernames } = require('../controllers/userController');
=======
const { signUp,verifyOtp, createMenu, addCart, hotel, getHotel,getallhotels, deleteHotel, getMenu, getallmenu, deleteMenu } = require('../controllers/userController');
>>>>>>> d3d25404e33ff706b692b20743a1cce8bfbb3143

router.route('/signup')
.post(signUp);
router.route('/signup/verify')
.post(verifyOtp);
<<<<<<< HEAD
router.route('/username')
.post(username);
=======
>>>>>>> d3d25404e33ff706b692b20743a1cce8bfbb3143
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
<<<<<<< HEAD
router.route('/username/getallusernames')
.get(getallusernames);
=======
>>>>>>> d3d25404e33ff706b692b20743a1cce8bfbb3143



module.exports = router