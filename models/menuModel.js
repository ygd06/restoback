const { createReadStream, unlinkSync } = require('fs');
const { v4: uuidv4 } = require('uuid');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);
const { Menu } = require('../models/menu');

module.exports.createMenu = async (req, res) => {
  try {
    const { category, itemtype, itemname, price } = req.body;
    const { image } = req.files; // Assuming you're using a file upload library like `express-fileupload`

    // Check if the item already exists in the menu
    const existingItem = await Menu.findOne({ itemname });

    if (existingItem) {
      return res.status(409).json({ message: 'Item already exists in the menu' });
    }

    // Generate a unique file name for the image
    const fileName = `${uuidv4()}.${image.name.split('.').pop()}`;

    // Upload the image file to your desired storage location (e.g., AWS S3)
    await pipeline(createReadStream(image.tempFilePath), createWriteStream(`PATH_TO_UPLOAD_FOLDER/${fileName}`));

    // Save the menu item to the database, including the image URL
    const menu = new Menu({
      category,
      itemtype,
      itemname,
      price,
      image: `URL_TO_UPLOAD_FOLDER/${fileName}` // Replace with the actual URL of your uploaded image
    });

    await menu.save();

    // Remove the temporary file from the server
    unlinkSync(image.tempFilePath);

    return res.status(201).json({ message: 'Menu item created successfully' });
  } catch (error) {
    console.error('Error creating menu item:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
