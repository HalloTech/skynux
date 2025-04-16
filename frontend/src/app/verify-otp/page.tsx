'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const OTPPage = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleVerifyOtp = async () => {
    try {
      const response = await fetch('http://localhost:5000/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('OTP verified!');
        router.push('/user-profile');
      } else {
        setError(data.message || 'Invalid OTP');
      }
    } catch (err) {
      setError('Verification failed.');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white rounded-md shadow-md">
        <h2 className="text-xl mb-4 font-bold">Verify OTP</h2>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="border p-2 w-full mb-3"
          placeholder="Enter OTP"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={handleVerifyOtp}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default OTPPage;
