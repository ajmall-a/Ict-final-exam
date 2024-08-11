import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './components/Welcome';
import Navbar from './components/Navbar'; // Import Navbar
import EmailForm from './components/EmailForm';
import OTPForm from './components/OTPForm';


function App() {
  const [email, setEmail] = useState('');

  return (
    <Router>
      <Navbar /> {/* Add Navbar */}
      <div className="container mx-auto p-4">
        <Routes>
        <Route path="/welcome" element={<Welcome />} />
          <Route path="/" element={<EmailForm onOtpSent={setEmail} />} />
          <Route path="/verify-otp" element={<OTPForm email={email} />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;


