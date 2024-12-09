import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard"; // Reutilizamos tu componente ProductCard
import useOnScreen from "../useOnScreen";

export default function Men({ addToCart }) {
  const [products, setProducts] = useState([]); // Estado de productos
  const [loading, setLoading] = useState(true); // Estado de carga
  const [ref, isVisible] = useOnScreen({ threshold: 0.3 }); // Hook personalizado para animación

  // Fetch all products y filtrar "men's clothing"
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (product) => product.category === "men's clothing"
        );
        setProducts(filtered);
        setLoading(false); // Cambiar estado de carga
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div
      ref={ref}
      className={`container mx-auto px-6 py-8 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Men's Clothing
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Cargando productos...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <AnimatedProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              delay={index * 100} // Retraso en ms
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Subcomponente para animar cada tarjeta de producto
function AnimatedProductCard({ product, addToCart, delay }) {
  const [ref, isVisible] = useOnScreen({ threshold: 0.2 }); // Se activa al 20%

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`opacity-0 transform transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "translate-y-10"
      }`}
    >
      <ProductCard product={product} addToCart={addToCart} />
    </div>
  );
}
