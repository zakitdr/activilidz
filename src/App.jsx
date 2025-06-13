import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import Navbar from "./pages/Navbar";
import AdminPanel from "./pages/AdminPanel";
import AdminLogin from "./pages/AdminLogin";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produits/:category" element={<Products />} />
          <Route path="/produit/:id" element={<ProductPage />} />
          <Route path="/panier" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin-login" element={<AdminLogin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
