const bcrypt = require("bcrypt");
const _ = require("lodash");
const axios = require("axios");
const otpGenerator = require("otp-generator");
const {User} = require('../models/userModel');
const {Otp} = require('../models/otpModel');
const {Menu} = require('../models/menuModel');
const {Cart} = require('../models/cartModel');
const {Hotel} = require('../models/hotelModel');


//Otp
module.exports.signUp = async(req,res) => {
 const user = await User.findOne({
    number: req.body.number
 });
 if(user) return res.status(400).send("User already registered!");
 const OTP = otpGenerator.generate(4, {
    digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false
 });
 const number = req.body.number;
 console.log(OTP);

 const otp  = new Otp({number: number, otp: OTP});
 const salt = await bcrypt.genSalt(10)
 otp.otp = await bcrypt.hash(otp.otp, salt);
 const result = await otp.save();
 return res.status(200).send("Otp sent successfully! ");
}

//VerifyOtp
module.exports.verifyOtp = async(req,res) => {
    const otpHolder = await Otp.find({
        number: req.body.number
    });
    if(otpHolder.length === 0) return res.status(400).send("You used an Expired Otp!");
    const rightOtpFind = otpHolder[otpHolder.length - 1];
    const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);

    if(rightOtpFind.number === req.body.number && validUser) {
        const user = new User(_.pick(req.body, ["number"]));
        const token = user.generateJWT();
        const result = await user.save();
        const OTPDelete = await Otp.deleteMany({
            number: rightOtpFind.number
        });
        return res.status(200).send({
            message: "User Registration Successfull! ",
            token: token,
            data: result
        });
    } else {
        return res.status(400).send("Otp is invalid! ");
    }
}

//Hotel
module.exports.hotel = async (req, res) => {
  try {
    const {id_hotel,hotel_name,avg_time,distance,item_name,favourites,img_url,total_items } = req.body;

    const existingItem = await Hotel.findOne({id_hotel});

    if(existingItem){
      return res.stuatus(409).json({message: 'Hotel already exists in the menu'});
    }

      const hotel = new Hotel ({
        id_hotel,
        hotel_name,
        avg_time,
        distance,
        item_name,
        favourites,
        img_url,
        total_items
      })

      await hotel.save();

      return res.status(201).json({ message: 'Hotel created successfully' });
    }
  catch {
    console.error('Error creating hotel:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

//MenuStorage
module.exports.createMenu = async (req, res) => {
  try {
    const { category, itemtype, itemname, price } = req.body;
    const { image } = req.files;

    // Check if the item already exists in the menu
    const existingItem = await Menu.findOne({ itemname });

    if (existingItem) {
      return res.status(409).json({ message: 'Item already exists in the menu' });
    }

    // Create a new menu item using the Menu model
    const menu = new Menu({
      category,
      itemtype,
      itemname,
      price,
      image
    });

    // Save the menu item to the database
    await menu.save();

    return res.status(201).json({ message: 'Menu item created successfully' });
  } catch (error) {
    console.error('Error creating menu item:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


//Add to cart
module.exports.addCart = async (req,res) => {
  try {
    const { userId, itemId, quantity, price } = req.body;

     // Check if the user exists
     const user = await User.findById(userId);
     if (!user) {
       return res.status(404).json({ message: 'User not found' });
     }
 
     // Check if the item exists in the menu
     const menu = await Menu.findById(itemId);
     if (!menu) {
       return res.status(404).json({ message: 'Item not found in the menu' });
     }
 
     const existingCartItem = await Cart.findOne({ userId: user._id, itemId: menu._id });

    if (existingCartItem) {
      // If the item exists, update the quantity and price
      existingCartItem.quantity += quantity;
      existingCartItem.price += price;
      await existingCartItem.save();
    } else {
      // If the item doesn't exist, create a new cart item
      const cartItem = new Cart({
        userId,
        itemId,
        quantity,
        price
      });
      await cartItem.save();
    }

    res.status(200).json({ message: 'Item added to cart successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
};