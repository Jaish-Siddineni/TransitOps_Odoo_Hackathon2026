const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Role = require('../models/Role');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user and include their Role
    const user = await User.findOne({ 
      where: { email },
      include: [{ model: Role }] 
    });

    if (!user) return res.status(404).json({ error: 'User not found' });

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, role: user.Role.name },
      process.env.JWT_SECRET,
      { expiresIn: '8h' } 
    );

    res.status(200).json({
      token,
      user: { email: user.email, role: user.Role.name }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { login };