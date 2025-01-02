import React, { useEffect, useState } from "react";
import CartModal from "./components/CartModal";
import Categories from "./components/Categories";
import Electronics from "./components/Electronics";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Jewelery from "./components/Jewelery";
import Men from "./components/Men";
import NavBar from "./components/NavBar";
import ProductCarousel from "./components/ProductCarousel";
import Rewiews from "./components/Reviews";
import Woman from "./components/Woman";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Fetch de productos desde la API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error al obtener los productos:", err));
  }, []);

  // Función para añadir productos al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Función para aumentar cantidad
  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Función para disminuir cantidad
  const decreaseQuantity = (productId) => {
    setCart(
      (prevCart) =>
        prevCart
          .map((item) =>
            item.id === productId
              ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
              : item
          )
          .filter((item) => item.quantity > 0) // Eliminar productos con cantidad 0
    );
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <NavBar
          products={products}
          cart={cart}
          openCart={() => setIsCartOpen(true)}
          addToCart={addToCart}
        />
        <Hero />
        <Categories />
        <Jewelery addToCart={addToCart} />
        <Men addToCart={addToCart} />
        <Woman addToCart={addToCart} />
        <Electronics addToCart={addToCart} />
        <ProductCarousel products={products} addToCart={addToCart} />
      </div>

      {isCartOpen && (
        <CartModal
          cart={cart}
          closeCart={() => setIsCartOpen(false)}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
        />
      )}
      <div className="min-h-screen bg-gray-100 p-6">
        <Rewiews />
      </div>

      <Footer />
    </>
  );
}

export default App;
