import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.email || !form.password) return 'All fields are required.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return 'Invalid email format.';
    return '';
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const err = validate();
    if (err) return setError(err);
    try {
      const response = await axios.post('/api/login', form);
      login(response.data.user);
      alert('Login successful!');
      navigate('/dashboard');
    } catch (e) {
      setError(e.response?.data?.error || 'Login failed.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Login</h2>
        {error && <div className="text-red-500 text-center">{error}</div>}
        <div className="space-y-4">
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors">Login</button>
        <div className="text-center">
          <p className="text-gray-600">Don't have an account? 
            <button 
              type="button" 
              onClick={() => navigate('/register')} 
              className="text-blue-600 hover:text-blue-800 font-semibold ml-1"
            >
              Register here
            </button>
          </p>
        </div>
        <div className="border-t pt-4">
          <button 
            type="button" 
            onClick={() => navigate('/admin-login')} 
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded transition-colors"
          >
            Login as Admin
          </button>
        </div>
      </form>
    </div>
  );
} 