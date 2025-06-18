import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { adminLogin } = useAuth();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.username || !form.password) return 'All fields are required.';
    return '';
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const err = validate();
    if (err) return setError(err);
    
    // Hardcoded admin credentials
    if (form.username === 'admin' && form.password === 'root') {
      adminLogin();
      alert('Admin login successful!');
      navigate('/admin');
    } else {
      setError('Invalid admin credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-200">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="bg-red-100 p-4 rounded-full mb-4 inline-block">
            <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-red-700 mb-2">Admin Login</h2>
          <p className="text-gray-600">Access admin dashboard</p>
        </div>
        {error && <div className="text-red-500 text-center">{error}</div>}
        <div className="space-y-4">
          <input 
            name="username" 
            placeholder="Username" 
            value={form.username} 
            onChange={handleChange} 
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400" 
          />
          <input 
            name="password" 
            type="password" 
            placeholder="Password" 
            value={form.password} 
            onChange={handleChange} 
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400" 
          />
        </div>
        <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded transition-colors">
          Login as Admin
        </button>
        <div className="text-center">
          <p className="text-gray-600">Regular user? 
            <button 
              type="button" 
              onClick={() => navigate('/login')} 
              className="text-red-600 hover:text-red-800 font-semibold ml-1"
            >
              Login here
            </button>
          </p>
        </div>
      </form>
    </div>
  );
} 