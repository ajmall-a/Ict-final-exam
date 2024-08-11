import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import Navbar
import EmailForm from './components/EmailForm';
import OTPForm from './components/OTPForm';
import Welcome from './components/Welcome';

function App() {
  const [email, setEmail] = useState('');

  return (
    <Router>
      <Navbar /> {/* Add Navbar */}
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<EmailForm onOtpSent={setEmail} />} />
          <Route path="/verify-otp" element={<OTPForm email={email} />} />
          <Route path="/welcome" element={<Welcome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


