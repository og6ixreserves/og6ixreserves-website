'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    setUser(res.user);
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  useEffect(() => {
    auth.onAuthStateChanged(setUser);
  }, []);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);