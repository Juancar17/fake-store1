import React, { useEffect, useState } from "react";
import { GiShoppingCart } from "react-icons/gi";

const NavBar = ({ products, cart, openCart }) => {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el input de búsqueda
  const [filteredResults, setFilteredResults] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false); // Estado del menú hamburguesa

  // Filtrar productos cuando cambia el término de búsqueda
  useEffect(() => {
    const results = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredResults(results);
  }, [searchTerm, products]);

  return (
    <>
      {/* NavBar principal */}
      <header className="fixed inset-x-0 top-0 z-50 bg-white shadow-md">
        <nav className="flex items-center justify-between p-6 lg:px-8">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <a href="#home" className="-m-1.5 p-1.5 flex items-center">
              <span className="ml-2 text-lg font-bold text-[#00004d]">
                Fake Store 🛍️
              </span>
            </a>
          </div>



          {/* Botón Hamburguesa */}
          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 hover:text-[#00004d] focus:outline-none"
            >
              {menuOpen ? (
                <span className="text-2xl">✖</span>
              ) : (
                <span className="text-2xl">☰</span>
              )}
            </button>
          </div>

          {/* Menú de Navegación Desktop */}
          <div className="hidden lg:flex lg:gap-x-12">
            {["Home", "Products", "Categories", "Contact"].map((item, idx) => (
              <a
                key={idx}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-semibold text-gray-900 hover:text-[#00004d]"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Carrito y Login */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full focus:outline-none focus:ring focus:ring-indigo-300"
            />
            <div className="relative cursor-pointer" onClick={openCart}>
              <span className="text-2xl">
              <GiShoppingCart />
                </span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                  {totalItems}
                </span>
              )}
            </div>
            <a
              href="#login"
              className="text-sm font-semibold text-gray-900 hover:text-[#00004d]"
            >
              Log in &rarr;
            </a>
          </div>
        </nav>

        {/* Menú Hamburguesa (Móvil) */}
        {menuOpen && (
          <div className="lg:hidden bg-white shadow-md px-6 py-4 flex flex-col items-center justify-center text-center">
          {/* Input de búsqueda */}
          <div className="mb-4 w-full">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-full focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>

            {/* Enlaces del menú */}
            <div className="flex flex-col gap-y-4">
              {["Home", "Products", "Categories", "Contact"].map((item, idx) => (
                <a
                  key={idx}
                  href={`#${item.toLowerCase()}`}
                  className="block text-sm font-semibold text-gray-900 hover:text-[#00004d] transition duration-300"
                  onClick={() => setMenuOpen(false)} // Cerrar menú al hacer clic
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Resultados de búsqueda */}
      {searchTerm && (
        <div className="mt-24 container mx-auto px-6">
          <h3 className="text-lg font-semibold mb-4">Search Results:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredResults.length > 0 ? (
              filteredResults.map((product) => (
                <SearchResultCard key={product.id} product={product} />
              ))
            ) : (
              <p>No results found.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

// Componente para las tarjetas de búsqueda
function SearchResultCard({ product }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4 flex flex-col justify-between h-[420px] transition duration-300 hover:shadow-2xl">
      <div className="h-40 w-full flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full object-contain"
        />
      </div>
      <div className="flex-1 text-center mt-4">
        <h2 className="font-bold text-gray-800 text-lg line-clamp-2">
          {product.title}
        </h2>
        <p className="text-gray-500 text-sm mt-2">{product.category}</p>
        <p className="text-green-600 font-bold mt-2">${product.price}</p>
      </div>
      <button
      className="w-full sm:w-auto px-4 py-2 bg-[#00004d] text-white text-sm sm:text-base rounded-md hover:bg-[#000033] transition duration-300"
        >
          <GiShoppingCart />
        </button>
        </div>
  );
}

export default NavBar;
