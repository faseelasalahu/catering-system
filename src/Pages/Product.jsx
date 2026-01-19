import React, { useEffect } from "react";
import {useAuthStore} from '../Store/useAuthStore'

import { useNavigate } from "react-router-dom";



export default function Product() {
const {user, loading} = useAuthStore()
const navigate = useNavigate()

useEffect(()=>{
  if(!loading && !user){
    navigate('/login')
  }
},[user, loading, navigate])
if(loading) return
<div className="text-center mt-20">Loading...</div>;
  return (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10 max-w-7xl mx-auto">
    <div className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-xl shadow-xs ">
      <a href="#">
        <img
          className="rounded-xl"
          src="https://www.thespruceeats.com/thmb/XDBL9gA6A6nYWUdsRZ3QwH084rk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SES-chicken-biryani-recipe-7367850-hero-A-ed211926bb0e4ca1be510695c15ce111.jpg"
          alt=""
        />
      </a>
      <a href="#">
        <h5 className="mt-6 mb-3 text-2xl font-semibold tracking-tight text-heading">
          Streamlining your design process today.
        </h5>
      </a>
      <p className="mb-2 text-body">
        In today’s fast-paced digital landscape, fostering seamless
        collaboration among Developers and IT Operations.
      </p>
      <h6 className="mt-5 mb-1 text-2xl font-bold text-blue-900">₹150</h6>
      <a
        href="#"
        className="inline-flex items-center text-body bg-blue-400 box-border border border-default-medium hover:bg-blue-600 hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-xl text-sm px-4 py-2.5 focus:outline-none"
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
    <div className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-xl shadow-xs ">
      <a href="#">
        <img
          className="rounded-xl"
          src="https://www.thespruceeats.com/thmb/XDBL9gA6A6nYWUdsRZ3QwH084rk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SES-chicken-biryani-recipe-7367850-hero-A-ed211926bb0e4ca1be510695c15ce111.jpg"
          alt=""
        />
      </a>
      <a href="#">
        <h5 className="mt-6 mb-3 text-2xl font-semibold tracking-tight text-heading">
          Streamlining your design process today.
        </h5>
      </a>
      <p className="mb-2 text-body">
        In today’s fast-paced digital landscape, fostering seamless
        collaboration among Developers and IT Operations.
      </p>
      <h6 className="mt-5 mb-1 text-2xl font-bold text-blue-900">₹150</h6>
      <a
        href="#"
        className="inline-flex items-center text-body bg-blue-400 box-border border border-default-medium hover:bg-blue-600 hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-xl text-sm px-4 py-2.5 focus:outline-none"
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
     <div className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-xl shadow-xs ">
      <a href="#">
        <img
          className="rounded-xl"
          src="https://www.thespruceeats.com/thmb/XDBL9gA6A6nYWUdsRZ3QwH084rk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SES-chicken-biryani-recipe-7367850-hero-A-ed211926bb0e4ca1be510695c15ce111.jpg"
          alt=""
        />
      </a>
      <a href="#">
        <h5 className="mt-6 mb-3 text-2xl font-semibold tracking-tight text-heading">
          Streamlining your design process today.
        </h5>
      </a>
      <p className="mb-2 text-body">
        In today’s fast-paced digital landscape, fostering seamless
        collaboration among Developers and IT Operations.
      </p>
      <h6 className="mt-5 mb-1 text-2xl font-bold text-blue-900">₹150</h6>
      <a
        href="#"
        className="inline-flex items-center text-body bg-blue-400 box-border border border-default-medium hover:bg-blue-600 hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-xl text-sm px-4 py-2.5 focus:outline-none"
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
    </div>
  );
}
