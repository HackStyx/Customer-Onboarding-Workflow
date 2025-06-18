import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('user');
    const savedIsAdmin = localStorage.getItem('isAdmin');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedIsAdmin === 'true') {
      setIsAdmin(true);
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAdmin(false);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isAdmin', 'false');
  };

  const adminLogin = () => {
    setUser({ name: 'Admin', email: 'admin@system.com' });
    setIsAdmin(true);
    localStorage.setItem('user', JSON.stringify({ name: 'Admin', email: 'admin@system.com' }));
    localStorage.setItem('isAdmin', 'true');
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
  };

  const value = {
    user,
    isAdmin,
    login,
    adminLogin,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 