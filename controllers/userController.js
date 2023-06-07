const bcrypt = require("bcrypt");
const _ = require("lodash");
const axios = require("axios");
const otpGenerator = require("otp-generator");
const {User} = require('../models/userModel');
const {Otp} = require('../models/otpModel');
const {Menu} = require('../models/menuModel');
const {Cart} = require('../models/cartModel');
const {Hotel} = require('../models/hotelModel');
<<<<<<< HEAD
const {Username} = require('../models/usernamemodel');
=======
>>>>>>> d3d25404e33ff706b692b20743a1cce8bfbb3143


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

<<<<<<< HEAD
//Get name
module.exports.username = async (req, res) => {
  try {
    const { name } = req.body;

    const existingUsername = await Username.findOne({ name });

    if (existingUsername) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const newUsername = new Username({ name });

    const createdUsername = await newUsername.save();

    return res.status(201).json({ message: 'Username created successfully'});
  } catch (error) {
    console.error('Error creating username:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

//Get all names
module.exports.getallusernames = async (req, res) => {
  try {

    const usernames = await Username.find();

    if (usernames.length === 0) {
      return res.status(404).json({ message: 'No usernames found' });
    }

    return res.status(200).json({ usernames });
  } catch (error) {
    console.error('Error retrieving usernames:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


=======
>>>>>>> d3d25404e33ff706b692b20743a1cce8bfbb3143
//Post Hotel
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
<<<<<<< HEAD
  catch(error) {
=======
  catch {
>>>>>>> d3d25404e33ff706b692b20743a1cce8bfbb3143
    console.error('Error creating hotel:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

//Get Hotel
module.exports.getHotel = async (req, res) => {
  try {
    const { id_hotel } = req.query;

    const hotel = await Hotel.findOne({ id_hotel });

    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    return res.status(200).json({ hotel });
  } catch (error) {
    console.error('Error retrieving hotel:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

//Get All Hotels
module.exports.getallhotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();

    if (!hotels || hotels.length === 0) {
      return res.status(404).json({ message: 'No hotels found' });
    }

    return res.status(200).json({ hotels });
  } catch (error) {
    console.error('Error retrieving hotels:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


//Delete Hotel
module.exports.deleteHotel = async (req, res) => {
  try {
    const { id_hotel } = req.query;

    const deletedHotel = await Hotel.findOneAndDelete({ id_hotel });

    if (!deletedHotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    return res.status(200).json({ message: 'Hotel deleted successfully' });
  } catch (error) {
    console.error('Error deleting hotel:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


//Post Menu
module.exports.createMenu = async (req, res) => {
  try {
    const { id_hotel,category, itemtype, itemname, price, image } = req.body;

    // Check if the item already exists in the menu
    const existingItem = await Menu.findOne({ itemname });

    if (existingItem) {
      return res.status(409).json({ message: 'Item already exists in the menu' });
    }

    // Create a new menu item using the Menu model
    const menu = new Menu({
      id_hotel,
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

//Get Menu
module.exports.getMenu = async (req, res) => {
  try {
    const { itemname } = req.query;

    const menuItem = await Menu.findOne({ itemname });

    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    return res.status(200).json({ menuItem });
  } catch (error) {
    console.error('Error retrieving menu item:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

//Get all Menu
module.exports.getallmenu = async (req, res) => {
  try {
    const menuDetails = await Menu.find();

    if (!menuDetails || menuDetails.length === 0) {
      return res.status(404).json({ message: 'No menu details found' });
    }

    const hotelItems = {};

    // Group menu items by id_hotel
    menuDetails.forEach(menuItem => {
      const { id_hotel, category, itemtype, itemname, price, image } = menuItem;

      if (!hotelItems[id_hotel]) {
        hotelItems[id_hotel] = {};
      }

      if (!hotelItems[id_hotel][category]) {
        hotelItems[id_hotel][category] = [];
      }

      hotelItems[id_hotel][category].push({
        itemtype,
        itemname,
        price,
        image
      });
    });

    return res.status(200).json({ hotelItems });
  } catch (error) {
    console.error('Error retrieving menu details:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};



//Delete Menu
module.exports.deleteMenu = async (req, res) => {
  try {
    const { itemname } = req.query;

    const deletedMenu = await Menu.findOneAndDelete({ itemname });

    if (!deletedMenu) {
      return res.status(404).json({ message: 'Menu not found' });
    }

    return res.status(200).json({ message: 'Menu deleted successfully' });
  } catch (error) {
    console.error('Error deleting Menu:', error);
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