import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function NotFound() {
  const [particles, setParticles] = useState([]);
  const [rocketPosition, setRocketPosition] = useState(0);
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    // Create floating particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.3
    }));
    setParticles(newParticles);

    // Rocket animation
    const rocketInterval = setInterval(() => {
      setRocketPosition(prev => {
        if (prev >= 100) return 0;
        return prev + 0.5;
      });
    }, 50);

    return () => clearInterval(rocketInterval);
  }, []);

  const handleGoHome = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-600/10 to-transparent"></div>
      </div>

      {/* Floating Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animation: `float ${particle.speed}s ease-in-out infinite`
          }}
        />
      ))}

      {/* Rocket Animation */}
      <div 
        className="absolute text-6xl transform transition-all duration-1000"
        style={{
          left: `${rocketPosition}%`,
          top: '20%',
          transform: 'rotate(45deg)'
        }}
      >
        🚀
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="text-center text-white max-w-4xl mx-auto px-6">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-bounce">
              404
            </h1>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 pb-2 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent leading-tight">
              Oops! Page Not Found
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-6">
              The page you're looking for seems to have floated away into space...
            </p>
            <p className="text-lg text-gray-400 mb-8">
              Don't worry, our rocket is on its way to bring you back home! 🚀
            </p>
          </div>

          {/* Action Button */}
          <div className="mb-8">
            <button
              onClick={handleGoHome}
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              🏠 Go Home
            </button>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 text-4xl animate-spin-slow">⭐</div>
      <div className="absolute top-1/3 right-1/4 text-3xl animate-bounce">🌙</div>
      <div className="absolute bottom-1/4 left-1/3 text-2xl animate-pulse">✨</div>
      <div className="absolute bottom-1/3 right-1/3 text-5xl animate-ping">🌟</div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-ping {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
} 