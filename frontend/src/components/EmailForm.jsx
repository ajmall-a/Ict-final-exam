import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EmailForm({ onOtpSent }) {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/send-otp', { email });
      onOtpSent(email);
      navigate('/verify-otp');
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-400">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Enter Your EMAIL</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-gray-700">Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <button 
            type="submit" 
            className="w-full bg-green-800 text-white py-2 rounded hover:bg-blue-700"
          >
            SEND OTP
          </button>
        </form>
      </div>
    </div>
  );
}

EmailForm.propTypes = {
  onOtpSent: PropTypes.func.isRequired,
};

export default EmailForm;
