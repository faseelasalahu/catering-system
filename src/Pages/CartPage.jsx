import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext'
import EmptyCart from './EmptyCart';

export default function CartPage() {
const {cartItems,removeFromCart,updateQuantity} = useCart();
const subTotal = cartItems.reduce((acc,item)=>acc+(item.price * item.quantity),0)
const total = subTotal+50;
const navigate = useNavigate()
 

if (cartItems.length === 0){
           return  <EmptyCart />
              }      

              
  return (
       
    <div className=" max-w-6xl mx-auto p-4 ">
          <h2  className="text-xl font-semibold text-slate-900 mb-8">Shopping Cart</h2>
         
           <div  className="overflow-x-auto">
              <table  className="w-full border-collapse divide-y divide-gray-300 ">
                  <thead  className="whitespace-nowrap text-left">
                      <tr>
                          <th className="text-[15px] text-slate-500 font-medium p-2">Description</th>
                         
                          <th  className="text-[15px] text-slate-500 font-medium p-2">Quantity</th>
                          <th  className="text-[15px] text-slate-500 font-medium p-2">Remove</th>
                          <th className="text-[15px] text-slate-500 font-medium p-2">Price</th>
                      </tr>
                  </thead>
                  <tbody  className="whitespace-nowrap divide-y divide-gray-300 ">
                    {cartItems.map((item)=>(
                        <tr key={item.id}>
                          <td  className="px-2 py-4">
                           
                             <div className="flex items-center gap-6 w-max">
                                  <div  className="w-24 h-24 shrink-0">
                                      <img src={item.imageUrl}  className="w-full h-full object-contain" />
                                  </div>
                                  <div>
                                      <p  className="text-[15px] font-semibold text-slate-900 dark:text-gray-100">{item.name}</p>
                                  </div>
                              </div>
                          </td>
                         
                          <td  className="px-2 py-4">
                              <div  className="flex gap-2 items-center border border-gray-300 bg-white px-3 h-9 rounded-md w-max">
                                  <button type="button" onClick={()=>updateQuantity(item.id, -1)}  className="border-0 outline-0 cursor-pointer">
                                      <svg xmlns="http://www.w3.org/2000/svg"  className="w-2.5 h-2.5" viewBox="0 0 121.805 121.804">
                                          <path d="M7.308 68.211h107.188a7.309 7.309 0 0 0 7.309-7.31 7.308 7.308 0 0 0-7.309-7.309H7.308a7.31 7.31 0 0 0 0 14.619z" data-original="#000000" />
                                      </svg>
                                  </button>
                                  <span  className="text-slate-900 text-sm font-medium px-3">{item.quantity}</span>
                                  <button type="button" onClick={()=>updateQuantity(item.id,+1)}  className="border-0 outline-0 cursor-pointer">
                                      <svg xmlns="http://www.w3.org/2000/svg"  className="w-2.5 h-2.5" viewBox="0 0 512 512">
                                          <path d="M256 509.892c-19.058 0-34.5-15.442-34.5-34.5V36.608c0-19.058 15.442-34.5 34.5-34.5s34.5 15.442 34.5 34.5v438.784c0 19.058-15.442 34.5-34.5 34.5z" data-original="#000000" />
                                          <path d="M475.392 290.5H36.608c-19.058 0-34.5-15.442-34.5-34.5s15.442-34.5 34.5-34.5h438.784c19.058 0 34.5 15.442 34.5 34.5s-15.442 34.5-34.5 34.5z" data-original="#000000" />
                                      </svg>
                                  </button>
                              </div>
                          </td>
                          <td  className="px-2 py-4">
                              <button type="button" onClick={()=>removeFromCart(item.id)}   className="bg-transparent border border-gray-300 flex items-center justify-center w-9 h-9 rounded-md cursor-pointer">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-red-500 inline" viewBox="0 0 24 24">
                                      <path
                                          d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                                          data-original="#000000"></path>
                                      <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                                          data-original="#000000"></path>
                                  </svg>
                              </button>
                          </td>
                          <td  className="px-2 py-4">
                              <h4  className="text-[15px] font-semibold text-slate-900 dark:text-gray-100">₹{item.price}</h4>
                          </td>
                      </tr>
                
                      
                    ))}
                      
                  </tbody>
              </table>
             
         </div>

              
        
         
                             
          <div className="border-t border-gray-300">
              <div className="max-w-lg ml-auto mt-6">
                  <ul  className="text-slate-500 font-medium divide-y divide-gray-300 dark:text-gray-100">
                      <li  className="flex flex-wrap gap-3 text-sm py-3">Subtotal <span  className="ml-auto font-semibold text-slate-900 dark:text-gray-100">₹{subTotal}</span></li>
                      <li  className="flex flex-wrap gap-3 text-sm py-3">Shipping <span  className="ml-auto font-semibold text-slate-900 dark:text-gray-100">₹50.00</span></li>
                      <li  className="flex flex-wrap gap-3 text-sm py-3">Tax <span  className="ml-auto font-semibold text-slate-900 dark:text-gray-100">₹0.00</span></li>
                      <li  className="flex flex-wrap gap-3 text-sm py-3 font-semibold text-slate-900">Total <span className="ml-auto dark:text-gray-100">₹{total}</span></li>
                  </ul>
                  <button type="button" onClick={()=> navigate('/checkout')} className="mt-6 text-sm font-medium tracking-wide px-4 py-2 w-full bg-orange-600 hover:bg-orange-500 text-white rounded-md cursor-pointer">Proceed to Checkout</button>
              </div>
          </div>
          
          </div>
      
  )
              
}
