const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');
const auth = require('../middleware/authMiddleware');

router.get('/profile', auth, async (req, res) => {
  try {
    const doc = await db.collection('users').doc(req.user.uid).get();
    if (!doc.exists) return res.status(404).json({ message: 'User not found' });
    res.json(doc.data());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
