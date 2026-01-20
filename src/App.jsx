
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import NavBar from './Components/NavBar'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Product from './Pages/Product'
import { useAuthStore } from './Store/useAuthStore'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import AddProduct from './Pages/AddProduct'
export default function () {
   const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // save login status to store
    });
    return () => unsubscribe();
  }, [setUser]);

  return (
   <BrowserRouter>
   <NavBar />
   
   <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
    <Route path='/product' element={<Product />} />
    <Route path='/addproduct' element={<AddProduct />} />

   </Routes>
   </BrowserRouter>
  )
}
