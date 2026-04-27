import { useState, useEffect, useRef } from "react";

const images = [
  {
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGV2ZWxvcGVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    caption: "Students learning in a digital classroom",
  },
  {
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=60",
    caption: "Developers collaborating on a project",
  },
  {
    src: "https://images.unsplash.com/photo-1537432376769-00a3f4b9c9b9?auto=format&fit=crop&w=800&q=60",
    caption: "Coding and problem solving",
  },
  {
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=60",
    caption: "Frontend development workspace",
  },
  {
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=60",
    caption: "Learning programming online",
  },
  {
    src:"https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=60"
  },
  {
    src:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=60",

  },
  {
    src:"https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=60",

  },
  {
    src:"https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=60",

  },
  {
    src:"https://images.unsplash.com/photo-1605902711622-cfb43c44367f?auto=format&fit=crop&w=800&q=60", 
  },
  {
    src:"https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=60",
  },
  {
    src:"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",

  }
];
export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;

    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
  };

  return (
    <div
      className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-2xl shadow-2xl group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((item, index) => (
          <div key={index} className="relative w-full flex-shrink-0">
            <img
              src={item.src}
              alt={item.caption}
              className="w-full object-cover h-[300px] sm:h-[400px] md:h-[500px]"
            />

            <div className="absolute inset-0 bg-black/40 flex items-end p-8">
              <h2 className="text-white text-2xl md:text-4xl font-bold transition duration-500">
                {item.caption}
              </h2>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full transition"
      >
        ❮
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full transition"
      >
        ❯
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              currentIndex === index
                ? "bg-white scale-125"
                : "bg-white/50"
            }`}
          />
        ))}
      </div>
      </div>
  );
}
