import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= HANDLE SUBMIT =================
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus("❌ Please fill all fields");
      return;
    }

    // Simulate sending (you can connect backend later)
    setTimeout(() => {
      setStatus("✅ Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    }, 500);
  };

  return (
    <main>
      <Navbar />
      <div className="p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Contact Us 📩</h1>
        <div><b>
          If you have any questions, feedback, or need assistance, feel free to reach out to us. We're here to help!
          You can contact us through the following channels:
        </b></div>
              
        <div className="py-10 ">
          We value your feedback and are always looking for ways to improve our platform. Whether you have suggestions for new courses, want to report an issue, or just want to say hello, we would love to hear from you. Our support team is available Monday through Friday from 9 AM to 5 PM (EST) and will do their best to respond to your inquiries as quickly as possible. Thank you for being a part of the KanuorieTech community!
        </div>
         {/* ================= GRID ================= */}
        <div className="grid md:grid-cols gap-10">
          
          {/* ================= FORM ================= */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow-md "
          >
            <h2 className="text-xl font-semibold mb-6">
              Send a Message
            </h2>

            {/* NAME */}
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mb-4 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />

            {/* EMAIL */}
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full mb-4 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />

            {/* MESSAGE */}
            <textarea
              name="message"
              placeholder="Your Message..."
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className="w-full mb-4 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Send Message
            </button>
            {/* STATUS */}
            {status && (
              <p className="mt-4 text-sm text-center">
                {status}
              </p>
            )}
          </form>
          <p className="mt-20">
             For more information about our courses, instructors, or any other inquiries, please don't hesitate to contact us. We are committed to providing excellent customer service and ensuring that you have the best experience possible with KanuorieTech. We look forward to hearing from you and assisting you on your learning journey!
          </p>
            {/* ================= CONTACT INFO ================= */}
          <div className="bg-white p-8 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-6">
              Get in Touch
            </h2>

            <p className="text-gray-600 mb-6">
              We’re always open to feedback, ideas, and collaborations.
              Reach out through any of the channels below.
            </p>

            <div className="space-y-4 text-gray-700">
              <p>
                📧 Email:{" "}
                <a
                  href="mailto:kanuorie3@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  kanuorie3@gmail.com
                </a>
              </p>
              <p>📞 Phone: +234 8179 8795 48</p>
              <p>📍 Location: Nigeria</p>
            </div>
          </div>
          <div>
            Stay connected with us on social media for updates, tips, and exclusive content. Follow us on Twitter, Facebook, and LinkedIn to join the conversation and stay informed about the latest developments at KanuorieTechLib. We are here to support you every step of the way and help you achieve your learning goals. Thank you for choosing KanuorieTech as your learning partner!
          </div>
            {/* <SOCIALS */}
            <div className="mt-8">
              <p className="font-semibold mb-2">Follow us on:</p>
              <div className="flex gap-4 text-blue-600 ">
                <a
                  href="https://www.linkedin.com/in/orie-kanu-8b85683a6?"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>

                {/* <a
                  href="https://www.instagram.com/stephaniekanu_/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a> */}

                <a
                  href="https://twitter.com/kanustephanie22"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>

                <a
                  href="https://web.facebook.com/stephgirlsplace/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>

                <a
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Youtube
                </a>

                <a
                  href="https://github.com/stephaniekanu-5"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
          {/* ================= EXTRA SECTION ================= */}
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <p className="text-gray-600">
            Our team typically responds within 24 hours. Thank you for being part
            of the KanuorieTech community ❤️
          </p>
        </div>
      </div>
      <footer className="text-center text-gray-500 py-6">
        © {new Date().getFullYear()} KanuorieTech. All rights reserved.
      </footer> 
    </main>
  );
}