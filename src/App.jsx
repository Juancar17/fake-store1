import { useState, useEffect } from "react";
import NavBar from "./components/NavBar.jsx";
import Hero from "./components/hero.jsx";
import Categories from "./components/Categories.jsx"
import ProductCarousel from "./components/ProductCarousel.jsx";
import Jewelery from "./components/Jewelery.jsx" 
import Electronics from "./components/Electronics.jsx";
import Men from "./components/Men.jsx";
import Woman from "./components/Woman.jsx"
import Footer from "./components/Footer.jsx";



function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/products") // Conectamos al backend
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error al obtener los productos:", err));
  }, []);

  return (
    <>
    
     <div className="min-h-screen bg-gray-100 p-6">
     <div>
      <NavBar products={products} />
    </div>
      <Hero />
      <div>
      <Categories />
      <Jewelery />
      <Electronics />
      <Men />
      <Woman />
    </div>
        <div>
        <ProductCarousel products={products} />
      </div>
    </div>
    <Footer />

    </>
   
  );
}

export default App;
