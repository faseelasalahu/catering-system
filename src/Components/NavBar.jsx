import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/logos.png'

export default function NavBar() {
  return (
    <nav className='bg-white shadow-md p-4'>
        <div className='container mx-auto flex justify-between items-center'>
             <Link to='/' className='flex items-center space-x-2'> 
          <span className='text-2xl font-bold text-orange-600'>DishDash</span>
          <img src={Logo} alt="DishDash Logo" className="h-8 w-auto" /> 
        </Link>
            
            <ul className='flex space-x-6'>
             <li><Link to='/'>Home</Link></li>   
             <li><Link to='/login'>Login</Link></li>  
            <li> <Link to='/register'>Register</Link></li>  
            </ul>

        </div>
    </nav>
  )
}
