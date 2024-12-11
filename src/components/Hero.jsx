import React from "react";
import useOnScreen from "../useOnScreen";

export default function Hero() {
  const [ref, isVisible] = useOnScreen({ threshold: 0.3 }); // Detecta cuando el 30% del elemento es visible

  const handleCategoryClick = () => {
    const section = document.getElementById("carousel");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gray-100 overflow-hidden" ref={ref} id="home">
      <div
        className={`container mx-auto flex flex-col lg:flex-row items-center justify-between px-6 py-12 lg:py-24 transition-all duration-1000 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* Texto del Hero */}
        <div
          className={`w-full lg:w-1/2 text-center lg:text-left transform transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Welcome at{" "}
            <span className="text-[#00004d]">Fake Store</span>
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            La mejor tienda en línea para descubrir productos increíbles. Desde
            ropa hasta tecnología, ¡tenemos todo lo que necesitas!
          </p>
          <div className="mt-6">
            <button
              onClick={() => handleCategoryClick()}
              className="inline-block rounded-md bg-[#00004d] px-6 py-3 text-white text-lg font-semibold shadow-md hover:bg-[#000033] transition duration-300 transform hover:scale-110 active:scale-95"
            >
              Explorar Productos
            </button>
          </div>
        </div>

        {/* Imagen del Hero */}
        <div
          className={`w-full lg:w-1/2 flex justify-center transform transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          }`}
        >
          <img
            src="..\30Sep24 Anis Online Store Free Upload.png"
            alt="Hero Image"
            className="w-full max-w-sm lg:max-w-md rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
