import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Register from './pages/Register';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

function App() {
  const { user, isAdmin } = useAuth();

  return (
    <Routes>
      {/* Default route - redirect based on authentication status */}
      <Route path="/" element={
        user ? 
          (isAdmin ? <Navigate to="/admin" replace /> : <Navigate to="/dashboard" replace />) 
          : <Navigate to="/login" replace />
      } />
      
      <Route path="/register" element={
        user ? <Navigate to="/dashboard" replace /> : <Register />
      } />
      <Route path="/login" element={
        user ? <Navigate to="/dashboard" replace /> : <Login />
      } />
      <Route path="/admin-login" element={
        isAdmin ? <Navigate to="/admin" replace /> : <AdminLogin />
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin" element={
        <ProtectedRoute requireAdmin={true}>
          <Admin />
        </ProtectedRoute>
      } />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
