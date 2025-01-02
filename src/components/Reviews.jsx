import React, { useEffect, useState } from "react";

const Reviews = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch de datos desde la API
  useEffect(() => {
    fetch("https://fakestoreapi.com/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error fetching reviews");
        }
        return res.json();
      })
      .then((data) => {
        // Limitar a 5 usuarios y agregar puntuaciones aleatorias
        const limitedUsers = data.slice(0, 5).map((user) => ({
          ...user,
          rating: Math.floor(Math.random() * 5) + 1, // Puntuación entre 1 y 5
          review: generateRandomReview(), // Generar una reseña aleatoria
        }));
        setUsers(limitedUsers);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center mt-4">Loading reviews...</div>;
  }

  if (error) {
    return <div className="text-center mt-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-6 mt-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-[#00004d]">
        Customer Reviews
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <ReviewCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

// Generar una reseña aleatoria
const generateRandomReview = () => {
  const reviews = [
    "Excellent product, highly recommend!",
    "The quality could be better, but overall satisfied.",
    "Great customer service, quick delivery!",
    "Not worth the price. Wouldn't buy again.",
    "Absolutely love it! Will buy again.",
    "Decent value for money.",
  ];
  return reviews[Math.floor(Math.random() * reviews.length)];
};

// Componente para renderizar cada reseña
const ReviewCard = ({ user }) => {
  const { name, email, username, rating, review } = user;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between h-[350px] transition duration-300 hover:shadow-xl hover:scale-105">
      {/* Nombre del usuario */}
      <h3 className="font-bold text-lg text-[#00004d] mb-2">
        {name.firstname} {name.lastname}
      </h3>
      {/* Email */}
      <p className="text-gray-500 text-sm mb-2">Email: {email}</p>
      {/* Dirección */}
      <p className="text-gray-600 text-sm mb-4">UserName: {username}</p>
      {/* Reseña */}
      <p className="italic text-gray-800 text-sm mb-4">"{review}"</p>
      {/* Puntuación */}
      <div className="flex items-center">
        {Array.from({ length: 5 }, (_, index) => (
          <span
            key={index}
            className={`${
              index < rating ? "text-blue-400" : "text-gray-300"
            } text-xl`}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
