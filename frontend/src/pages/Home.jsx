import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ImageSlider from "../components/imageSlider";
import FeaturesSlider from "../components/FeaturesSlider";
import Footer from "../components/footer";

export default function Home() {
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    text: "",
  });

  /* ================= LOAD COMMENTS ================= */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("comments") || "[]");
    setComments(stored);
  }, []);

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= SUBMIT COMMENT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.text) {
      alert("All fields are required");
      return;
    }

    const newComments = [
      ...comments,
      { ...form, id: Date.now() },
    ];

    localStorage.setItem("comments", JSON.stringify(newComments));
    setComments(newComments);

    setForm({ name: "", email: "", text: "" });
  };
const testimonials = [
  {
    name: "David K.",
    role: "Frontend Developer",
    message:
      "This platform helped me find the best resources to level up my React skills. Super clean and easy to use!",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "Sarah M.",
    role: "UI/UX Designer",
    message:
      "I love how everything is organized. It saves me hours of searching online!",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
  {
    name: "James T.",
    role: "Backend Developer",
    message:
      "Finally a place where developers can learn without distractions. Highly recommended!",
    avatar: "https://i.pravatar.cc/100?img=8",
  },
];

const faqs = [
  {
    question: "What is KanuorieTechLib?",
    answer:
      "It’s a curated platform where developers can find high-quality learning resources across different tech fields.",
  },
  {
    question: "Is it free to use?",
    answer:
      "Yes! All resources are freely accessible for learning and growth.",
  },
  {
    question: "Can I add my own resources?",
    answer:
      "Absolutely. You can contribute resources directly from your profile.",
  },
  {
    question: "Do I need an account?",
    answer:
      "You can browse freely, but creating an account helps you save courses and track progress.",
  },
];

  return (
    <div className="min-h-screen bg-blue-50">
      <Navbar />
      {/* <ImageSlider /> */}
      <main className="max-w-7xl mx-auto px-">
                {/* HERO */}
        <section className="">
          <div
            className="relative h-64 w-full bg-cover bg-center"
            style={{ backgroundImage: `url("https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=60")` }}
          >
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-10">
                <h1 className="text-3xl font-bold leading-tight mb-6 text-center text-white">
                  Curated knowledge for the{" "} 
                <br />
                  <span className="text-blue-500">
                    modern developer.
                  </span>
                </h1>         
            </div>
          </div>
          </section>
          <div className="p-5">
          <p className="text-lg text-gray-600 mt-6">
            Unlock your full Tech potential, Discover a world of learning at your fingertips. Whether you're a beginner or a seasoned professional pushing toward mastery, explore powerful, 
            handpicked resources designed to accelerate your growth. Learn smarter, build faster, and become the developer you’ve always aimed to be starting today.
          </p>
          <Link
            to="/library"
            className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transition mt-6 inline-block"
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

        {/* ADD RESOURCE CTA */}
        <section className="mt-10 p-4">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Ready to Level Up? 
          </h2>
          <p className="text-gray-600 mt-4">
            Join thousands of developers who are already learning and growing with KanuorieTechLib. Your next big breakthrough is just a click away! create an account to save your favorite resources, track your progress, and contribute to the community.
          </p>
          <Link
            to="/profile"
            className="bg-purple-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-purple-700 transition mt-6 inline-block"
          >
            Get Started Now
          </Link>
        </section>

        {/* FEATURES */}
        <section className="mt-16 px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why choose KanuorieTechLib?
          </h2>
          <p className="text-gray-500 mt-3">
            Everything you need to learn, build, and grow in one place.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Curated Resources",
              desc: "Hand-picked materials to ensure high-quality learning content.",
            },
            {
              title: "Organized Learning",
              desc: "Structured paths that guide you from beginner to advanced.",
            },
            {
              title: "Community-Driven",
              desc: "Learn together, share knowledge, and grow with others.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition duration-300 border border-gray-100"
            >
              <h3 className="font-semibold text-lg mb-2 text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="my-16 bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition mt-20">
        <FeaturesSlider />
      </div>

        {/* ================= TESTIMONIALS ================= */}
        <section className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition mt-20">
          <h2 className="text-3xl font-bold mb-8 text-center">
            What Developers Say 💬
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{t.name}</h3>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </div>

                <p className="text-gray-600 italic">
                  “{t.message}”
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Frequently Asked Questions 
          </h2>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="bg-white p-4 rounded-xl shadow cursor-pointer"
              >
                <summary className="font-bold text-lg">
                  {faq.question}
                </summary>
                <p className="text-gray-600 mt-2">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* COMMENT SECTION */}
        <section className="mt-20 border p-6 rounded-xl bg-white">
          <h2 className="text-2xl font-bold mb-6">
            Leave a Comment
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded-md"
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border rounded-md"
            />

            <textarea
              name="text"
              value={form.text}
              onChange={handleChange}
              rows="4"
              placeholder="Your Comment"
              className="w-full border p-2 rounded-md"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Send Comment
            </button>
          </form>

          {/* COMMENTS LIST */}
          <div className="mt-8 space-y-4">
            {comments.length === 0 && (
              <p className="text-gray-500">
                No comments yet.
              </p>
            )}

            {comments.map((c) => (
              <div
                key={c.id}
                className="border p-4 rounded-lg bg-gray-50"
              >
                <p className="font-semibold">{c.name}</p>
                <p className="text-sm text-gray-500">
                  {c.email}
                </p>
                <p className="mt-2">{c.text}</p>
              </div>
            ))}
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