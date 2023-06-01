module.exports.createMenu = async (req, res) => {
  try {
    const { category, itemtype, itemname, price } = req.body;

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
      price
    });

    // Save the menu item to the database
    await menu.save();

    return res.status(201).json({ message: 'Menu item created successfully' });
  } catch (error) {
    console.error('Error creating menu item:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};