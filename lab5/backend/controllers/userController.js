const { db } = require('../firebaseConfig');

const getProfile = async (req, res) => {
  const uid = req.user.uid;
  try {
    const userDoc = await db.collection('users').doc(uid).get();
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'Користувача не знайдено' });
    }
    res.status(200).json(userDoc.data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getProfile };
