import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-14 pb-6 px-6 mt-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">
            Journify<span className="text-blue-400">.</span>
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            India's platform for IT freshers and academic research services. Start your journey today.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center text-xs transition">
              in
            </a>
            <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-blue-400 rounded-lg flex items-center justify-center text-xs transition">
              tw
            </a>
            <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-pink-600 rounded-lg flex items-center justify-center text-xs transition">
              ig
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-blue-400 transition">Home</Link></li>
            <li><Link href="/jobs" className="hover:text-blue-400 transition">Browse Jobs</Link></li>
            <li><Link href="/services" className="hover:text-blue-400 transition">Services</Link></li>
            <li><Link href="/match" className="hover:text-blue-400 transition">AI Job Match</Link></li>
            <li><Link href="/profile" className="hover:text-blue-400 transition">My Profile</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white font-semibold mb-4">Our Services</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/services" className="hover:text-blue-400 transition">Implementation</Link></li>
            <li><Link href="/services" className="hover:text-blue-400 transition">Conference Paper</Link></li>
            <li><Link href="/services" className="hover:text-blue-400 transition">Journal Paper</Link></li>
            <li><Link href="/services" className="hover:text-blue-400 transition">PPT Presentation</Link></li>
            <li><Link href="/services" className="hover:text-blue-400 transition">Plagiarism Removal</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <span>📧</span>
              <span>journifyorg@gmail.com</span>
            </li>
            <li className="flex items-center gap-2">
              <span>📍</span>
              <span>Bengaluru,India</span>
            </li>
            <li className="flex items-center gap-2">
              <span>📞</span>
              <span>+91 79042 03916</span>
            </li>
            <li className="flex items-center gap-2">
              <span>💬</span>
              <a href="https://wa.me/917904203916" target="_blank" rel="noopener noreferrer"
                className="hover:text-green-400 transition">
                WhatsApp Us
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 gap-2">
        <p>© 2025 Journify. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-blue-400 transition">Privacy Policy</Link>
          <Link href="#" className="hover:text-blue-400 transition">Terms of Service</Link>
          <Link href="#" className="hover:text-blue-400 transition">Refund Policy</Link>
        </div>
      </div>
    </footer>
  );
}