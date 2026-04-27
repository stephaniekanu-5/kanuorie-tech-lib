import Navbar from "../components/Navbar";
export default function About() {
  return (
    <main>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="text-gray-600 leading-relaxed mb-4">
          KanuorieTechLib is dedicated to providing high-quality educational content
          to learners worldwide. This platform helps users access tech courses and resources. Our mission is to empower individuals with the
          knowledge and skills needed to succeed in the tech industry.  We offer a wide range of courses, tutorials, and resources covering various programming languages, frameworks, and technologies. Whether you're a beginner looking to start your coding journey or an experienced developer seeking to enhance your skills, KanuorieTechLib has something for everyone. Join us today and start learning!
        
          Our team of experienced instructors and industry professionals is committed to delivering engaging and informative content. We continuously update our course offerings to ensure that our users have access to the latest trends and technologies in the tech world. At KanuorieTechLib, we believe that education should be accessible to all, which is why we strive to provide affordable and high-quality learning materials. Thank you for choosing KanuorieTechLib as your learning partner!
        
          If you have any questions or need assistance, please don't hesitate to contact our support team. We are here to help you on your learning journey and ensure that you have the best experience possible with KanuorieTechLib. Happy learning!
        
      
          For more information about our courses, instructors, or any other inquiries, feel free to reach out to us. We value your feedback and are always looking for ways to improve our platform. Thank you for being a part of the KanuorieTechLib community!
        
          Stay connected with us on social media for updates, tips, and exclusive content. Follow us on Twitter, Facebook, and LinkedIn to join the conversation and stay informed about the latest developments at KanuorieTechLib. We look forward to helping you achieve your learning goals and supporting you every step of the way!
        </p>
        <div className="mt-20">
          <h1 className="text-3xl font-bold mb-4" >who can study</h1>
            <p className="text-gray-600 leading-relaxed mb-4">
              Your one-stop destination for the best tech resources, handpicked to help you learn, grow, and stay ahead in the ever-evolving world of technology.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Whether you're a beginner looking to learn the basics or an experienced developer seeking advanced resources, we've got you covered. Explore our extensive library of articles, tutorials, courses, and tools across various tech domains.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              We believe in the power of knowledge sharing. Our mission is to empower developers with the best resources for continuous learning and growth. We handpick each resource to ensure quality and relevance, making it easier for you to find exactly what you need to succeed in your tech journey.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Explore our vast library of resources across various tech domains, including programming languages, frameworks, DevOps tools, data science, machine learning, design, and much more. Whether you're looking to learn a new skill, stay updated with the latest trends, or find solutions to your coding challenges, KanuorieTechLib has something for everyone.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Join our community of developers and start your learning journey today. With KanuorieTechLib, the best resources are just a click away.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Discover and master new tech skills .
            </p>
          </div>
        <div className="mt-20">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              To empower developers with the best resources for continuous learning and growth.
            </p>
          </div>
          <div className="mt-20">
            <h2 className="text-3xl font-bold mb-4">What We Offer</h2>
            <p className="text-gray-600 mb-6">  A vast library of resources across various tech domains.</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Programming languages and frameworks.</li>
              <li>DevOps tools and practices.</li>
              <li>Data science and machine learning.</li>
              <li>Design and UX resources.</li>
            </ul>
          </div>    
          <div className="mt-20">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Handpicked resources for quality learning.</li>
              <li>Organized by categories and skill levels.</li>
              <li>Regularly updated with the latest content.</li>
              <li>Community-driven recommendations.</li>
            </ul>
          </div>
          <div className="mt-20">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-gray-600 mb-6">  Connect with fellow developers and share your knowledge.</p>
            <a
              href="/Register"
              className="bg-green-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-green-700 transition"
            >
              Register Today →
            </a>
          </div>

        <footer className="mt-20 text-center text-gray-500">
            &copy; 2026 KanuorieTechlib.co All rights reserved.
          </footer> 
      </div>
    </main>
  );
}