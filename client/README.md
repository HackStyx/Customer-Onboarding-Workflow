# 🎨 NexImprove Frontend

> Modern React application for the Customer Onboarding Workflow platform.

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.4.0-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.0-38B2AC.svg)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React%20Router-6.8.0-red.svg)](https://reactrouter.com/)


## ✨ Features

- **🎯 Responsive Design** - Works perfectly on all devices
- **🔐 Protected Routes** - Secure access with role-based authentication
- **📊 Real-time Dashboard** - Live user metrics and analytics
- **🎨 Modern UI** - Clean design with Tailwind CSS
- **⚡ Fast Development** - Lightning-fast Vite build tool
- **🔒 Authentication** - JWT-based login system

## 🏗️ Client Structure

```
client/
├── public/                 # Static assets
│   ├── vite.svg           # Vite logo
│   └── favicon.ico        # App favicon
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ProtectedRoute.jsx
│   │   └── ...
│   ├── context/          # React Context providers
│   │   └── AuthContext.jsx
│   ├── pages/            # Page components
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Admin.jsx
│   │   ├── AdminLogin.jsx
│   │   └── NotFound.jsx
│   ├── assets/           # Images and other assets
│   ├── App.jsx           # Main app component
│   └── main.jsx          # App entry point
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.js     # PostCSS configuration
├── vite.config.js        # Vite configuration
└── eslint.config.js      # ESLint configuration
```

## 🛠️ Tech Stack

- **React 18** - Modern UI library with hooks
- **Vite** - Lightning-fast build tool and dev server
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Lint code
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the client directory:

```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=NexImprove
```



## 🔐 Authentication Flow

### Protected Routes
```jsx
// ProtectedRoute.jsx
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, isAdmin } = useAuth();
  
  if (!user) return <Navigate to="/login" replace />;
  if (requireAdmin && !isAdmin) return <Navigate to="/dashboard" replace />;
  
  return children;
};
```

### Context Provider
```jsx
// AuthContext.jsx
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const login = (userData) => {
    setUser(userData);
    setIsAdmin(userData.role === 'admin');
  };
  
  const logout = () => {
    setUser(null);
    setIsAdmin(false);
  };
  
  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```


## 🐛 Troubleshooting

### Common Issues

#### CORS Errors
```javascript
// Ensure backend has CORS configured
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

#### Routing Issues
```jsx
// Ensure BrowserRouter wraps the app
<BrowserRouter>
  <App />
</BrowserRouter>
```

## 📚 Resources

- [React Documentation](https://reactjs.org/docs/)
- [Vite Documentation](https://vitejs.dev/guide/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Router Documentation](https://reactrouter.com/docs)


