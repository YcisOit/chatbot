import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-8 mt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* About Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-teal-300">Rayat Store</h2>
          <p className="text-base leading-relaxed text-gray-300">
            Rayat Store is your one-stop shop for quality products at affordable prices.
            Fast delivery, trusted service!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-teal-300">Quick Links</h2>
          <ul className="space-y-3 text-base text-gray-300">
            <li><Link href="/" className="hover:text-white transition">Home</Link></li>
            {/* <li><Link href="/shop" className="hover:text-white transition">Shop</Link></li> */}
            <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-teal-300">Contact Us</h2>
          <p className="text-base flex items-center mb-3 text-gray-300">
            <FaEnvelope className="inline mr-3 text-lg text-teal-300" />
            rayatstore@gmail.com
          </p>
          <div className="flex space-x-5 mt-4 text-xl">
            <Link href="#" className="hover:text-teal-300 transition"><FaFacebookF /></Link>
            <Link href="#" className="hover:text-teal-300 transition"><FaInstagram /></Link>
            <Link href="#" className="hover:text-teal-300 transition"><FaTwitter /></Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 text-center text-sm text-gray-400 border-t border-gray-600 pt-5">
        © {new Date().getFullYear()} <span className="text-white font-medium">Rayat Store</span> | Powered by <span className="text-white font-medium">YCIS OIT, Satara</span>
      </div>
    </footer>
  );
}
