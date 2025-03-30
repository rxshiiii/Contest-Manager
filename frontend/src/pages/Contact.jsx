import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="min-h-screen mt-20 bg-gray-50 flex flex-col items-center justify-center px-6 py-12">
      {/* Contact Information */}
      <section className="container mx-auto max-w-5xl text-center">
        <motion.h1 
          className="text-4xl font-extrabold text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Contact Us
        </motion.h1>
        <p className="mt-4 text-lg text-gray-600">
          Have questions? Feel free to reach out via email, phone, or visit us.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-gray-800">Email</h3>
            <p className="mt-2 text-gray-600">rgankaikar@gmail.com</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-gray-800">Phone</h3>
            <p className="mt-2 text-gray-600">8767926165</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-gray-800">Address</h3>
            <p className="mt-2 text-gray-600">Pune, Maharashtra, India</p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="w-full max-w-3xl mt-12">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 text-center">Send Us a Message</h2>
          <form className="mt-6">
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Full Name</label>
              <input type="text" className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your name" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Email</label>
              <input type="email" className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your email" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Message</label>
              <textarea className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" rows="4" placeholder="Your message"></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold text-lg transition">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Google Map */}
      <section className="w-full max-w-5xl mt-12">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Find Us Here</h2>
        <div className="mt-6">
          <iframe
            className="w-full h-64 rounded-lg shadow-md"
            src="https://maps.google.com/maps?q=18.465865,73.7778069&t=&z=15&ie=UTF8&iwloc=&output=embed"
            allowFullScreen
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default Contact;
