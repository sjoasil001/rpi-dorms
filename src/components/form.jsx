import React, { useState } from 'react';

const NextPage = () => {
  const [inputText, setInputText] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async () => {

    const apiEndpoint = 'http://localhost:4000';

    try {
      const res = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText }),
      });

      if (!res.ok) throw new Error('Failed to send.');

      setStatus('Submitted successfully!');
    } catch (err) {
      setStatus(`Error: ${err.message}`);
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
      <div className="bg-white p-8 rounded-xl shadow-md text-center w-full max-w-lg">
        <h1 className="text-3xl font-extrabold mb-4" style={{color: '#c8102e'}}>
          Ask a Question
        </h1>

        <input
          type="text"
          placeholder="Type here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full p-3 border rounded mb-4"
        />

        <button
          onClick={handleSubmit}
          className="text-white font-semibold py-2 px-4 rounded transition duration-200 w-full"
          style={{ backgroundColor: '#c8102e' }}
        >
          Submit
        </button>

        {status && <p className="mt-4 text-gray-700">{status}</p>}
      </div>
    </section>
  );
};

export default NextPage;