'use client';
import { useCart } from '../../hooks/useCart';
import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!name || !address || !phone) return alert('Fill all fields');
    await addDoc(collection(db, 'orders'), {
      customerName: name,
      address,
      phone,
      cart,
      createdAt: serverTimestamp(),
      status: 'pending'
    });
    clearCart();
    setSubmitted(true);
  };

  if (submitted) return <p style={{ padding: '2rem' }}>Order submitted! Admin will contact you for payment.</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Checkout</h1>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} />
      <input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
      <button onClick={handleSubmit}>Submit Order</button>
    </div>
  );
}