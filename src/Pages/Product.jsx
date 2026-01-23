import React, { useEffect, useState } from "react";
import { useAuthStore } from "../Store/useAuthStore";
import { db } from "../lib/firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { useCart } from "../Context/CartContext";

export default function Product() {
  const { user, loading } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const { addToCart } = useCart();
  const [category, setCategory] = useState("All");
  const [filteredItems, setFilteredItems] = useState([]);

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
    if (category === "All") {
      setFilteredItems(products);
    } else {
      const filtered = products.filter((item) => item.category === category);
      setFilteredItems(filtered);
    }
  }, [category, products]);


  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);
  if (loading || isloading) return;
  <div className="text-center mt-20">Loading...</div>;

 
  return (
  <div className="max-w-7xl mx-auto p-10">
    {/* കാറ്റഗറി ഫിൽട്ടർ ബട്ടണുകൾ */}
    <div className="flex flex-wrap justify-center gap-4 mb-10">
      {["All", "Breakfast", "Lunch", "Dinner"].map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          className={`px-6 py-2 rounded-full font-bold transition ${
            category === cat 
              ? "bg-orange-600 text-white shadow-lg" // സെലക്ട് ചെയ്ത ബട്ടൺ
              : "bg-gray-200 text-gray-700 hover:bg-gray-300" // സാധാരണ ബട്ടൺ
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
            <img
              className="rounded-xl object-cover w-full h-48"
              src={item.imageUrl}
              alt=""
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
