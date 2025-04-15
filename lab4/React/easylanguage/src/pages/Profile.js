import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { saveUserProfile, getUserProfile } from "../services/firestoreService";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const profile = await getUserProfile(currentUser.uid);
        setUserData(profile);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
        const profile = await getUserProfile(userCredential.user.uid);
        setUserData(profile);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await saveUserProfile(userCredential.user.uid, {
          firstName,
          lastName,
          age,
          email,
        });
        setUser(userCredential.user);
        setUserData({ firstName, lastName, age, email });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setUserData(null);
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">👤 Профіль</h2>
      {user ? (
        <div className="profile-loggedin">
          <p><strong>📧 Email:</strong> {user.email}</p>
          {userData && (
            <>
              <p><strong>🧑 Ім’я:</strong> {userData.firstName}</p>
              <p><strong>👨‍👩‍👧‍👦 Прізвище:</strong> {userData.lastName}</p>
              <p><strong>🎂 Вік:</strong> {userData.age}</p>
            </>
          )}
          <button className="logout-btn" onClick={handleLogout}>Вийти</button>
        </div>
      ) : (
        <form className="auth-form" onSubmit={handleAuth}>
          <h3>{isLogin ? "Вхід" : "Реєстрація"}</h3>
          {error && <p className="auth-error">{error}</p>}

          {!isLogin && (
            <>
              <div className="form-group">
                <label>Ім’я:</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Прізвище:</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Вік:</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Пароль:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            {isLogin ? "Увійти" : "Зареєструватися"}
          </button>

          <p className="switch-mode" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Не маєш акаунта? Зареєструйся" : "Вже маєш акаунт? Увійди"}
          </p>
        </form>
      )}
    </div>
  );
}
