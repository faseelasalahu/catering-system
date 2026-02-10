import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy,Suspense } from "react";
import NavBar from "./Components/NavBar";

const Home = lazy(()=> import ('./Pages/Home')) 
const Login = lazy(()=> import ('./Pages/Login')) 
const Register = lazy(()=> import ('./Pages/Register')) 
const Product = lazy(()=> import ('./Pages/Product')) 
import { useAuthStore } from "./Store/useAuthStore";
import { useEffect } from "react";
import { CartProvider } from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
const AddProduct = lazy(()=> import ('./Pages/AddProduct')) 
const CartPage = lazy(()=> import ('./Pages/CartPage')) 
const CheckOut = lazy(()=> import ('./Pages/CheckOut')) 
const Success = lazy(()=> import ('./Pages/Success')) 
const MyOrder = lazy(()=> import ('./Pages/MyOrder')) 
const AdminDashboard = lazy(()=> import ('./Pages/AdminDashboard')) 
const ProtectedAdminRoute = lazy(()=> import ('./Components/ProtectedAdminRoute')) 
const MenuTable = lazy(()=> import ('./Pages/MenuTable')) 
const Profile= lazy(()=> import ('./Pages/Profile')) 

export default function () {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth(); // check whether user or not when app start
  }, [checkAuth]);

  return (
    <>
    <BrowserRouter>
      <CartProvider>
        <NavBar />
        <Suspense fallback={
        <div className="h-screen flex items-center justify-center bg-white dark:bg-slate-900">
          <p className="text-orange-600 font-bold animate-pulse">Loading DishDash...</p>
        </div>
      }></Suspense>
<Toaster position="top-center" reverseOrder={false} />
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product" element={<Product />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/cartpage" element={<CartPage />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/success" element={<Success />} />
          <Route path="/order" element={<MyOrder />} />
           <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
           <Route path="/menu" element={<MenuTable />} />
            <Route path="/profile" element={<Profile />} />

        </Routes>
      </CartProvider>
    </BrowserRouter>
    </>
  );
}
