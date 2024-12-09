export default function ProductCard({ product }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4 flex flex-col justify-between h-[420px] transition duration-300 hover:shadow-2xl" id="products">
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
      <button
        className="mt-4 bg-[#00004d] text-white font-semibold py-2 rounded-md shadow hover:bg-[#000033] transition duration-300"
      >
        <span>🛒</span>
      </button>
    </div>
  );
}
