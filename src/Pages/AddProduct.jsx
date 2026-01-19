import React, { useState } from 'react';

export default function AddProduct() {
    const [showOptions, setShowOptions] = useState(false); 
  return (
    <div className='max-w-md mx-auto'>
   <h1 className="text-3xl font-bold text-orange-600 mt-10 text-center">Add Food Items</h1>

    <form onSubmit='' className="max-w-sm mx-auto">
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
  class="border-2 border-orange-600 text-heading text-sm rounded-xl focus:ring-brand   w-full px-3 py-2.5 shadow-xs"
  placeholder="About Food... "
></textarea>
<div className="relative">
          <label className="block mb-1 text-xl font-medium text-heading p-4">Category</label>
          <button 
            type="button"
            onClick={() => setShowOptions(!showOptions)}
            className="w-full px-4 py-2 text-left border-2 border-orange-600 rounded-xl bg-white flex justify-between items-center"
          >
            <span>Select Category</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
          
          {/* Dropdown Content */}
          {showOptions && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg">
              <button type="button" className="block w-full px-4 py-2 text-left hover:bg-orange-50 text-sm">Breakfast</button>
              <button type="button" className="block w-full px-4 py-2 text-left hover:bg-orange-50 text-sm">Lunch</button>
              <button type="button" className="block w-full px-4 py-2 text-left hover:bg-orange-50 text-sm">Dinner</button>
            </div>
          )}
        </div>
</div>
<button
          type="submit"
          
          className="bg-blue-600 p-2 w-40 m-10 h-15 font-bold text-white rounded-xl "
        >
          Add Items
        </button>
 </form>
 
  </div>   
  
   
    
  )
}

