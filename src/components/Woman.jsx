import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard"; // Reutilizamos tu componente ProductCard
import useOnScreen from "../useOnScreen"; // Hook personalizado para scroll animations

export default function FilteredProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products y filtrar "women's clothing"
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (product) => product.category === "women's clothing"
        );
        setProducts(filtered);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Women's Clothing</h2>
      {loading ? (
        <p className="text-center text-gray-500">Cargando productos...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <AnimatedProductCard key={product.id} product={product} delay={index * 150} />
          ))}
        </div>
      )}
    </div>
  );
}

// Componente animado para las tarjetas
function AnimatedProductCard({ product, delay }) {
  const [ref, isVisible] = useOnScreen({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }} // Retardo progresivo
      className={`opacity-0 transform transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "translate-y-10"
      }`}
    >
      <ProductCard product={product} />
    </div>
  );
}
