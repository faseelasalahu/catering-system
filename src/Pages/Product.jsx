import React, { useEffect, useState } from "react";
import { useAuthStore } from "../Store/useAuthStore";
import { db } from "../lib/firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { useCart } from "../Context/CartContext";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function Product() {
  const { user, loading } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const { addToCart } = useCart();
  const [category, setCategory] = useState("All");
  const [filteredItems, setFilteredItems] = useState([]);
  const[searchTerm, setSearchTerm] = useState('')// to store search term
  const[sortType, setSortType] = useState("default")// to store sorting type

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(items);
        // to check whether any data from home page//
        if (location.state && location.state.selectedCategory) {
          setCategory(location.state.selectedCategory);
        } else {
          setFilteredItems(items);
        }
      } catch (error) {
        alert("Error Fetching Products", error);
      } finally {
        setIsloading(false);
      }
    };
    fetchProducts();
  }, [location.state]);
 //To filtter items when change category//
 
   useEffect(() => {
    let result = products;

   
       if (category !== "All") {
    result = result.filter(item => item.category === category);
  }
   
  // 2. search using name (Case-insensitive)
  if (searchTerm) {
    result = result.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // 3. arrange according to price
  if (sortType === "lowToHigh") {
    result = [...result].sort((a, b) => a.price - b.price);
  } else if (sortType === "highToLow") {
    result = [...result].sort((a, b) => b.price - a.price);
  }

  setFilteredItems(result);
}, [category, searchTerm, sortType, products]);


  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);
  if (loading || isloading) return;
  <div className="text-center mt-20">Loading...</div>;

 
  return (
  <div className="w-full mx-auto p-10 dark:bg-slate-900 text-gray-800 dark:text-gray-100 min-h-screen pt-24">
    <div className="flex flex-col md:flex-row gap-4 mb-10 justify-between items-center px-4">
      <div className="relative w-full md:w-96">
    <input 
      type="text"
      placeholder="Search for your favorite food..."
      className="w-full border-2 border-orange-500 rounded-xl px-10 py-2.5 outline-none focus:ring-2 ring-orange-200 transition dark:bg-slate-900 text-gray-800 dark:text-gray-100"
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <span className="absolute left-3 top-3 text-gray-400" >🔍</span>
  </div>

  {/* Sorting Dropdown */}
  <select className="w-full md:w-48 border-2 border-orange-500 rounded-xl px-4 py-2.5 outline-none bg-white font-medium cursor-pointer dark:bg-slate-900 text-gray-800 dark:text-gray-100 "
    onChange={(e) => setSortType(e.target.value)} >
    <option value="default">Sort by: Default</option>
    <option value="lowToHigh">Price: Low to High</option>
    <option value="highToLow">Price: High to Low</option>
  </select>
    </div>
    {/* cateogry Buttons */}
    <div className="flex flex-wrap justify-center gap-4 mb-10 ">
      {["All", "Breakfast", "Lunch", "Dinner"].map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          className={`px-6 py-2 rounded-full font-bold transition ${
            category === cat 
              ? "bg-orange-600 text-white shadow-lg" 
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10 max-w-7xl mx-auto ">
     
      {filteredItems.map((item) => (
        <div
          key={item.id}
          className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-xl shadow-xs flex flex-col h-full"
        >
          <a href="#">
           <LazyLoadImage
              className="rounded-xl object-cover w-full h-48"
              src={item.imageUrl}
              alt=""
              loading="lazy"
            />
          </a>
          <a href="#">
            <h5 className="mt-6 mb-3 text-2xl font-semibold tracking-tight text-heading flex flex-col flex-grow">
              {item.name}
            </h5>
          </a>
          <p className="mb-2 text-body flex-grow line-clamp-2">
            {item.description}
          </p>
          <div className="mt-auto">
            <h6 className="mt-5 mb-1 text-2xl font-bold text-blue-900">
              ₹{item.price}
            </h6>
            <button
              type="button"
              className=" bg-orange-400 rounded-xl w-40 h-15 mt-2 text-blue-800 font-bold px-4 py-2 "
              onClick={(e) => {
                e.preventDefault();
                addToCart(item);
              }}
            >
              Add To Cart
            </button>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}
