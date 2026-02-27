'use client';
import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function Admin() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [name, setName] = useState('');
  const [strainType, setStrainType] = useState('');
  const [price, setPrice] = useState('');
  const [thc, setThc] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (!user) router.push('/login');

    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, 'products'));
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    const fetchOrders = async () => {
      const snapshot = await getDocs(collection(db, 'orders'));
      setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchProducts();
    fetchOrders();
  }, [user]);

  const addProduct = async () => {
    await addDoc(collection(db, 'products'), { name, strainType, price: parseFloat(price), thcPercentage: parseFloat(thc), imageUrl });
    alert('Product added'); window.location.reload();
  };

  const removeProduct = async (id) => {
    await deleteDoc(doc(db, 'products', id));
    alert('Deleted'); window.location.reload();
  };

  if (!user) return null;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin Dashboard</h1>
      <button onClick={logout}>Logout</button>
      <h2>Add Product</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Strain Type" value={strainType} onChange={e => setStrainType(e.target.value)} />
      <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
      <input placeholder="THC %" value={thc} onChange={e => setThc(e.target.value)} />
      <input placeholder="Image URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
      <button onClick={addProduct}>Add</button>

      <h2>Existing Products</h2>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.name} • ${p.price} • {p.strainType} <button onClick={() => removeProduct(p.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Orders</h2>
      <ul>
        {orders.map(o => (
          <li key={o.id}>{o.customerName} • {o.address} • {o.phone} • {o.cart.length} items • {o.status}</li>
        ))}
      </ul>
    </div>
  );
}