import React, { useState,useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useCart } from "../Context/CartContext";
import { useAuthStore } from "../Store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { addDoc,collection,doc,getDoc} from "firebase/firestore";
import { db } from '../lib/firebase';
import toast from "react-hot-toast";

export default function CheckOut() {
  const [loading, setLoading] = useState(true)
  const { cartItems,  clearCart } = useCart();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    eventdate: "",
    guests: 1,
  });

useEffect(() => {
  const fetchUserData = async () => {
 
    if (!user?.uid) { 
    console.log("No User Found")
    return
    }
    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        setFormData(prev => ({
          ...prev,
          name: userData.name || "",
          phone: userData.phone || "",
          address: userData.address || "",
        }));
        console.log(userData)
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  fetchUserData();
}, [user]); 

  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,0
  );
  const total = subTotal * formData.guests;
  const  handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    
   try{
      const orderData = {
        userId : user.uid,
        userEmail: user.email,
        customerName:formData.name,
        phone: formData.phone,
        address: formData.address,
        eventDate: formData.eventdate,
        guestsCount: Number(formData.guests),
        items: cartItems,
        totalAmout : total,
        status:"pending",
        createdAt : new Date()
      }
      // to store firebase//
  const docRef = await addDoc(collection(db,'order'),orderData)
     toast.success("Order Placed Successfully",{
           style :{
    borderRadius: '10px',
      background: '#e37609',
      color: '#fff',
  }
     })
    clearCart()
    navigate('/success', { state: { orderId: docRef.id,
       customerName: formData.name,
      phone : formData.phone,
    address: formData.address } })
   }catch(error){
    console.log("order Failed",error.message)
   }finally{
    setLoading(false)
   }
    
  };


  return (
    <div className="max-w-6xl mx-auto p-4 md:p-10">
      <h1 className="text-3xl font-bold text-orange-600 mb-10 text-center">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* 1. Delivery Form on left side */}
        <div className="bg-white p-6 border border-gray-200 rounded-2xl shadow-sm dark:bg-slate-900 text-gray-800 dark:text-gray-100">
          <h2 className="text-xl font-bold mb-6 text-slate-800 dark:text-orange-800">
            Event Details
          </h2>

          <form onSubmit= {handleSubmit} className="space-y-5 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <div>
                <label className="block text-sm font-medium mb-1 ">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  placeholder="Your Name"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:border-orange-500 outline-none dark:bg-slate-900 text-gray-800 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Contact Number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:border-orange-500 outline-none dark:bg-slate-900 text-gray-800 dark:text-gray-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Event Date
                </label>
                <input
                  type="date"
                  onChange={(e) =>
                    setFormData({ ...formData, eventdate: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:border-orange-500 outline-none dark:bg-slate-900 text-gray-800 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Guest Count
                </label>
                <input
                  type="number"
                  onChange={(e) =>
                    setFormData({ ...formData, guests: e.target.value })
                  }
                  placeholder="Number of people"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:border-orange-500 outline-none dark:bg-slate-900 text-gray-800 dark:text-gray-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Venue Address
              </label>
              <textarea
                rows="4"
                onChange={(e) => ({ ...formData, address: e.target.value })}
                value={formData.address}
                placeholder="Full address of the event venue"
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:border-orange-500 outline-none dark:bg-slate-900 text-gray-800 dark:text-gray-100"
              ></textarea>
            </div>

            <button
              type="button" onClick={handleSubmit}
              className="w-full bg-orange-600 text-white font-bold py-4 rounded-xl hover:bg-orange-700 transition-all duration-300 shadow-lg"
            >
              Confirm & Place Order
            </button>
          </form>
        </div>

        {/* 2. Order Summery on right side */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 h-fit dark:bg-slate-900 text-gray-800 dark:text-gray-100">
          <h2 className="text-xl font-bold mb-6 text-slate-800 dark:text-orange-800">
            Order Summary
          </h2>

          <div className="space-y-4 mb-8">
           {cartItems.map((item)=>(
                    <div key={item.id} className="flex justify-between items-center pb-4 border-b border-slate-200">
              <div>
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-xs text-slate-500">{item.quantity}</p>
              </div>
              <span className="font-bold">₹{item.price * item.quantity}</span>
            </div>
           ))}
            {cartItems.length === 0 && (
                <p className="text-sm text-slate-500 text-center">No items in cart</p>
            )}
            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
              
              
            </div>
           
           

          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-slate-600 dark:text-gray-100">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-gray-100">
              <span>Shipping</span>
              <span className="text-green-600 font-medium">₹50</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-slate-900 pt-4 border-t border-slate-300 mt-4">
              <span>Grand Total</span>
              <span className="text-orange-600">₹{total + 50 }</span>
            </div>
          </div>

          <p className="text-[10px] text-slate-400 mt-6 text-center italic">
            * Prices are subject to change based on the final guest count and
            requirements.
          </p>
        </div>
      </div>
    </div>
  );
}
