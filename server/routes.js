const express = require('express');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const pool = require('./db');

const router = express.Router();

// POST /api/register
router.post('/register', async (req, res) => {
  const { name, email, gstin, password } = req.body;
  if (!name || !email || !gstin || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  try {
    // Check for email uniqueness
    const emailCheck = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (emailCheck.rows.length > 0) {
      return res.status(409).json({ error: 'Email already registered.' });
    }
    const password_hash = await bcrypt.hash(password, 10);
    const id = uuidv4();
    await pool.query(
      'INSERT INTO users (id, name, email, gstin, password_hash) VALUES ($1, $2, $3, $4, $5)',
      [id, name, email, gstin, password_hash]
    );
    res.status(201).json({ message: 'Registration successful.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// GET /api/profile (returns the most recently registered user)
router.get('/profile', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT name, email, gstin FROM users ORDER BY created_at DESC LIMIT 1'
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No users found.' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// GET /api/users (admin view)
router.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, email, gstin, created_at FROM users ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// POST /api/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
    const user = result.rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
    res.json({ 
      message: 'Login successful.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        gstin: user.gstin
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router; 