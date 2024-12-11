import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

// Add the imported icons to the library
library.add(faFacebookF, faTwitter, faInstagram);

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 opacity-0 translate-y-10 animate-fadeUp">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Logo or Name */}
        <div className="text-lg font-semibold mb-4 md:mb-0">
          <span className="text-white">Fake Store</span> &copy; {new Date().getFullYear()}
        </div>

        {/* Links */}
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

        {/* Social Media Links */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition duration-300 flex items-center space-x-2">
            <FontAwesomeIcon icon={faFacebookF} />
            <span>Facebook</span>
          </a>
          <a href="#" className="hover:text-white transition duration-300 flex items-center space-x-2">
            <FontAwesomeIcon icon={faTwitter} />
            <span>Twitter</span>
          </a>
          <a href="#" className="hover:text-white transition duration-300 flex items-center space-x-2">
            <FontAwesomeIcon icon={faInstagram} />
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
