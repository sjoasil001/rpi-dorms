<<<<<<< HEAD
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
=======
import React, { useState, useEffect } from 'react';
import UploadForm from './UploadForm';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

const UploadPage = () => {
  const [email, setEmail] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [step, setStep] = useState('enterEmail'); // 'enterEmail' | 'enterCode' | 'upload'
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // resend cooldown
  const [cooldown, setCooldown] = useState(0);
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  useEffect(() => {
    setError('');
  }, [email, inputCode, step]);

  const handleSendCode = async (e) => {
    e?.preventDefault();
    setError('');
    const rpiEmail = email.trim().toLowerCase();

    if (!rpiEmail.endsWith('@rpi.edu')) {
      setError('Please use a valid RPI email address.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/auth/send-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: rpiEmail }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send code.');
      setStep('enterCode');
      setCooldown(60); // 60s before allowing resend
    } catch (err) {
      setError(err.message || 'Failed to send code. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError('');
    const code = inputCode.trim();

    if (!/^\d{6}$/.test(code)) {
      setError('Enter the 6-digit code.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/auth/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Verification failed.');
      setIsVerified(true);
      setStep('upload');
    } catch (err) {
      setError(err.message || 'Incorrect verification code.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0) return;
    await handleSendCode(); // reuse same call
  };

  return (
    <div className="min-h-screen pt-60 px-6 bg-gray-50">
      {/* Step 1: Email input */}
      {step === 'enterEmail' && (
        <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-2xl font-bold mb-4">Verify RPI Email</h2>
          <form onSubmit={handleSendCode} className="text-left">
            <label className="block text-sm font-medium mb-1" htmlFor="email">RPI Email</label>
            <input
              id="email"
              type="email"
              placeholder="your@rpi.edu"
              className="w-full p-3 border rounded mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#c8102e] text-white py-2 rounded font-semibold disabled:opacity-60"
            >
              {loading ? 'Sending…' : 'Send Verification Code'}
            </button>
          </form>
          {error && <p className="text-red-600 mt-3">{error}</p>}
        </div>
      )}

      {/* Step 2: Code verification */}
      {step === 'enterCode' && (
        <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-2xl font-bold mb-2">Enter Verification Code</h2>
          <p className="text-sm text-gray-600 mb-4">We sent a 6-digit code to <span className="font-medium">{email}</span>.</p>

          <form onSubmit={handleVerifyCode} className="text-left">
            <label className="block text-sm font-medium mb-1" htmlFor="code">Code</label>
            <input
              id="code"
              type="text"
              inputMode="numeric"
              pattern="\d*"
              maxLength={6}
              placeholder="123456"
              className="w-full p-3 border rounded mb-3 tracking-widest text-center"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value.replace(/\D/g, ''))}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-2 rounded font-semibold disabled:opacity-60"
            >
              {loading ? 'Verifying…' : 'Verify'}
            </button>
          </form>

          <div className="mt-3 flex items-center justify-between text-sm">
            <button
              onClick={() => setStep('enterEmail')}
              className="text-blue-600 underline"
            >
              Change email
            </button>
            <button
              onClick={handleResend}
              disabled={cooldown > 0 || loading}
              className="text-blue-600 disabled:opacity-50"
              title={cooldown > 0 ? `Wait ${cooldown}s to resend` : 'Resend code'}
            >
              {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend code'}
            </button>
          </div>

          {error && <p className="text-red-600 mt-3">{error}</p>}
          <p className="text-xs text-gray-500 mt-2">
            Tip: Please also check your junk email for the code.
          </p>
        </div>
      )}

      {/* Step 3: Upload form (gated) */}
      {step === 'upload' && isVerified && (
        <div className="max-w-3xl mx-auto">
          <UploadForm email={email.trim().toLowerCase()} />
        </div>
      )}
    </div>
  );
};

export default UploadPage;
>>>>>>> 5a630bccd0bf2f8901c0b3b4c16f6b76d2df010b
