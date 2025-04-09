import React, { useRef } from 'react';
import emailjs from 'emailjs-com';

const ContactUs = () => {
  const formRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_up09twy',
      'template_oslh1ti',
      formRef.current,
      '6-PANXv2r9cZvSEZA'
    ).then(
      (result) => {
        alert('Message sent successfully!');
        formRef.current.reset();
      },
      (error) => {
        alert('Failed to send message. Please try again.');
        console.error(error.text);
      }
    );
  };

  return (
    <div className="min-h-screen bg-white text-white pt-42 px-6 md:px-20 font-sans">
      <div className="grid md:grid-cols-2 gap-16 max-w-7xl mx-auto">
        {/* Left Side */}
        <div>
          <h1 className="text-5xl font-bold text-black">Contact Us</h1>
          <p className="text-gray-300 mt-6 text-lg">
            This project is built to help students explore and review RPI dorms.
          </p>

          <div className="h-px w-full bg-gray-700 my-8" />

          <div className="space-y-6 text-black">
            {/* Team Members */}
            <div>
              <p className="font-bold text-lg">Project Team</p>
              <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
                <li>Sophy Joasil (Computer Science, Class of 2026)</li>
                <li>Nathaniel Boateng (Computer Science, Class of 2027)</li>
                <li>Aliyah Zaizay (Computer Science, Class of 2027)</li>
              </ul>
            </div>

            {/* Project Description */}
            <div>
              <p className="font-bold text-lg mt-6">About This Project</p>
              <p className="text-gray-300 mt-2 text-justify">
                Created during the Spring 2025 semester as part of the Rensselaer Center for Open Source (RCOS), this project was developed as a favor to the Freshman Class of 2022 and future classes.
                All information is accurate to the best of our knowledge, and as time allows, we are verifying and updating data accordingly.
              </p>
            </div>
          </div>

          
        </div>

        {/* Right Side Form */}
        <form
          ref={formRef}
          onSubmit={sendEmail}
          className="bg-black rounded-2xl p-8 space-y-6 w-full"
        >
          <input
            name="name"
            placeholder="Name"
            className="w-full bg-transparent border-b-2 border-gray-500 outline-none py-2 text-white mb-17"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full bg-transparent border-b-2 border-gray-500 outline-none py-2 text-white mb-13"
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            rows="4"
            className="w-full bg-transparent border-b-2 border-gray-500 outline-none py-2 text-white mb-8"
            required
          />
          <button
            type="submit"
            className="bg-[#c8102e] text-black px-6 py-3 rounded-full font-semibold hover:opacity-90 hover:bg-white"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
