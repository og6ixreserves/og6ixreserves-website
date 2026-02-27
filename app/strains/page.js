'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function Strains() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [strainFilter, setStrainFilter] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const fetchedProducts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (strainFilter === 'All') setFilteredProducts(products);
    else setFilteredProducts(products.filter(p => p.strainType.toLowerCase() === strainFilter.toLowerCase()));
  }, [strainFilter, products]);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Premium Strains</h1>
      <div style={{ marginBottom: '2rem' }}>
        <label htmlFor="strainFilter" style={{ marginRight: '1rem' }}>Filter by Strain:</label>
        <select
          id="strainFilter"
          value={strainFilter}
          onChange={e => setStrainFilter(e.target.value)}
          style={{ background: '#1a1a1a', color: '#fff', border: '1px solid #990000', padding: '0.5rem', borderRadius: '4px' }}
        >
          <option value="All">All</option>
          <option value="Indica">Indica</option>
          <option value="Sativa">Sativa</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </div>
      <div className="product-grid">
        {filteredProducts.length > 0 ? filteredProducts.map(product => (
          <div key={product.id} className="card">
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.strainType} • THC: {product.thcPercentage}% • ${product.price}/g</p>
            <Link href={`/product/${product.id}`}><button>View Details</button></Link>
          </div>
        )) : <p>No products match this filter.</p>}
      </div>
    </div>
  );
}