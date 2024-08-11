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
      await axios.post('http://localhost:5000/api/send-otp', { email });
      onOtpSent(email);
      navigate('/verify-otp');
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Enter Your Email</h2>
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
          className="w-full bg-fuchsia-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Send OTP
        </button>
      </form>
    </div>
  );
}

EmailForm.propTypes = {
  onOtpSent: PropTypes.func.isRequired,
};

export default EmailForm;





