import Navbar from "../components/Navbar";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">Cookie Policy 🍪</h1>

        <p className="text-gray-700 mb-6">
          This Cookie Policy explains how KanuorieTechLib uses cookies and
          similar tracking technologies to improve your experience.
        </p>

        {/* SECTION 1 */}
        <section className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-2">
            1. What Are Cookies?
          </h2>
          <p className="text-gray-600">
            Cookies are small text files stored on your device when you visit
            a website. They help us remember your preferences and improve
            performance.
          </p>
        </section>

        {/* SECTION 2 */}
        <section className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-2">
            2. How We Use Cookies
          </h2>
          <ul className="list-disc ml-5 text-gray-600 space-y-1">
            <li>To keep you logged in</li>
            <li>To remember your preferences (dark mode, settings)</li>
            <li>To improve platform performance</li>
            <li>To analyze user activity and improve features</li>
          </ul>
        </section>

        {/* SECTION 3 */}
        <section className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-2">
            3. Types of Cookies We Use
          </h2>

          <div className="space-y-3 text-gray-600">
            <p>
              <span className="font-semibold">Essential Cookies:</span> Required
              for the app to function properly.
            </p>
            <p>
              <span className="font-semibold">Authentication Cookies:</span> Keep
              you logged in securely.
            </p>
            <p>
              <span className="font-semibold">Preference Cookies:</span> Store
              settings like theme and layout.
            </p>
            <p>
              <span className="font-semibold">Analytics Cookies:</span> Help us
              understand usage patterns.
            </p>
          </div>
        </section>

        {/* SECTION 4 */}
        <section className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-2">
            4. Managing Cookies
          </h2>
          <p className="text-gray-600">
            You can control or disable cookies through your browser settings.
            However, disabling essential cookies may affect how the platform
            works.
          </p>
        </section>

        {/* SECTION 5 */}
        <section className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-2">
            5. Third-Party Cookies
          </h2>
          <p className="text-gray-600">
            We may use trusted third-party services (like analytics tools) that
            also place cookies to help us improve the platform.
          </p>
        </section>

        {/* FOOTER NOTE */}
        <div className="text-sm text-gray-500 mt-10">
          Last updated: April 2026
        </div>
      </main>
    </div>
  );
}