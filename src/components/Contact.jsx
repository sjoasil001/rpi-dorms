import React, { useRef } from 'react';
import Footer from './Footer';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

const ContactUs = () => {
  const formRef = useRef();

  const sendEmail = async (e) => {
    e.preventDefault();

    const form = formRef.current;
    const payload = {
      // map your current field names to backend expected keys
      from_name: form.name.value,
      reply_to: form.email.value,
      message: form.message.value,
      // optional: simple honeypot; backend can ignore if not used
      phone: form.phone?.value || ''
    };

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        alert('Message sent successfully!');
        form.reset();
      } else {
        throw new Error(data.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <>
      <div id="top" />

      <div className="min-h-screen bg-white text-white px-6 md:px-20 font-sans pt-24 md:pt-32">
        <div className="grid md:grid-cols-2 gap-16 max-w-7xl mx-auto py-24">
          {/* Left Side */}
          <div>
            <h1 className="text-5xl font-bold text-black">Contact Us</h1>
            <p className="text-gray-700 mt-6 text-lg">
              This project is built to help students explore and review RPI dorms.
            </p>

            <div className="h-px w-full bg-gray-200 my-8" />

            <div className="space-y-6 text-black">
              {/* Team Members */}
              <div>
                <p className="font-bold text-lg">Project Team</p>
                <ul className="text-gray-700 list-disc list-inside mt-2 space-y-1">
                  <li>Sophy Joasil (Computer Science, Class of 2026)</li>
                  <li>Nathaniel Boateng (Computer Science, Class of 2027)</li>
                  <li>Aliyah Zaizay (Computer Science, Class of 2027)</li>
                  <li>Alyssa Okosun (Computer Systems Engineering, Class of 2026)</li>
                  <li>Demetrius Ho Sang (Computer Science, Class of 2026)</li>
                  <li>Ihunna Onyekachiuzoamaka (Computer Science, Class of 2026)</li>
                </ul>
              </div>

              {/* Project Description */}
              <div>
                <p className="font-bold text-lg mt-6">About This Project</p>
                <p className="text-gray-700 mt-2 text-justify">
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
            {/* optional honeypot; keep hidden if you add it to backend */}
            <input type="text" name="phone" className="hidden" tabIndex={-1} autoComplete="off" />

            <input
              name="name"
              placeholder="Name"
              className="w-full bg-transparent border-b-2 border-gray-500 outline-none py-2 text-white"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full bg-transparent border-b-2 border-gray-500 outline-none py-2 text-white"
              required
            />
            <textarea
              name="message"
              placeholder="Message"
              rows="4"
              className="w-full bg-transparent border-b-2 border-gray-500 outline-none py-2 text-white"
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

      <div className="mt-24" />
      <Footer />
    </>
  );
};

export default ContactUs;
