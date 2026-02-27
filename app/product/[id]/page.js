'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { useCart } from '../../../hooks/useCart';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setProduct({ id: docSnap.id, ...docSnap.data() });
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p style={{ padding: '2rem' }}>Loading...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} style={{ width: '300px', borderRadius: '8px' }} />
      <p>{product.strainType} • THC: {product.thcPercentage}%</p>
      <p>${product.price}/g</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}