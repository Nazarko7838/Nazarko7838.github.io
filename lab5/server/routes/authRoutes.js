const express = require('express');
const router = express.Router();
const { admin, db } = require('../config/firebase');

router.post('/register', async (req, res) => {
  const { email, password, firstName, lastName, age } = req.body;
  try {
    const userRecord = await admin.auth().createUser({ email, password });
    await db.collection('users').doc(userRecord.uid).set({
      firstName, lastName, age, email,
    });
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
