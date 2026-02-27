'use client';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      await login(email, password);
      router.push('/admin');
    } catch {
      alert('Login failed');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin Login</h1>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
}