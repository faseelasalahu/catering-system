import React, { useEffect, useState } from "react";
import {useAuthStore} from '../Store/useAuthStore'
import { db } from "../lib/firebase";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { useCart } from "../Context/CartContext";



export default function Product() {
const {user, loading} = useAuthStore()
const navigate = useNavigate()
const [products,setProducts] = useState([])
const [isloading, setIsloading] = useState(true)
const addToCart = useCart()

useEffect(()=>{
  const fetchProducts = async()=>{
    try{
      const querySnapshot = await getDocs(collection(db,'products'));
      const items = querySnapshot.docs.map(doc=>({
        id:doc.id,
        ...doc.data()
      }))
      setProducts(items)
    }catch(error){
      alert("Error Fetching Products", error)
    }finally{
      setIsloading(false)
    }
  }
  fetchProducts()
},[])

useEffect(()=>{
  if(!loading && !user){
    navigate('/login')
  }
},[user, loading, navigate])
if(loading) return
<div className="text-center mt-20">Loading...</div>;
  return (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10 max-w-7xl mx-auto">
    {products.map((item)=>(
  <div key={item.id} className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-xl shadow-xs ">
      <a href="#">
        <img
          className="rounded-xl"
          src={item.imageUrl}
          alt=""
        />
      </a>
      <a href="#">
        <h5 className="mt-6 mb-3 text-2xl font-semibold tracking-tight text-heading">
         {item.name}
        </h5>
      </a>
      <p className="mb-2 text-body">
        {item.description}
      </p>
      <h6 className="mt-5 mb-1 text-2xl font-bold text-blue-900">₹{item.price}</h6>
      <a
        href="#"
        className="inline-flex items-center text-body bg-blue-400 box-border border border-default-medium hover:bg-blue-600 hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-xl text-sm px-4 py-2.5 focus:outline-none"
       onClick={()=>addToCart(item)}
      
      >
      

        Add To Cart
        <svg
          className="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 12H5m14 0-4 4m4-4-4-4"
          />
        </svg>
      </a>
    </div>
    ))}
    
    
    </div>
   
  );
}
