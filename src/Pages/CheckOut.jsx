import React, { useState } from "react";
import { useCart } from "../Context/CartContext";
import { useAuthStore } from "../Store/useAuthStore";
import { useNavigate } from "react-router-dom";

export default function CheckOut() {
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

  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,0
  );
  const total = subTotal * formData.guests;
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order Data:", { ...formData, items: cartItems, total });
    alert("Order Placed Successfully!");
    clearCart()
    navigate('/')
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-10">
      <h1 className="text-3xl font-bold text-orange-600 mb-10 text-center">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* 1. Delivery Form on left side */}
        <div className="bg-white p-6 border border-gray-200 rounded-2xl shadow-sm">
          <h2 className="text-xl font-bold mb-6 text-slate-800">
            Event Details
          </h2>

          <form onSubmit= {handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:border-orange-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Contact Number"
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:border-orange-500 outline-none"
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
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:border-orange-500 outline-none"
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
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:border-orange-500 outline-none"
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
                placeholder="Full address of the event venue"
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:border-orange-500 outline-none"
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
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 h-fit">
          <h2 className="text-xl font-bold mb-6 text-slate-800">
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
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between text-slate-600">
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
