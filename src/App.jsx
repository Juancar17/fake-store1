import { useState, useEffect } from "react";
import NavBar from "./components/NavBar.jsx";
import Hero from "./components/hero.jsx";
import Categories from "./components/Categories.jsx";
import ProductCarousel from "./components/ProductCarousel.jsx";
import Jewelery from "./components/Jewelery.jsx";
import Electronics from "./components/Electronics.jsx";
import Men from "./components/Men.jsx";
import Woman from "./components/Woman.jsx";
import Footer from "./components/Footer.jsx";
import Cart from "./components/Cart.jsx";
import ProductModal from "./components/ProductModal.jsx";
import ProductCard from "./components/ProductCard.jsx";

function App() {
  const [products, setProducts] = useState([]); // Estado para productos
  const [cart, setCart] = useState([]); // Estado del carrito
  const [selectedProduct, setSelectedProduct] = useState(null); // Producto seleccionado para el modal

  // Fetch de productos desde la API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error al obtener los productos:", err));
  }, []);

  // Añadir producto al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Eliminar producto del carrito
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Abrir modal del producto
  const openProductModal = (product) => {
    setSelectedProduct(product);
  };

  // Cerrar modal del producto
  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        {/* NavBar */}
        <NavBar products={products} />

        {/* Hero */}
        <Hero />

        {/* Categorías y Listado de Productos */}
        <Categories />
        <Jewelery />
        <Electronics />
        <Men />
        <Woman />

        {/* Carrusel de Productos */}
        <ProductCarousel products={products} />

        {/* Mostrar Productos */}
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
          {products.map((product) => (
            <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart} // Pasamos la función correctamente
            onProductClick={() => openProductModal(product)}
          />
          
          ))}
        </div>

        {/* Modal del Producto */}
        {selectedProduct && (
          <ProductModal
          product={selectedProduct}
          addToCart={addToCart} // Pasamos la función correctamente
          onClose={closeProductModal}
        />
        )}
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
