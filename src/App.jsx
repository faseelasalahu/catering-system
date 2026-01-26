import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Product from "./Pages/Product";
import { useAuthStore } from "./Store/useAuthStore";
import { useEffect } from "react";
import { CartProvider } from "./Context/CartContext";

import AddProduct from "./Pages/AddProduct";
import CartPage from "./Pages/CartPage";
import CheckOut from "./Pages/CheckOut";
import Success from "./Pages/Success";
import MyOrder from "./Pages/MyOrder";
export default function () {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth(); // check whether user or not when app start
  }, [checkAuth]);

  return (
    <BrowserRouter>
      <CartProvider>
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product" element={<Product />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/cartpage" element={ <CartPage />} />
          <Route path="/checkout" element={ <CheckOut />} />
          <Route path="/success" element={ <Success />} />
          <Route path="/order" element={ <MyOrder/>} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}
