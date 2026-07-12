const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Role = require('../models/Role');

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Safety Net
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // 1. Check User Table for Email
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 2. Check Role Table for Role NAME (Safe Query)
    let userRole = await Role.findOne({ where: { name: role } });
    if (!userRole) {
      userRole = await Role.create({ name: role });
    }

    // 3. Create User
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      roleId: userRole.id
    });

    const token = jwt.sign(
      { id: newUser.id, role: userRole.name },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.status(201).json({
      message: 'Account created successfully',
      token,
      user: { email: newUser.email, role: userRole.name, name: newUser.name }
    });
  } catch (error) {
    console.error('Registration Crash:', error);
    res.status(500).json({ error: 'Server Error during registration' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }
    
    // Check User Table
    const user = await User.findOne({ where: { email: email } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });

    // Fetch Role separately
    const userRole = await Role.findByPk(user.roleId);
    const roleName = userRole ? userRole.name : 'FLEET_MANAGER';

    const token = jwt.sign(
      { id: user.id, role: roleName },
      process.env.JWT_SECRET,
      { expiresIn: '8h' } 
    );

    res.status(200).json({
      token,
      user: { email: user.email, role: roleName, name: user.name }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login };