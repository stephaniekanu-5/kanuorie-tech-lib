export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">

        {/* Logo / About */}
        <div>
          <h2 className="text-xl font-bold mb-4">📚 KanuorieTechlib</h2>
          <p className="text-gray-400">
            Discover thousands of learning resources, and digital
            libraries all in one place.
          </p>
        </div>

        <div>
          <h3 className="font-bold mb-4">Company</h3>
          <ul className="space-y-2 text-gray-400">
           <a href="/About"
              className="hover:text-white transition flex gap-4">
            About
          </a>  
          <a href="/Contact" className="hover:text-white transition flex gap-4">
            Contact
          </a>
          <a href="/privacypolicy" className="hover:text-white transition flex gap-4">
            Privacy Policy
          </a> 
          <a href="/cookies" className="hover:text-white transition flex gap-4">
            Cookie Policy
          </a>
          <a href="/TermsOfService" className="hover:text-white transition flex gap-4">
            Terms of Service
          </a> 
          </ul>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>

          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="/Library" className="hover:text-white">
                Browse Library
              </a>
            </li>
            <li>
              <a href="/profile" className="hover:text-white">
                My Profile
              </a>
            </li>
            <li>
              <a href="/library" className="hover:text-white">
                My Library
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-4">Contact</h3>

          <p className="text-gray-400"

          >
            Email: support@KanuorieTechlib.com
          </p>

          <a
            className="text-blue-600 flex gap-4"
            href="https://www.linkedin.com/in/orie-kanu-8b85683a6?"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>

          <a
            className="text-blue-600 flex gap-4"
            href="https://www.instagram.com/stephaniekanu_/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>

          <a
            className="text-blue-600 flex gap-4"
            href="https://twitter.com/kanustephanie22"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>

          <a
            className="text-blue-600 flex gap-4"
            href="https://web.facebook.com/stephgirlsplace/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>

          <a
            className="text-blue-600 flex gap-4"
            href="https://github.com/stephaniekanu-5"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-4 text-gray-500">
        © {new Date().getFullYear()} KanuorieTechhub... All rights reserved.
      </div>

    </footer>
  );
}