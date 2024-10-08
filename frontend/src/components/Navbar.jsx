
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-green-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">OTP VERIFICATION SYSYTEM</h1>
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:text-gray-300">HOME</Link></li>
          
          <li><Link to="/" className="hover:text-gray-300">SIGN IN</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
