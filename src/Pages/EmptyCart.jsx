import {  useNavigate } from "react-router-dom"

export default function EmptyCart() {
    const navigate= useNavigate()
  return (
   <div className="flex flex-col items-center justify-center h-[60vh]">
      <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-illustration-svg-download-png-6024626.png" alt="Empty" className="w-64 mb-6 opacity-50" />
      <h2 className="text-2xl font-bold text-gray-500">Your cart feels lonely!</h2>
      <button 
        onClick={() => navigate('/product')}
        className="mt-6 bg-orange-600 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition"
      >
        Go to Menu
      </button>
    </div>
  )
}

