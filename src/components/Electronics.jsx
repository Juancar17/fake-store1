import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import useOnScreen from "../useOnScreen";

function Electronics() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/category/electronics")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error al obtener los productos:", err));
  }, []);

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Electronics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <AnimatedProductCard key={product.id} product={product} delay={index * 150} />
        ))}
      </div>
    </div>
  );
}

// Componente con animación individual
function AnimatedProductCard({ product, delay }) {
  const [ref, isVisible] = useOnScreen({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }} // Retraso progresivo
      className={`opacity-0 transform transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "translate-y-10"
      }`}
    >
      <ProductCard product={product} />
    </div>
  );
}

export default Electronics;
