import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', gstin: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.name || !form.email || !form.gstin || !form.password) return 'All fields are required.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return 'Invalid email format.';
    return '';
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const err = validate();
    if (err) return setError(err);
    try {
      await axios.post('/api/register', form);
      alert('Registration successful!');
      navigate('/dashboard');
    } catch (e) {
      setError(e.response?.data?.error || 'Registration failed.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Register</h2>
        {error && <div className="text-red-500 text-center">{error}</div>}
        <div className="space-y-4">
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input name="gstin" placeholder="GSTIN" value={form.gstin} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors">Register</button>
        <div className="text-center">
          <p className="text-gray-600">Already have an account? 
            <button 
              type="button" 
              onClick={() => navigate('/login')} 
              className="text-blue-600 hover:text-blue-800 font-semibold ml-1"
            >
              Login here
            </button>
          </p>
        </div>
      </form>
    </div>
  );
} 