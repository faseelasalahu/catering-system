
import React, { useState } from 'react';
import { storage, db } from '../lib/firebase';
import {collection, addDoc} from 'firebase/firestore'

import toast from 'react-hot-toast';
export default function AddProduct() {
    const [showOptions, setShowOptions] = useState(false); 
    // To Store Data//
   const [name, setName] = useState('')
   const [price, setPrice] = useState('')
   const[desc, setDesc] = useState('')
   const[category, setCategory] = useState('select Category')
   const[image, setimage] = useState('')
   const[loading, setLoading] = useState(false)

   const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

    try{
   

     //2. To Store Data in Firestore//
      await addDoc(collection(db, "products"),{
        name,
        price: Number(price),
        category,
        description:desc,
        imageUrl:image,
        createdAt:new Date(), 
      })
toast.success("Food Items Added Successfully",{
  style :{
    borderRadius: '10px',
      background: '#e37609',
      color: '#fff',
  }
})
// To Clear Form //
setName(''); setCategory('');setDesc('');setPrice('');setimage('');
    }catch(error){
      console.log("Error Adding Product", error)
    }
    setLoading(false)
   }
 
  return (
    <div className='w-full min-h-screen mx-auto bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-100'>
   <h1 className="text-3xl font-bold text-orange-600 mt-10 text-center ">Add Food Items</h1>

    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mr-3  ">
          <label
            htmlFor="firstname"
            className="block mb-1 text-xl font-medium text-heading p-4"
          >
           Food Items
          </label>
          <input
            type="text"
            id="fname"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="border-2 border-orange-600 text-heading text-sm rounded-xl focus:ring-brand   w-full px-3 py-2.5 shadow-xs "
            placeholder="Food Name here..."
            required
          />
        </div>
        <div className="mr-3  ">
          <label
            htmlFor="firstname"
            className="block mb-1 text-xl font-medium text-heading p-4"
          >
       Price
          </label>
          <input
            type="number"
            id="fname"
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            className="border-2 border-orange-600 text-heading text-sm rounded-xl focus:ring-brand   w-full px-3 py-2.5 shadow-xs "
            placeholder="Price Here.."
            required
          />
        </div>
        <div className="mr-3  ">
          <label
            htmlFor="firstname"
            className="block mb-1 text-xl font-medium text-heading p-4"
          >
       Description
          </label>
         <textarea
  id="message"
  rows="4"
  value={desc}
  onChange={(e)=>setDesc(e.target.value)}
  className="border-2 border-orange-600 text-heading text-sm rounded-xl focus:ring-brand   w-full px-3 py-2.5 shadow-xs"
  placeholder="About Food... "
></textarea>
<div className="relative ">
          <label className="block mb-1 text-xl font-medium text-heading p-4 dark:text-gray-100">Cateogry</label>
          <button 
            type="button"
            onClick={() => setShowOptions(!showOptions)}
            className="w-full px-4 py-2 text-left border-2 border-orange-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-white flex justify-between items-center"
          >
            <span>{category}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
          
          {/* Dropdown Content */}
          {showOptions && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg  dark:bg-gray-800 ">
              <button type="button" onClick={() =>{setCategory("Breakfast");setShowOptions(false)}} className="block w-full px-4 py-2 text-left hover:bg-orange-50 text-sm">Breakfast</button>
              <button type="button" onClick={() =>{setCategory("Lunch");setShowOptions(false)}}className="block w-full px-4 py-2 text-left hover:bg-orange-50 text-sm">Lunch</button>
              <button type="button" onClick={() =>{setCategory("Dinner");setShowOptions(false)}}className="block w-full px-4 py-2 text-left hover:bg-orange-50 text-sm">Dinner</button>
            </div>
          )}
        </div>
</div>
<div className="mr-3">
 <label className="block mb-1 text-xl font-medium text-heading p-4">Food Url</label>
  <input
            type="text"
            id="url"
            value={image}
            onChange={(e)=>setimage(e.target.value)}
            className="border-2 border-orange-600 text-heading text-sm rounded-xl focus:ring-brand   w-full px-3 py-2.5 shadow-xs "
            placeholder="Paste URL..."
            required
          />
          </div>

<button
          type="submit"
          disabled= {loading} 
          className="bg-blue-600 p-2 w-40 m-10 h-15 font-bold text-white rounded-xl "
        >
        {loading ? "Adding" : "Add Items"}
        </button>
 </form>
 
  </div>   
  
   
    
  )
}

