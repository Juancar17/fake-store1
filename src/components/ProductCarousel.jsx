import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard"; // Reutilizamos tu ProductCard

export default function ProductCarousel({ products }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Función para pasar al siguiente slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Función para pasar al slide anterior
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  // Efecto para autoplay cada 2 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2000); // 2000ms = 2 segundos

    return () => clearInterval(interval); // Limpia el temporizador al desmontar el componente
  }, [currentIndex]); // Se ejecuta cada vez que cambia el índice

  return (
    <div className="relative w-full max-w-screen-lg mx-auto mt-6" id="carousel">
      <h2 className="text-3xl font-bold text-center mb-4">Best Sellers</h2>

      {/* Contenedor del Carrusel */}
      <div className="overflow-hidden relative h-[500px]">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-full flex items-center justify-center"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Botones de Navegación */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-700"
      >
        &#8592;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-700"
      >
        &#8594;
      </button>

      {/* Indicadores */}
      <div className="flex justify-center mt-4">
        {products.map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 mx-1 rounded-full ${
              currentIndex === index ? "bg-gray-800" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
