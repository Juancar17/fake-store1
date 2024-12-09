import React, { useEffect, useState } from "react";

const NavBar = ({ products, cart, openCart })=> {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el valor del input
  const [filteredResults, setFilteredResults] = useState([]);

  // Actualizar los resultados al cambiar el término de búsqueda
  useEffect(() => {
    const results = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredResults(results);
  }, [searchTerm, products]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-white shadow-md transition-transform duration-1000 translate-y-[-100%] animate-slideDown">
        <nav className="flex items-center justify-between p-6 lg:px-8">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5 flex items-center">
              <span className="ml-2 text-lg font-bold text-[#00004d]">
                Fake Store 🛍️
              </span>
            </a>
          </div>

          {/* Menú de Navegación */}
          <div className="hidden lg:flex lg:gap-x-12">
            {["Home", "Products", "Categories", "Contact"].map((item, idx) => (
              <a
                key={idx}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-semibold text-gray-900 relative group hover:text-[#00004d]"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00004d] transition-all duration-300 group-hover:w-full"></span>
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
      
            <span className="text-2xl">🛒</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                  {totalItems}
                </span>
              )}
            </div>
            <a
              href="#"
              className="text-sm font-semibold text-gray-900 hover:text-[#00004d] transition-colors duration-300"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
      </header>

      {/* Mostrar resultados de búsqueda */}
      <div className="mt-24 container mx-auto px-6">
        {searchTerm && (
          <div>
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
      </div>
    </>
  );
};

// Componente para la tarjeta de producto en resultados de búsqueda
function SearchResultCard({ product }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4 flex flex-col justify-between h-[420px] transition duration-300 hover:shadow-2xl">
      {/* Imagen */}
      <div className="h-40 w-full flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full object-contain"
        />
      </div>

      {/* Contenido */}
      <div className="flex-1 text-center mt-4">
        <h2 className="font-bold text-gray-800 text-lg line-clamp-2">
          {product.title}
        </h2>
        <p className="text-gray-500 text-sm mt-2">{product.category}</p>
        <p className="text-green-600 font-bold mt-2">${product.price}</p>
      </div>

      {/* Botón */}
      <button className="mt-4 bg-[#00004d] text-white font-semibold py-2 rounded-md shadow hover:bg-[#000033] transition duration-300">
        <span>🛒 Add to Cart</span>
      </button>
    </div>
  );
}

export default NavBar;