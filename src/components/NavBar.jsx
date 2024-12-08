import React, { useEffect, useState } from "react";

const NavBar = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Activar la animación de fade-in al cargar el NavBar
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white shadow-md transition-transform duration-1000 translate-y-[-100%] animate-slideDown">
     <nav className="flex items-center justify-between p-6 lg:px-8"> {/* Logo */}
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5 flex items-center">
            <span className="ml-2 text-lg font-bold text-[#00004d]">
              Fake Store 🛍️
            </span>
          </a>
        </div>

        {/* Menú de Navegación */}
        <div className="hidden lg:flex lg:gap-x-12">
          <a
            href="#"
            className="text-sm font-semibold text-gray-900 relative group hover:text-[#00004d]"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00004d] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="#carousel"
            className="text-sm font-semibold text-gray-900 relative group hover:text-[#00004d]"
          >
            Products
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00004d] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="#Categories"
            className="text-sm font-semibold text-gray-900 relative group hover:text-[#00004d]"
          >
            Categories
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00004d] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="#Contact"
            className="text-sm font-semibold text-gray-900 relative group hover:text-[#00004d]"
          >
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00004d] transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>

        {/* Carrito y Login */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center space-x-4">
          <button className="relative text-gray-700 hover:text-[#00004d] transition-transform duration-300 hover:scale-110">
            <span>🛒</span>
          </button>
          <a
            href="#"
            className="text-sm font-semibold text-gray-900 hover:text-[#00004d] transition-colors duration-300"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
