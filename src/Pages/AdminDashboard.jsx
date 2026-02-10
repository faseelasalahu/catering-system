import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import {db} from '../lib/firebase'
import { useAuthStore } from '../Store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'


const AdminDashboard = () => {
const [order, setOrder] = useState([])
const pendingCount = order.filter(order=>order.status === 'Pending').length
const deliveredCount = order.filter(order=>order.status === 'Delivered').length
const navigate = useNavigate()
const {user , logout} = useAuthStore()

const handleLogout =async(e) =>{
  e.preventDefault()
  await logout()
  navigate('/login')
}

useEffect(()=>{
   console.log("Fetching orders..."); 
  const unsubscribe = onSnapshot(collection(db , 'order'),(snapshot)=>{
    
    const orderData = snapshot.docs.map(doc=>({id:doc.id, ...doc.data()}))
  
    setOrder(orderData)
  },(error)=>{
     console.log("Firestore Error:", error.message); 
  })
  return ()=>unsubscribe
},[])

//to change order data//
const updateStatus = async (orderId, newStatus)=>{
  const orderDoc =doc(db,'order',orderId) ;
  await updateDoc(orderDoc,{status: newStatus})
}

// live update of order status //
const handleStatusChanges = async(orderId, newStatus)=>{
   if (!orderId) {
    console.error("Order ID is missing!");
    return;
  }
try{
  // select order id//
  const orderRef = doc(db, 'order',orderId)
  // update status //
  await updateDoc(orderRef,{
    status: newStatus
  })
  console.log("Status update to :", newStatus)
}catch(error){
  console.log("Error Updating Status:" ,error.message)
}
}

  return (
    <div className="flex h-screen bg-gray-100 ">
      {/* Sidebar */}
      <div className="w-64 bg-slate-700 text-white p-5 hidden md:block ">
        <h2 className="text-2xl font-bold mb-8">Catering Admin</h2>
        <nav className="space-y-4">
          <a href="#" className="block py-2 px-4 bg-blue-600 rounded">Dashboard</a>
          
          <Link to="/menu" className="block py-2 px-4 hover:bg-slate-700 rounded">Manage Menu</Link>
          <Link to="/addproduct" className="block py-2 px-4 hover:bg-slate-700 rounded">Upload Product</Link>
          <a href="#" className="block py-2 px-4 hover:bg-slate-700 rounded" onClick={handleLogout}>Log Out</a>


        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden ">
        {/* Top Navbar */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center dark:bg-slate-900 text-gray-800 dark:text-gray-100">
          <h1 className="text-xl text-orange-600 font-semibold ">Dashboard Overview</h1>
          <div className="text-orange-600 font-bold ">Welcome,Admin</div>
        </header>

        {/* Dashboard Stats & Content */}
        <main className="flex-1 overflow-y-auto p-6 dark:bg-slate-900 text-gray-800 dark:text-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Stats Cards */}
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 dark:bg-slate-900 text-gray-800 dark:text-gray-100 shadow-white">
              <h3 className="text-gray-500 text-sm font-medium ">Total Orders</h3>
              <p className="text-2xl font-bold ">{order.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500 dark:bg-slate-900 text-gray-800 dark:text-gray-100 shadow-white">
              <h3 className="text-gray-500 text-sm font-medium">Delivered</h3>
              <p className="text-2xl font-bold">{ deliveredCount}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500 dark:bg-slate-900 text-gray-800 dark:text-gray-100 shadow-white">
              <h3 className="text-gray-500 text-sm font-medium">pending</h3>
              <p className="text-2xl font-bold">{pendingCount}</p>
            </div>
          </div>

          {/* Recent Orders Table Area */}
          <div className="bg-white rounded-lg shadow-md p-6 dark:bg-slate-900 text-gray-800 dark:text-gray-100">
            <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
            <div className="border-t pt-4">
               {/* table list */}
              <div className="p-6 bg-white rounded-lg shadow-md dark:bg-slate-900 text-gray-800 dark:text-gray-100">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-100 dark:bg-slate-900 text-orange-800 dark:text-orange-800">
            <th className="p-3">Customer</th>
            <th className="p-3">Items</th>
            <th className="p-3">Total</th>
            <th className="p-3">Status</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
   {order.map((orders)=>(
  <tr key={orders.id} className="border-b">
              <td className="p-3">{orders.customerName}</td>
              <td className="p-3"> {orders.items?.length}</td>
              <td className="p-3">₹{orders.totalAmout}</td>
              <td className="p-3">
                <span className={`px-2 py-1 rounded text-sm ${orders.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  status
                </span>
              </td>
              <td className="p-3 ">
                <select className="border p-1 rounded dark:bg-slate-900 text-gray-800 dark:text-gray-100" value={orders.status} onChange={(e) => handleStatusChanges(orders.id, e.target.value)} >
                  <option value="Pending">Pending</option>
                   
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
            </tr>
   ))}
          
      
        </tbody>
      </table>
    </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
