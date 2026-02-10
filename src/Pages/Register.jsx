import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../lib/firebase';


export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
  

    try{
       
      await createUserWithEmailAndPassword(auth, email, password)
     
    }catch(error){
        alert(error.message)
    }
    
      navigate('/Login')
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="text-center p-4 m-10">
      <h1 className=" font-bold text-orange-600 text-5xl m-10">Register</h1>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto dark:text-gray-100">
        <div className="mr-3  ">
          <label
            htmlFor="firstname"
            className="block mb-1 text-xl font-medium text-heading p-4"
          >
            Your Name 
          </label>
          <input
            type="text"
            id="fname"
           
            className="border-2 border-orange-600 text-heading text-sm rounded-xl focus:ring-brand   w-full px-3 py-2.5 shadow-xs "
            placeholder="Enter Your Name.."
            required
          />
        </div>
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
          onClick={handleSubmit}
          className="bg-blue-600 p-2 w-40 m-10 h-15 font-bold text-white rounded-xl "
        >
          Register
        </button>
      </form>
    </div>
  );
}