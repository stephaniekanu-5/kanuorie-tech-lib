import { useState, useEffect } from "react";

const featuresData = [
  {
    title: "E-Library Access",
    desc: "Browse and access a wide collection of learning resources including books, notes, and references in one place.",
    img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=60",
  },
  {
    title: "Course Management",
    desc: "Enroll in courses, track progress, and revisit learning materials anytime from your dashboard.",
    img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=60",
  },
  {
    title: "User Profiles",
    desc: "Manage your personal profile, upload avatars, update bio, and customize your learning identity.",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=60",
  },
  {
    title: "Secure Authentication",
    desc: "Sign up and log in securely with protected routes ensuring your data stays safe.",
    img: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=60",
  },
  {
    title: "Admin Control Panel",
    desc: "Admins can manage users, courses, and resources with full control over platform content.",
    img: "https://images.unsplash.com/photo-1551281044-8d8d2f6f8f0c?auto=format&fit=crop&w=800&q=60",
  },
  {
    title: "Resource Upload System",
    desc: "Upload and manage learning materials such as books and files with organized storage.",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=60",
  },
];

export default function FeaturesSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slidesToShow = 3; // like Owl carousel

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev >= featuresData.length - slidesToShow ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? featuresData.length - slidesToShow : prev - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      {/* HEADER */}
      <div className="section">
        <h2 className="text-3xl font-bold mb-8 text-center">Features</h2>
        <p>
          Start working with{" "}
          <span>
            <a
              href="https://mediacity.co.in/"
              title="Media City"
              target="_blank"
              rel="noreferrer"
            >
              Media City
            </a>
          </span>{" "}
          that can provide everything you need to Create a beautiful store where
          customers can find what they want.
        </p>
      </div>

      {/* SLIDER */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex * 100) / slidesToShow}%)`,
          }}
        >
          {featuresData.map((item, index) => (
            <div
              key={index}
              className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 p-4 bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transition"
             >
              <div className="features-slider-block">
                <div className="features-slider-image">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="rounded-lg"
                  />
                </div>

                <h4 className="p-2 font-semibold text-lg">{item.title}</h4>
                <p className="p-2">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NAV */}
      <div className="flex justify-between mt-4">
        <button
          onClick={prevSlide}
          className="bg-black/40 hover:bg-black/70 text-white px-4 py-2 rounded"
        >
          ❮
        </button>

        <button
          onClick={nextSlide}
          className="bg-black/40 hover:bg-black/70 text-white px-4 py-2 rounded"
        >
          ❯
        </button>
      </div>
    </div>
  );
}