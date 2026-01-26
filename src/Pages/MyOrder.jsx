import { db } from "../lib/firebase"
import { collection,getDocs,where,query } from 'firebase/firestore'
import { useAuthStore } from "../Store/useAuthStore"
import { useEffect, useState } from "react"


export default function MyOrder() {
const [order, setOrder] = useState([])
const {user, loading} = useAuthStore()

useEffect(()=>{
    const fetchMyOrder = async()=>{
        if(loading || !user || !user.uid) return;

        const q= query(collection(db, "order"), where ("userId", "==", user.uid))
        const querySnapshot= await getDocs(q);
        const orderList = querySnapshot.docs.map(doc=>({
            id:doc.id, ...doc.data()
        }))
        console.log("My Orders Data:", orderList)
      setOrder(orderList)
    }
    fetchMyOrder()
},[user])

  return (
    <div className="max-w-4xl mx-auto p-6">
    <h2 className="text-2xl font-bold mb-6 text-orange-700">My Orders</h2>
    {order.length === 0 ? (
      <p>You Have No Order!</p>
    ) : (
      order.map((order) => (
        <div key={order.id} className="border p-4 rounded-xl mb-4 shadow-sm bg-white">
          <div className="flex justify-between border-b pb-2 mb-2">
            <span className="text-sm text-gray-500 font-medium">Order ID: {order.id}</span>
            <span className={`text-sm font-bold ${order.status === 'pending' ? 'text-orange-500' : 'text-green-600'}`}>
              {order.status.toUpperCase()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-lg">Total: ₹{ order.totalAmout|| 0}</p>
              <p className="text-xs text-gray-400">Date: {order.createdAt?.toDate().toLocaleDateString()}</p>
            </div>
            <button className="bg-orange-300 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm">View Details</button>
          </div>
        </div>
      ))
    )}
  </div>
);
  
}
