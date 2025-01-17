import {
  faBars,
  faPlus,
  faShoppingCart,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú móvil
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decodificar el token JWT
      setIsAdmin(decodedToken.is_admin); // Verificar si el usuario es administrador
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Eliminar token
    setIsLoggedIn(false); // Actualizar estado
    setIsAdmin(false); // Actualizar rol
    setIsMenuOpen(false); // Cerrar menú móvil si está abierto
    navigate("/"); // Redirigir al inicio
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-trasparent backdrop-blur backdrop-filter backdrop-saturate-150">
      <nav className="flex items-center justify-between p-4 lg:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="ml-2 text-3xl font-extrabold text-white font-custom">
              Mi <span className="text-[#4d79ff] text-5xl">Tienda</span>
            </span>
          </Link>
        </div>

        {/* Menú principal */}
        <div className="hidden md:flex flex-grow justify-center space-x-8">
          <Link
            to="/"
            className="text-sm font-semibold text-white relative group hover:text-[#4d79ff]"
          >
            Inicio
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4d79ff] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            to="/productos"
            className="text-sm font-semibold text-white relative group hover:text-[#4d79ff]"
          >
            Productos
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4d79ff] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            to="/nosotros"
            className="text-sm font-semibold text-white relative group hover:text-[#4d79ff]"
          >
            Nosotros
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4d79ff] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            to="/contacto"
            className="text-sm font-semibold text-white relative group hover:text-[#4d79ff]"
          >
            Contacto
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4d79ff] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            to="/add-product"
            className="text-sm font-semibold text-white relative group hover:text-[#4d79ff]"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-1" />
            Añadir Producto
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4d79ff] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>

        {/* Botón para menú móvil */}
        <button
          className="md:hidden flex items-center text-white hover:text-[#4d79ff]"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
        </button>

        {/* Enlaces de sesión */}
        <div className="hidden md:flex items-center space-x-6">
          {isLoggedIn ? (
            <>
              <Link
                to="/perfil"
                className="text-sm font-semibold text-white flex items-center space-x-2 hover:text-[#4d79ff]"
              >
                <FontAwesomeIcon icon={faUser} />
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm font-semibold text-white flex items-center space-x-2 hover:text-[#ff4d4d]"
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-sm font-semibold text-white flex items-center space-x-2 hover:text-[#4d79ff]"
            >
              <FontAwesomeIcon icon={faUser} />
            </Link>
          )}
          <Link
            to="/carrito"
            className="text-sm font-semibold text-white flex items-center space-x-2 hover:text-[#4d79ff]"
          >
            <FontAwesomeIcon icon={faShoppingCart} />
          </Link>
        </div>
      </nav>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden mt-2 bg-trasparent inset-0 flex flex-col items-center justify-center z-40 space-y-6 animate-slideDown">
          <Link
            to="/"
            className="text-lg font-semibold text-white hover:text-[#4d79ff]"
            onClick={() => setIsMenuOpen(false)}
          >
            Inicio
          </Link>
          <Link
            to="/nosotros"
            className="text-lg font-semibold text-white hover:text-[#4d79ff]"
            onClick={() => setIsMenuOpen(false)}
          >
            Nosotros
          </Link>
          <Link
            to="/productos"
            className="text-lg font-semibold text-white hover:text-[#4d79ff]"
            onClick={() => setIsMenuOpen(false)}
          >
            Productos
          </Link>
          <Link
            to="/contacto"
            className="text-lg font-semibold text-white hover:text-[#4d79ff]"
            onClick={() => setIsMenuOpen(false)}
          >
            Contacto
          </Link>
          {isAdmin && (
            <Link
              to="/add-product"
              className="text-lg font-semibold text-white hover:text-[#4d79ff]"
              onClick={() => setIsMenuOpen(false)}
            >
              Añadir Producto
            </Link>
          )}
          {isLoggedIn ? (
            <>
              <Link
                to="/perfil"
                className="text-lg font-semibold text-white hover:text-[#4d79ff]"
                onClick={() => setIsMenuOpen(false)}
              >
                Perfil
              </Link>
              <button
                onClick={handleLogout}
                className="text-lg font-semibold text-white hover:text-[#ff4d4d]"
              >
                Salir
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-lg font-semibold text-white hover:text-[#4d79ff]"
              onClick={() => setIsMenuOpen(false)}
            >
              Iniciar Sesión
            </Link>
          )}
          <Link
            to="/carrito"
            className="text-lg font-semibold text-white hover:text-[#4d79ff]"
            onClick={() => setIsMenuOpen(false)}
          >
            Carrito
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
