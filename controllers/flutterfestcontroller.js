const {FestUser} = require('../models/flutterfestUsermodel');
const bcrypt = require("bcrypt");

module.exports.Signup = async(req,res) => {
    try {
        const { username,email, password } = req.body;
    
        const existingUser = await FestUser.findOne({ username });
        if (existingUser) {
          return res.status(400).json({ error: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newUser = new FestUser({
          username,
          email,
          password: hashedPassword
        });
    
        await newUser.save();
    
        res.status(201).json({ message: 'User created successfully' });
      } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
};

module.exports.Signin = async(req,res)  => {
    try {
      const { username, password } = req.body;
  
      const user = await FestUser.findOne({ username });
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
      res.status(200).json({ message: 'Signin successful' });
    } catch (error) {
      console.error('Error during signin:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };