# 🚀 Customer Onboarding Workflow

> A modern, full-stack web application for streamlined customer onboarding and business management.

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13+-blue.svg)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.0-38B2AC.svg)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4.18.0-black.svg)](https://expressjs.com/)

## 📸 Screenshots

### 🏠 Dashboard Overview
![Dashboard](screenshots/dashboard.png)

### 👤 User Registration
![Registration](screenshots/registration.png)

### 👤 User Login
![Registration](screenshots/registration.png)

### 🔐 Admin Panel
![Admin Panel](screenshots/admin-panel.png)


## ✨ Features

### 🔐 Authentication & Security
- **Secure User Registration** with email validation
- **JWT-based Authentication** with protected routes
- **Password Encryption** using bcrypt
- **Admin Role Management** with separate login
- **Session Management** with automatic redirects

### 📊 Dashboard & Analytics
- **Real-time User Statistics** and metrics
- **Interactive Charts** and data visualization
- **Recent Activity Feed** with timestamps
- **Quick Action Buttons** for common tasks
- **Responsive Design** for all devices

### 👥 User Management
- **Comprehensive User Profiles** with business information
- **Advanced Search & Filter** functionality
- **Sortable Data Tables** with multiple criteria
- **Bulk Operations** for user management
- **Export Capabilities** for data analysis

### 🎨 Modern UI/UX
- **Beautiful Animations** and transitions
- **Dark/Light Theme** support
- **Toast Notifications** for user feedback
- **Loading States** and progress indicators
- **Error Handling** with user-friendly messages

## 🏗️ Architecture

```
NexImprove/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React Context providers
│   │   └── assets/        # Static assets
│   ├── public/            # Public assets
│   └── package.json       # Frontend dependencies
├── server/                # Node.js Backend
│   ├── routes/           # API route handlers
│   ├── db.js            # Database configuration
│   ├── migrations.sql   # Database schema
│   └── package.json     # Backend dependencies
└── README.md            # Project documentation
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Vite** - Fast build tool and dev server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **PostgreSQL** - Relational database
- **bcrypt** - Password hashing
- **UUID** - Unique identifier generation
- **CORS** - Cross-origin resource sharing

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Nodemon** - Development server with auto-reload

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL 13+
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/HackStyx/Customer-Onboarding-Workflow.git
   cd Customer-Onboarding-Workflow
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   cd client
   npm install

   # Install backend dependencies
   cd ../server
   npm install
   ```

3. **Database Setup**
   ```bash
   # Create PostgreSQL database
   createdb neximprove

   # Run migrations
   psql -d neximprove -f migrations.sql
   ```

4. **Environment Configuration**
   ```bash
   # In server directory, create .env file
   cp .env.example .env
   
   # Update with your database credentials
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=neximprove
   DB_PORT=5432
   JWT_SECRET=your_jwt_secret_key
   ```

5. **Start the application**
   ```bash
   # Start backend server (from server directory)
   npm run dev

   # Start frontend (from client directory)
   cd ../client
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## 📋 API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/admin-login` - Admin login

### User Management
- `GET /api/users` - Get all users (admin only)
- `GET /api/profile` - Get user profile
- `PUT /api/users/:id` - Update user (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)

### Response Format
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // Response data
  }
}
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | Database host | `localhost` |
| `DB_USER` | Database username | `postgres` |
| `DB_PASSWORD` | Database password | - |
| `DB_NAME` | Database name | `neximprove` |
| `DB_PORT` | Database port | `5432` |
| `JWT_SECRET` | JWT signing secret | - |
| `PORT` | Server port | `3000` |

### Database Schema

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  gstin VARCHAR(15) UNIQUE NOT NULL,
  phone VARCHAR(15),
  company VARCHAR(255),
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🧪 Testing

### Frontend Testing
```bash
cd client
npm test
```

### Backend Testing
```bash
cd server
npm test
```

### API Testing
```bash
# Test registration
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123","gstin":"22AAAAA0000A1Z5"}'
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

