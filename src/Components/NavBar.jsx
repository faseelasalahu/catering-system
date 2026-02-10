import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/logos.png'
import { useAuthStore } from '../Store/useAuthStore'
import { useCart } from '../Context/CartContext'
import { Sun,Moon } from 'lucide-react'
export default function NavBar() {
  
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const {cartItems} = useCart();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  const[dark,setDark] = useState(localStorage.getItem("theme")=== 'dark')
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);
  
  const handleLogout = async () => {
    setIsDropDownOpen(false) // to close menu
    await logout();
    navigate('/login');
  };

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 w-full bg-white shadow-md p-4 dark:bg-slate-900 text-gray-800 dark:text-gray-100 '>
      <div className='container mx-auto flex justify-between items-center'>
        <Link to='/' className='flex items-center space-x-2'> 
          <span className='text-2xl font-bold text-orange-600'>DishDash</span>
          <img src={Logo} alt="DishDash Logo" className="h-8 w-auto" /> 
        </Link>
            
        <ul className='flex space-x-6 items-center'>
          <li><Link to='/'>Home</Link></li> 
           <button onClick={() => setDark(!dark)} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition">
      {dark ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-600" />}
    </button>
          {user ? (
            <>
              {/* Cart Icon */}
              <li className='relative cursor-pointer'>
                <Link to='/cartpage' className="text-gray-700 hover:text-orange-600">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                  {/* Cart count badge */}
                  <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                   {cartItems.length}
                  </span>
                </Link>
              </li>

              {/* User Dropdown */}
              <li className='relative border-l pl-4'>
                <button 
                  onClick={() =>setIsDropDownOpen(!isDropDownOpen)}
                  className='flex items-center space-x-2 focus:outline-none'
                >
                  <div className='w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold'>
                    {user.email[0].toUpperCase()}
                  </div>
                </button>

                {/* ഡ്രോപ്പ്ഡൗൺ മെനു */}
                {isDropDownOpen && (
                  <div className='absolute right-0 mt-3 w-48 bg-white border rounded-lg shadow-xl py-2 z-50 animate-in fade-in zoom-in duration-200'>
                    <Link to='/profile' onClick={() => setIsDropDownOpen(false)} className='block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50'>Profile</Link>
                    <Link to='/order' onClick={() => setIsDropDownOpen(false)} className='block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50'>My Orders</Link>
                    <button onClick={handleLogout} className='w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t mt-1'>Logout</button>
                  </div>
                )}
              </li>
            </>
          ) : (
            <>
              <li><Link to='/login'>Login</Link></li>  
              <li><Link to='/register'>Register</Link></li> 
            </>
          )}  
        </ul>
      </div>
    </nav>
  )
}
