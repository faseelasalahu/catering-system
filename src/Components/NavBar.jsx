import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/logos.png'
import { useAuthStore } from '../Store/useAuthStore'
import { useCart } from '../Context/CartContext'

export default function NavBar() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const {cartItems} = useCart();

  
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className='bg-white shadow-md p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link to='/' className='flex items-center space-x-2'> 
          <span className='text-2xl font-bold text-orange-600'>DishDash</span>
          <img src={Logo} alt="DishDash Logo" className="h-8 w-auto" /> 
        </Link>
            
        <ul className='flex space-x-6 items-center'>
          <li><Link to='/'>Home</Link></li> 
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

              {/* User Email and Logout */}
              <li className='flex items-center space-x-3 border-l pl-4'>
                <span className='text-sm font-medium text-gray-600 hidden md:block'>
                  {user.email}
                </span>
                <button 
                  onClick={handleLogout}
                  className='bg-orange-100 text-orange-600 px-3 py-1 rounded-lg text-sm font-semibold hover:bg-orange-200 transition'
                >
                  Logout
                </button>
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
