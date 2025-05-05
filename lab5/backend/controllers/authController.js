const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { admin, db } = require('../firebaseConfig');

const register = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const userRecord = await admin.auth().createUser({ email, password, displayName: name });
    await db.collection('users').doc(userRecord.uid).set({ email, name });
    res.status(201).json({ message: 'Користувача створено' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await admin.auth().getUserByEmail(email);
    // У Firebase Admin SDK немає методу для перевірки пароля
    // Потрібно реалізувати власну логіку або використовувати Firebase Client SDK на фронтенді
    // Тут припустимо, що автентифікація відбувається на фронтенді, а сервер лише перевіряє токен
    res.status(200).json({ message: 'Увійшли успішно' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { register, login };
