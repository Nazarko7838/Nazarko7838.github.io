import React, { useState, useEffect } from "react";

export default function Profile() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userData, setUserData] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      fetch("http://localhost:3001/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.email) setUserData(data);
          else throw new Error("Невірний токен");
        })
        .catch(() => {
          setToken(null);
          localStorage.removeItem("token");
        });
    }
  }, [token]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");

    const endpoint = isLogin ? "login" : "register";
    const payload = isLogin
      ? { email, password }
      : { email, password, firstName, lastName, age };

    try {
      const res = await fetch(`http://localhost:3001/api/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setUserData(data.user || payload);
      } else {
        throw new Error(data.message || "Помилка авторизації");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUserData(null);
    localStorage.removeItem("token");
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">👤 Профіль</h2>
      {token && userData ? (
        <div className="profile-loggedin">
          <p><strong>📧 Email:</strong> {userData.email}</p>
          <p><strong>🧑 Ім’я:</strong> {userData.firstName}</p>
          <p><strong>👨‍👩‍👧‍👦 Прізвище:</strong> {userData.lastName}</p>
          <p><strong>🎂 Вік:</strong> {userData.age}</p>
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
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Прізвище:</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Вік:</label>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
              </div>
            </>
          )}

          <div className="form-group">
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Пароль:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
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
