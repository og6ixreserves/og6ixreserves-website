'use client';
import { useState, useEffect, createContext, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);