import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import productsJson from '../data/products.json';

const CATEGORIES = ['Streaming', 'Services', 'Codes'];

const AdminPanel = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(null); // null = loading
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [form, setForm] = useState({
    name: '', price: '', image: '', category: '', description: ''
  });

  useEffect(() => {
    const auth = localStorage.getItem('admin-auth');
    if (auth === 'yes') {
      const storedProducts = JSON.parse(localStorage.getItem('products') || '[]');
      const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      setProducts(storedProducts.length ? storedProducts : productsJson);
      setOrders(storedOrders);
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    if (authenticated === false) {
      navigate('/admin-login');
    }
  }, [authenticated, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin-auth');
    navigate('/admin-login');
  };

  const saveProducts = (updated) => {
    setProducts(updated);
    localStorage.setItem('products', JSON.stringify(updated));
  };

  const handleAdd = () => {
    if (!form.name || !form.price) return;
    const updated = [...products, form];
    saveProducts(updated);
    setForm({ name: '', price: '', image: '', category: '', description: '' });
  };

  const handleDelete = (index) => {
    const updated = [...products];
    updated.splice(index, 1);
    saveProducts(updated);
  };

  const filteredProducts = categoryFilter
    ? products.filter(p => p.category === categoryFilter)
    : products;

  if (authenticated === null) return null;

  return (
    <div className="p-8 max-w-screen-xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">🛠️ Admin Dashboard</h1>
        <button onClick={handleLogout} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>

      <div className="bg-white border rounded shadow p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">➕ Add New Product</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input className="border p-2" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <input className="border p-2" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
          <input className="border p-2" placeholder="Image URL" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
          <select className="border p-2" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
            <option value="">Select Category</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <textarea className="border p-2 w-full mb-4" rows="3" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}></textarea>
        <button onClick={handleAdd} className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800">Add Product</button>
      </div>

      <div className="mb-8">
        <label className="font-semibold">📂 Filter by Category:</label>
        <select className="ml-2 border p-2" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
          <option value="">All</option>
          {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {filteredProducts.map((p, i) => (
          <div key={i} className="border p-4 rounded bg-gray-50 shadow-sm flex flex-col justify-between">
            <img src={p.image} alt={p.name} className="h-40 object-cover rounded mb-2" />
            <div>
              <h3 className="text-lg font-bold">{p.name}</h3>
              <p className="text-sm text-gray-500">{p.category}</p>
              <p className="text-green-600 font-semibold">{p.price} DA</p>
              <p className="text-sm mt-1">{p.description}</p>
            </div>
            <button onClick={() => handleDelete(i)} className="mt-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-4">📦 Orders</h2>
        {orders.length === 0 ? (
          <p className="text-gray-500">No orders available.</p>
        ) : (
          <table className="w-full table-auto border border-gray-300 text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Product</th>
                <th className="border p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o, i) => (
                <tr key={i}>
                  <td className="border p-2">{o.name}</td>
                  <td className="border p-2">{o.phone}</td>
                  <td className="border p-2">{o.email}</td>
                  <td className="border p-2">{o.product}</td>
                  <td className="border p-2">{o.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
