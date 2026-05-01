import Navbar from "../components/Navbar";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy 🔒</h1>

        <p className="text-gray-700 mb-6">
          This Privacy Policy explains how KanuorieTechLib collects, uses,
          and protects your information when you use our platform.
        </p>

        {/* SECTION 1 */}
        <section className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-2">
            1. Information We Collect
          </h2>

          <ul className="list-disc ml-5 text-gray-600 space-y-1">
            <li>Name and email address</li>
            <li>Profile information (avatar, bio, preferences)</li>
            <li>Learning activity (courses, progress, saved resources)</li>
            <li>Device and usage data (for analytics and improvements)</li>
          </ul>
        </section>

        {/* SECTION 2 */}
        <section className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-2">
            2. How We Use Your Information
          </h2>

          <ul className="list-disc ml-5 text-gray-600 space-y-1">
            <li>To create and manage your account</li>
            <li>To personalize your learning experience</li>
            <li>To track course progress and saved resources</li>
            <li>To improve platform performance and features</li>
            <li>To send notifications and updates</li>
          </ul>
        </section>

        {/* SECTION 3 */}
        <section className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-2">
            3. How We Protect Your Data
          </h2>

          <p className="text-gray-600">
            We use secure authentication, encrypted communication, and safe
            database practices to protect your personal information. However,
            no system is 100% secure, and we continuously improve our security
            measures.
          </p>
        </section>

        {/* SECTION 4 */}
        <section className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-2">
            4. Sharing of Information
          </h2>

          <p className="text-gray-600">
            We do not sell your personal data. We may share limited
            information with trusted services (like hosting, analytics, or
            notification providers) strictly to operate the platform.
          </p>
        </section>

        {/* SECTION 5 */}
        <section className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-2">
            5. Your Rights
          </h2>

          <ul className="list-disc ml-5 text-gray-600 space-y-1">
            <li>Access your personal data</li>
            <li>Update or correct your information</li>
            <li>Request deletion of your account</li>
            <li>Opt out of notifications</li>
          </ul>
        </section>

        {/* SECTION 6 */}
        <section className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-2">
            6. Cookies & Tracking
          </h2>

          <p className="text-gray-600">
            We use cookies to improve your experience, remember preferences,
            and analyze usage. You can control cookies through your browser
            settings.
          </p>
        </section>

        {/* SECTION 7 */}
        <section className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-2">
            7. Changes to This Policy
          </h2>

          <p className="text-gray-600">
            We may update this Privacy Policy from time to time. Updates will
            be posted on this page with a new revision date.
          </p>
        </section>

        {/* FOOTER */}
        <div className="text-sm text-gray-500 mt-10">
          Last updated: April 2026
        </div>
      </main>
    </div>
  );
}