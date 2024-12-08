export default function Footer() {
    return (
        <footer className="bg-gray-800 text-gray-300 py-8 opacity-0 translate-y-10 animate-fadeUp">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          {/* Logo o Nombre */}
          <div className="text-lg font-semibold mb-4 md:mb-0">
            <span className="text-white">Fake Store</span> &copy; {new Date().getFullYear()}
          </div>
  
          {/* Enlaces */}
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white transition duration-300">
              About Us
            </a>
            <a href="#" className="hover:text-white transition duration-300">
              Contact
            </a>
            <a href="#" className="hover:text-white transition duration-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition duration-300">
              Terms of Service
            </a>
          </div>
  
          {/* Redes Sociales */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition duration-300">
              <i className="fab fa-facebook"></i> Facebook
            </a>
            <a href="#" className="hover:text-white transition duration-300">
              <i className="fab fa-twitter"></i> Twitter
            </a>
            <a href="#" className="hover:text-white transition duration-300">
              <i className="fab fa-instagram"></i> Instagram
            </a>
          </div>
        </div>
      </footer>
    );
  }
  