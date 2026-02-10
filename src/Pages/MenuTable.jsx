import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection ,onSnapshot,deleteDoc,doc} from 'firebase/firestore'
import toast from "react-hot-toast";
import { Link } from 'react-router-dom'

export default function MenuTable() {
    const [item, setItems] = useState([])

    useEffect(()=>{
        const unsubscribe = onSnapshot(collection(db, "products"),(snapshot)=>{
            const menuData = snapshot.docs.map(doc=>({id:doc.id, ...doc.data()}))
            setItems(menuData)
        })
        return ()=> unsubscribe()
    },[])

    const handleDelete = async(id)=>{
   if(window.confirm("You want to delete this item")){
   const docRef = doc(db, "products", id); 
  await deleteDoc(docRef)
  toast.success("Deleted Successfully",{
     style :{
    borderRadius: '10px',
      background: '#e37609',
      color: '#fff',
  }
  })
   }
    }
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-5 dark:bg-slate-900 text-gray-800 dark:text-gray-100">
      <h2 className="text-xl font-bold mb-4">Current Menu</h2>
   
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-200 dark:bg-slate-900 text-gray-800 dark:text-orange-800">
            <th className="p-3">Image</th>
            <th className="p-3">Name</th>
            <th className="p-3">Price</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
         {item.map((item)=>(
<tr key={item.id} className="border-b">
              <td className="p-3">
                <img src={item.imageUrl} alt={item.image} className="w-12 h-12 rounded object-cover" />
              </td>
              <td className="p-3 font-medium">{item.name}</td>
              <td className="p-3">₹{item.price}</td>
              <td className="p-3">
                <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:underline">Delete</button>
              </td>
            </tr>
         ))}
            
          
        </tbody>
      </table>
      <Link to="/admin" className="text-orange-800 font-bold">Back To Dashboard</Link>
    </div>
  );
  
}
