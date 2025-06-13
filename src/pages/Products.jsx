import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import allProducts from "../data/products.json";

const Products = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Read from localStorage first
    const local = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(local.length ? local : allProducts);
  }, []);

  const filtered = category
    ? products.filter((p) => p.category === category)
    : products;

  return (
    <div className="container py-6">
      <h2 className="text-2xl font-bold mb-4">Produits {category && `- ${category}`}</h2>
      {filtered.length === 0 ? (
        <p className="text-gray-600">Aucun produit disponible.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((p, i) => (
            <div key={i} className="border rounded p-3 shadow">
              <img src={p.image} className="w-full h-40 object-cover rounded mb-2" alt={p.name} />
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="text-sm text-gray-500">{p.category}</p>
              <p className="text-green-600 font-bold">{p.price} DA</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
