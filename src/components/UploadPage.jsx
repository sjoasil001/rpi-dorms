import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import UploadForm from './UploadForm';


const UploadPage = () => {
  const [email, setEmail] = useState('');
  const sentCode = useRef('');
  const [inputCode, setInputCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [step, setStep] = useState('enterEmail'); 
  const [error, setError] = useState('');

  const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

  const handleSendCode = async (e) => {
    e.preventDefault();

    if (!email.endsWith('@rpi.edu')) {
      setError('Please use a valid RPI email address.');
      return;
    }

    const code = generateCode();
    sentCode.current = code;
    console.log("Generated code:", code); 

    try {
      await emailjs.send(
        'service_up09twy',
        'template_eruxcvt',
        {
          user_email: email,
          verification_code: code,
        },
        '6-PANXv2r9cZvSEZA'
      );
      setError('');
      alert('Verification code sent to your RPI email.');
      setStep('enterCode'); 
    } catch (err) {
      console.error(err);
      setError('Failed to send code. Try again.');
    }
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    console.log("User input:", inputCode, "Expected:", sentCode.current);

    if (inputCode === sentCode.current) {
      setIsVerified(true);
      setStep('upload');
    } else {
      setError('Incorrect verification code.');
    }
  };

  return (
    <div className="min-h-screen pt-65 px-6 bg-gray-50 text-center">
      {/*Email input */}
      {step === 'enterEmail' && (
        <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4">Verify RPI Email</h2>
          <form onSubmit={handleSendCode}>
            <input
              type="email"
              placeholder="your@rpi.edu"
              className="w-full p-3 border rounded mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-[#c8102e] text-white py-2 rounded font-semibold"
            >
              Send Verification Code
            </button>
          </form>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      )}

      {/* Code verification */}
      {step === 'enterCode' && (
        <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4">Enter Verification Code</h2>
          <form onSubmit={handleVerifyCode}>
            <input
              type="text"
              placeholder="Enter the code sent to your email"
              className="w-full p-3 border rounded mb-3"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded font-semibold"
            >
              Verify
            </button>
          </form>
          <button
            onClick={() => setStep('enterEmail')}
            className="text-sm text-blue-600 mt-2 underline"
          >          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      )}

{step === 'upload' && isVerified && (
  <UploadForm />
)}


    </div>
  );
};

export default UploadPage;
