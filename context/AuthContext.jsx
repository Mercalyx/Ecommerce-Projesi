import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const USERS_KEY = "pe_users";
const SESSION_KEY = "pe_session";

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState("");

  // Sayfa yenilendiğinde oturumu localStorage'dan geri yükle
  useEffect(() => {
    const email = localStorage.getItem(SESSION_KEY);
    if (!email) return;
    const found = loadUsers().find((u) => u.email === email);
    if (found) setUser({ name: found.name, email: found.email });
  }, []);

  function register(name, email, password) {
    setAuthError("");
    const users = loadUsers();
    if (users.some((u) => u.email === email)) {
      setAuthError("Bu e-posta adresiyle zaten bir hesap var.");
      return false;
    }
    const newUser = { name, email, password };
    saveUsers([...users, newUser]);
    localStorage.setItem(SESSION_KEY, email);
    setUser({ name, email });
    return true;
  }

  function login(email, password) {
    setAuthError("");
    const found = loadUsers().find((u) => u.email === email && u.password === password);
    if (!found) {
      setAuthError("E-posta veya şifre hatalı.");
      return false;
    }
    localStorage.setItem(SESSION_KEY, email);
    setUser({ name: found.name, email: found.email });
    return true;
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, authError, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
