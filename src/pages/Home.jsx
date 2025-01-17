import React from "react";

const Home = () => {
  // Configuración de las opciones para IntersectionObserver
  const options = {
    root: null, // Usa el viewport como contenedor raíz
    rootMargin: "0px",
    threshold: 0.5, // El 50% del elemento debe ser visible
  };

  // Hook personalizado para detectar visibilidad

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section
        className="flex-grow relative w-full bg-cover bg-center flex items-center justify-center text-center"
        style={{
          backgroundImage: "url('../public/1.jpg')", // Cambia a la ruta real de la imagen
          backgroundSize: "cover",
        }}
      >
        {/* Overlay para oscurecer la imagen */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        {/* Contenido del Hero Section */}
        <div className="relative z-10 max-w-3xl text-white px-4 flex flex-col items-center gap-y-6 animate-fadeIn">
          <h1 className="text-5xl font-extrabold animate-moveUp delay-100">
            ¡Bienvenido a <span className="text-[#4d79ff]">Kafé con K</span>!
          </h1>
          <p className="text-lg animate-moveUp delay-200">
            El lugar perfecto para disfrutar de un buen café junto a tus mejores
            amigos, humanos y peludos.
          </p>
          <h3 className="text-4xl font-extrabold animate-moveUp delay-100">
            🐾 Aquí, tus mascotas siempre son bienvenidas. 🐾
          </h3>
          <a
            href="/productos"
            className="mt-6 px-6 py-3 bg-[#4d79ff] text-white text-lg font-semibold rounded-full border-2 border-[#4d79ff] hover:bg-transparent hover:text-[#4d79ff] transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl"
          >
            Descubre más
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
