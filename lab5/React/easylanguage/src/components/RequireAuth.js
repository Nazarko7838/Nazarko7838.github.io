// src/components/RequireAuth.js
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const RequireAuth = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        alert("Потрібно авторизуватись для доступу до функціоналу сайту");
        setShouldRedirect(true);
      }
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  if (user === undefined) return <p>Завантаження...</p>;
  if (shouldRedirect) return <Navigate to="/profile" />;
  return user ? children : null;
};

export default RequireAuth;
