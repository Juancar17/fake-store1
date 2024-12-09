import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import useOnScreen from "../useOnScreen";

function Jewelery({ addToCart }) {
  const [products, setProducts] = useState([]); // Estado de productos
  const [ref, isVisible] = useOnScreen({ threshold: 0.3 }); // Hook personalizado para animación

  // Fetch de productos de la categoría "jewelery"
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/category/jewelery")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error al obtener los productos:", err));
  }, []);

  return (
    <div
      ref={ref}
      className={`container mx-auto px-6 py-8 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Jewelry Collection
      </h2>

      {/* Mostrar lista de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart} // Pasamos addToCart a cada tarjeta
          />
        ))}
      </div>
    </div>
  );
}

export default Jewelery;
