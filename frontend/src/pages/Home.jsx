import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import FeaturesSlider from "../components/FeaturesSlider";
import Footer from "../components/footer";

export default function Home() {
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    text: "",
  });

  /* ================= LOAD COMMENTS (SAFE) ================= */
  useEffect(() => {
    try {
      const stored = localStorage.getItem("comments");
      setComments(stored ? JSON.parse(stored) : []);
    } catch (err) {
      console.error("Failed to parse comments:", err);
      setComments([]);
    }
  }, []);

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* ================= SUBMIT COMMENT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.text) {
      alert("All fields are required");
      return;
    }

    const newComment = {
      ...form,
      id: Date.now(),
    };

    const updated = [...comments, newComment];

    setComments(updated);
    localStorage.setItem("comments", JSON.stringify(updated));

    setForm({ name: "", email: "", text: "" });
  };

  const testimonials = [
    {
      name: "David K.",
      role: "Frontend Developer",
      message:
        "This platform helped me find the best resources to level up my React skills.",
      avatar: "https://i.pravatar.cc/100?img=1",
    },
    {
      name: "Sarah M.",
      role: "UI/UX Designer",
      message:
        "I love how everything is organized. It saves me hours of searching!",
      avatar: "https://i.pravatar.cc/100?img=5",
    },
    {
      name: "James T.",
      role: "Backend Developer",
      message:
        "Finally a focused learning platform for developers.",
      avatar: "https://i.pravatar.cc/100?img=8",
    },
  ];

  const faqs = [
    {
      question: "What is KanuorieTechLib?",
      answer:
        "A curated platform for developers to learn and grow.",
    },
    {
      question: "Is it free?",
      answer: "Yes, it's completely free.",
    },
    {
      question: "Can I contribute?",
      answer: "Yes, via your profile after login.",
    },
    {
      question: "Do I need an account?",
      answer:
        "Not required for browsing, but needed for saving progress.",
    },
  ];

  return (
    <div className="min-h-screen bg-blue-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4">

        {/* HERO */}
        <section>
          <div
            className="relative h-64 w-full bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=60")',
            }}
          >
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-10">
              <h1 className="text-3xl font-bold text-white text-center">
                Curated knowledge for the <br />
                <span className="text-blue-500">modern developer.</span>
              </h1>
            </div>
          </div>
        </section>

        <div className="p-5">
          <p className="text-lg text-gray-600 mt-6">
            Unlock your tech potential with structured learning resources at your fingertips. Whether you're a beginner or a seasoned professional pushing toward mastery, explore powerful, 
            handpicked resources designed to accelerate your growth. Learn smarter, build faster, and become the developer you’ve always aimed to be starting today.
          </p>

          <Link
            to="/library"
            className="bg-blue-600 text-white px-6 py-3 rounded-full mt-6 inline-block"
          >
            Explore Resources →
          </Link>
        </div>

        {/* IMAGE */}
        <section className="mt-10">
          <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
            alt="Developer learning"
            className="w-full rounded-lg shadow-lg"
          />
        </section>

        {/* CTA */}
        <section className="mt-10 p-4">
          <h2 className="text-3xl font-bold text-center">
            Ready to Level Up?
          </h2>

          <p className="text-gray-600 mt-4">
            Join thousands of developers who are already learning and growing with KanuorieTechLib. 
            Your next big breakthrough is just a click away! create an account to save your favorite resources,
            track your progress, and contribute to the community.
          </p>

          <Link
            to="/profile"
            className="bg-purple-600 text-white px-6 py-3 rounded-full mt-6 inline-block"
          >
            Get Started Now
          </Link>
        </section>

        {/* FEATURES */}
        <section className="mt-16 px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">
              Why choose KanuorieTechLib?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Curated Resources",
                desc: "High-quality learning materials.",
              },
              {
                title: "Organized Learning",
                desc: "Structured paths that guide you from beginner to advanced.",
              },
              {
                title: "Community",
                desc: "Learn together, share knowledge, and grow with others.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="my-16 bg-white p-6 rounded-2xl shadow-md mt-20">
          <FeaturesSlider />
        </div>

        {/* TESTIMONIALS */}
        <section className="bg-white p-6 rounded-2xl shadow-md mt-20">
          <h2 className="text-3xl font-bold text-center">
            What Developers Say
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {testimonials.map((t, i) => (
              <div key={i} className="p-6 rounded-xl shadow">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={t.avatar}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">{t.name}</h3>
                    <p className="text-sm text-gray-500">
                      {t.role}
                    </p>
                  </div>
                </div>
                <p className="italic">"{t.message}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold text-center">
            FAQ
          </h2>

          <div className="max-w-3xl mx-auto mt-6 space-y-4">
            {faqs.map((f, i) => (
              <details
                key={i}
                className="bg-white p-4 rounded-xl shadow"
              >
                <summary className="font-bold">
                  {f.question}
                </summary>
                <p className="text-gray-600 mt-2">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* COMMENTS */}
        <section className="mt-20 bg-white p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-6">
            Leave a Comment
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full border p-2 rounded"
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border p-2 rounded"
            />

            <textarea
              name="text"
              value={form.text}
              onChange={handleChange}
              rows="4"
              className="w-full border p-2 rounded"
              placeholder="Comment"
            />

            <button className="bg-blue-600 text-white px-6 py-2 rounded">
              Send
            </button>
          </form>

          <div className="mt-6 space-y-3">
            {comments.length === 0 ? (
              <p className="text-gray-500">No comments yet.</p>
            ) : (
              comments.map((c) => (
                <div
                  key={c.id}
                  className="border p-3 rounded"
                >
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-sm text-gray-500">
                    {c.email}
                  </p>
                  <p>{c.text}</p>
                </div>
              ))
            )}
          </div>
        </section>
                {/* NEWSLETTER */}
        <section className="mt-20 p-4">
          <h2 className="text-3xl font-bold mb-4">
            Stay Updated
          </h2>

          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 border rounded-md"
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
              Subscribe
            </button>
          </form>
        </section>
        <Footer />
      </main>
    </div>
  );
}