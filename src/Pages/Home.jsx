
   
import { useNavigate, } from 'react-router-dom'




export default function Home() {
  const navigate = useNavigate();
 
  const cateogryItems = [{
    name:"Breakfast",
    image:"https://cdn.pixabay.com/photo/2016/11/06/23/16/breakfast-1804436_640.jpg"
  },{
    name:"Lunch",
    image:"https://media.istockphoto.com/id/473582820/photo/nepali-thali-meal-set-with-mutton-curry.jpg?s=612x612&w=0&k=20&c=57AIVUdYVCe09dINwzr_fkG0TuqpO_JMeJHqEM8bT1A="
  },{
    name:"Dinner",
    image:"https://images.herzindagi.info/image/2019/Jul/benefits-of-having-early-dinner.jpg"
  }]




  return (
    <div className="w-full bg-white-200 dark:bg-slate-900 text-gray-800 dark:text-gray-100" >
      {/* 1. Hero Section */}
      <div className="relative h-[500px] flex items-center justify-center bg-gray-900 ">
        <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline>
          <source src="https://www.pexels.com/download/video/4993939/ "type="video/mp4"></source>
        </video>
        
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">DishDash Catering Service</h1>
          <p className="text-xl mb-8">Bringing taste and elegance to your special occasions.</p>
          <button 
            onClick={() => navigate('/product')}
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full text-lg font-bold transition"
          >
            Explore Menu
          </button>
        </div>
      </div>

      {/* 2. Category Section */}
      <div className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12 ">Browse by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          { cateogryItems .map((cat) => (
            <div 
              key={cat.name} 
              onClick={() => navigate('/product', { state: { selectedCategory: cat.name } })}
              className="cursor-pointer border rounded-2xl p-8 text-center hover:shadow-xl transition hover:border-orange-500 text-white ">
              <img src={cat.image} alt={cat.name} className="w-full h-40 object-cover" />
              <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{cat.name}</h3>

              <p className="text-orange-600 mt-2 font-medium">View Items →</p>
            </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

 
