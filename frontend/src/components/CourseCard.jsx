import { motion } from "framer-motion";

export default function CourseCard({ title, description }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white shadow-md rounded-2xl p-5 border"
    >
      <h3 className="font-semibold text-lg text-purple-600">{title}</h3>

      <p className="text-gray-500 text-sm mt-2">{description}</p>

      <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm">
        Start Learning
      </button>
    </motion.div>
  );
}