import Navbar from "../components/Navbar";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">Terms of Service 📜</h1>

        <p className="text-gray-700 mb-6">
          These Terms of Service govern your use of KanuorieTechLib. By
          accessing or using the platform, you agree to be bound by these
          terms.
        </p>

        {/* SECTION 1 */}
        <section className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-2">1. Use of the Platform</h2>
          <p className="text-gray-600">
            You agree to use this platform only for educational and lawful
            purposes. You must not misuse, copy, or attempt to disrupt the
            service.
          </p>
        </section>

        {/* SECTION 2 */}
        <section className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-2">2. Accounts</h2>
          <p className="text-gray-600">
            You are responsible for maintaining the confidentiality of your
            account credentials and for all activities under your account.
          </p>
        </section>

        {/* SECTION 3 */}
        <section className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-2">3. Content</h2>
          <p className="text-gray-600">
            All resources provided are for learning purposes. We do not
            guarantee accuracy or completeness of external content.
          </p>
        </section>

        {/* SECTION 4 */}
        <section className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-2">4. Termination</h2>
          <p className="text-gray-600">
            We reserve the right to suspend or terminate accounts that violate
            these terms or misuse the platform.
          </p>
        </section>

        {/* SECTION 5 */}
        <section className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-2">5. Changes</h2>
          <p className="text-gray-600">
            These terms may be updated at any time. Continued use of the
            platform means you accept the updated terms.
          </p>
        </section>

        <div className="text-sm text-gray-500 mt-10">
          Last updated: April 2026
        </div>
      </main>
    </div>
  );
}