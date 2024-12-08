import React, { useState, useEffect, useRef } from "react";
import useOnScreen from "../useOnScreen";

// Imágenes para cada categoría
const categoryImages = {
  electronics: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
  jewelery: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
  "men's clothing": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
  "women's clothing": "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
};

// Formato bonito para nombres de categorías
const formattedCategoryNames = {
  electronics: "Electronics",
  jewelery: "Jewelry",
  "men's clothing": "Men's Clothing",
  "women's clothing": "Women's Clothing",
};

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories desde la API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto p-9 my-16" id="Categories">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">
        Explore Categories
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Cargando categorías...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <CategoryCard
              key={category}
              category={category}
              delay={index * 150} // Añadimos un pequeño retraso a cada tarjeta
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Componente de Tarjeta de Categoría
function CategoryCard({ category, delay }) {
  const [ref, isVisible] = useOnScreen({ threshold: 0.3 }); // Hook personalizado

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }} // Retraso en la animación
      className={`flex flex-col items-center bg-white p-6 rounded-xl shadow-lg transform transition-all duration-700 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      }`}
    >
      {/* Imagen */}
      <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden mb-4">
        <img
          src={categoryImages[category] || "https://via.placeholder.com/100"}
          alt={category}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Nombre de Categoría */}
      <button
        onClick={() => document.getElementById(category)?.scrollIntoView({ behavior: "smooth" })}
        className="text-xl font-semibold text-gray-800 hover:text-indigo-600 transition duration-300"
      >
        {formattedCategoryNames[category] || category}
      </button>
    </div>
  );
}
