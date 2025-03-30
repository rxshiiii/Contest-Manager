import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="min-h-screen mt-24 bg-white text-gray-800">
      {/* Hero Section */}
      <section className="h-20 flex items-center justify-center text-center">
        <motion.h1 
          className="text-4xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          About Us
        </motion.h1>
      </section>

      {/* Our Mission */}
      <section className="container mx-auto px-6 py-12 text-center">
        <p className="-mt-10 max-w-3xl mx-auto">
          We simplify contest tracking and management by aggregating coding contests 
          from platforms like HackerRank, HackerEarth, and LeetCode. Our platform allows 
          users to explore upcoming contests, save their favorites, and stay updated effortlessly.
        </p>
      </section>

      {/* Why Choose Us */}
      <section className="py-12">
        <div className=" -mt-10 container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {[
              { title: "All Contests in One Place", text: "Find all upcoming coding contests on one platform." },
              { title: "Personalized Experience", text: "Save contests you are interested in and access them anytime." },
              { title: "Easy Participation", text: "Get direct access to contest details with a well-structured interface." }
            ].map((item, index) => (
              <motion.div 
                key={index} 
                className="p-6 bg-gray-100 rounded-lg shadow-md"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-2">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="container mx-auto px-6 py-12 text-center">
        <h2 className="text-3xl font-bold">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {[
            { name: "Rushikesh Ankaikar", role: "Developer & Owner" },
            { name: "Atharva Choudhary", role: "Contributor" },
            { name: "Tanishq Gupta", role: "Contributor" }
          ].map((member, index) => (
            <motion.div 
              key={index} 
              className="p-6 bg-gray-100 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-500 py-12 text-center text-white">
        <h2 className="text-3xl font-bold">Start Tracking Contests Today!</h2>
        <p className="mt-2 text-lg">Enhance your coding journey by staying ahead with the latest contests.</p>
        <button className="mt-6 px-6 py-3 bg-white text-blue-500 rounded-lg font-semibold text-lg hover:bg-gray-100 transition">
          Get Started
        </button>
      </section>
    </div>
  );
};

export default AboutUs;
