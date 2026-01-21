
import {  createContext,useContext,useState } from "react";

const CartContext = createContext();

export  const CartProvider =({children}) =>{
    const [cartItems, setCartItems] = useState([])

    // Add Items to cart//
    const addToCart = (product)=>{
        setCartItems((prev)=>{
 //check weather item already in cart//
 const isExisting = prev.find((item)=>item.id === product.id)
       if(isExisting){
        return prev.map((item)=>item.id === product.id ?{...item, quantity:item.quantity+1}:item)
       }
     // otherwise add new item to cart//
     return [...prev, {...product, quantity:1}]
        })
        alert(`${product.name} added to cart!`)   
        
    }

    return(
        <CartContext.Provider value= {{cartItems, addToCart}}>
            {children}
        </CartContext.Provider>
    )
}
// to take cart data easily//
export const useCart = () => useContext(CartContext);