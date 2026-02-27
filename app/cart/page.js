'use client';
import { useCart } from '../../hooks/useCart';
import Link from 'next/link';

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Cart is empty. <Link href="/strains">Browse Strains</Link></p>
      ) : (
        <>
          <ul>
            {cart.map(item => (
              <li key={item.id} style={{ marginBottom: '1rem' }}>
                {item.name} • ${item.price}/g
                <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: '1rem' }}>Remove</button>
              </li>
            ))}
          </ul>
          <p>Total: ${total}</p>
          <button onClick={clearCart}>Clear Cart</button>
          <Link href="/checkout"><button style={{ marginLeft: '1rem' }}>Proceed to Checkout</button></Link>
        </>
      )}
    </div>
  );
}