import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../lib/firebase';
export default function Login() {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

const navigate = useNavigate()

const handleEmail = (e) =>{
  setEmail(e.target.value)
}
const handlePassword = (e)=>{
  setPassword(e.target.value)
}

const handleSubmit = async(e) =>{
  e.preventDefault()
  
  try{
 
    await signInWithEmailAndPassword(auth,email,password)
   
    alert("Login to product page")
     navigate('/product')
  }catch(error){
  
    alert(error.message)
  }
 
}

  return (
    <div className="text-center p-4 m-10">
      <h1 className=" font-bold text-orange-600 text-5xl mb-10">Login</h1>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        
        <div className="mr-3  ">
          <label
            htmlFor="email"
            className="block mb-1 text-xl font-medium text-heading p-4 "
          >
            Your Email
          </label>
          <input
            type="email"
            id="email"
            className="border-2 border-orange-600 text-heading text-sm rounded-xl focus:ring-brand   w-full px-3 py-2.5 shadow-xs "
            onChange={handleEmail}
            placeholder="Example@email.com"
            required
          />
        </div>
        <div className="mr-3 ">
          <label
            htmlFor="password"
            className="block mb-1 text-xl font-medium text-heading p-4"
            autocomplete="current-password"
          >
            Password
          </label>
          <input
            type="password"
            id="pwd"
            className="border-2 border-orange-600 text-heading text-sm rounded-xl focus:ring-brand   w-full px-3 py-2.5 shadow-xs placeholder:text-gray-500"
           onChange={handlePassword}
            placeholder="Enter Your Password."
            required
          />
        </div>
        <button
          type="submit"
      
          className="bg-blue-600 p-2 w-40 m-10 h-15 font-bold text-white rounded-xl " onSubmit={handleSubmit}
        >Login
         
        </button>
      </form>
    </div>
  )
}
