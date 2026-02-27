'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [ageVerified, setAgeVerified] = useState(false);
  const router = useRouter();

  const handleYes = () => setAgeVerified(true);
  const handleNo = () => alert('You must be 19+ to access.');

  if (!ageVerified) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Welcome to OG 6IX RESERVES</h1>
        <p>Are you 19+?</p>
        <button onClick={handleYes} style={{ marginRight: '1rem' }}>Yes</button>
        <button onClick={handleNo}>No</button>
      </div>
    );
  }

  return (
    <>
      <header>
        <nav>
          <a href="/strains">Strains</a>
          <a href="/cart">Cart</a>
          <a href="/login">Login</a>
          <a href="/admin">Admin</a>
        </nav>
      </header>
      <section className="hero">
        <h1>Luxury Cannabis Flower Delivery</h1>
        <p>Downtown Toronto • Scarborough • Etobicoke | Free delivery over $150</p>
      </section>
      <section style={{ padding: '2rem' }}>
        <p>Browse strains and place your order. All payments are manual (e-transfer / cash).</p>
      </section>
    </>
  );
}