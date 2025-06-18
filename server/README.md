# 🔧 Backend

> Robust Node.js API server for the Customer Onboarding Workflow platform.

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18.0-black.svg)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13+-blue.svg)](https://www.postgresql.org/)
[![bcrypt](https://img.shields.io/badge/bcrypt-5.1.0-orange.svg)](https://github.com/dcodeIO/bcrypt.js/)



## ✨ Backend Features

### 🔐 Security & Authentication
- **JWT Token Authentication** with secure token generation
- **Password Hashing** using bcrypt with salt rounds
- **Email Uniqueness Validation** at database and API level
- **CORS Configuration** for secure cross-origin requests
- **Input Validation** and sanitization
- **Role-based Access Control** (User/Admin)


## 🏗️ Server Structure

```
server/
├── index.js           # Main server entry point
├── routes.js          # API route definitions
├── db.js             # Database connection and queries
├── migrations.sql    # Database schema and initial data
├── package.json      # Dependencies and scripts
├── .env.example      # Environment variables template
└── README.md         # Backend documentation
```

## 🛠️ Tech Stack

### Core Technologies
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **PostgreSQL** - Relational database
- **bcrypt** - Password hashing library

### Development Dependencies
- **nodemon** - Development server with auto-reload
- **dotenv** - Environment variable management
- **cors** - Cross-origin resource sharing
- **uuid** - Unique identifier generation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 13+
- npm or yarn package manager

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

3. **Database Setup**
   ```bash
   createdb neximprove
   psql -d neximprove -f migrations.sql
   ```

4. **Start server**
   ```bash
   npm run dev
   ```

5. **Verify server is running**
   ```
   Server running on http://localhost:3000
   Database connected successfully
   ```

### Available Scripts

```bash
# Start development server with nodemon
npm run dev

# Start production server
npm start

# Run database migrations
npm run migrate

# Reset database
npm run reset-db
```

## 📋 API Endpoints

### Authentication

#### Register User
```http
POST /api/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "gstin": "22AAAAA0000A1Z5",
  "phone": "9876543210",
  "company": "Example Corp",
  "address": "123 Business St, City"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "uuid-here",
    "name": "John Doe",
    "email": "john@example.com",
    "gstin": "22AAAAA0000A1Z5",
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

#### User Login
```http
POST /api/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid-here",
      "name": "John Doe",
      "email": "john@example.com",
      "gstin": "22AAAAA0000A1Z5"
    },
    "token": "jwt-token-here"
  }
}
```

#### Admin Login
```http
POST /api/admin-login
Content-Type: application/json

{
  "username": "admin",
  "password": "root"
}
```

### User Management

#### Get All Users (Admin Only)
```http
GET /api/users
Authorization: Bearer <admin-token>
```

#### Get User Profile
```http
GET /api/profile
Authorization: Bearer <user-token>
```

#### Update User (Admin Only)
```http
PUT /api/users/:id
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "Updated Name",
  "email": "updated@example.com"
}
```

#### Delete User (Admin Only)
```http
DELETE /api/users/:id
Authorization: Bearer <admin-token>
```

## 🗄️ Database Schema

### Users Table
```sql
-- Users table with comprehensive business information
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

-- Performance indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_gstin ON users(gstin);
CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_users_company ON users(company);

-- Automatic timestamp update trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Sample data for testing
INSERT INTO users (name, email, password, gstin, phone, company, address) VALUES
('Admin User', 'admin@neximprove.com', '$2b$10$hashedpassword', '22AAAAA0000A1Z5', '9876543210', 'NexImprove Corp', '123 Admin St, City'),
('John Doe', 'john@example.com', '$2b$10$hashedpassword', '33BBBBB0000B2Z6', '9876543211', 'Example Corp', '456 Business Ave, Town');
```

### Database Constraints
```sql
-- Email format validation
ALTER TABLE users ADD CONSTRAINT email_format 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- GSTIN format validation (Indian GST format)
ALTER TABLE users ADD CONSTRAINT gstin_format 
CHECK (gstin ~* '^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$');

-- Phone number format validation
ALTER TABLE users ADD CONSTRAINT phone_format 
CHECK (phone ~* '^[0-9]{10}$');
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the server directory:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=neximprove
DB_PORT=5432

# Server Configuration
PORT=3000
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# Logging
LOG_LEVEL=info
LOG_FILE=logs/server.log

# Security
BCRYPT_SALT_ROUNDS=10
```


## 🐛 Troubleshooting

### Common Issues

#### Database Connection Errors
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Check connection
psql -h localhost -U postgres -d neximprove

# Reset database
dropdb neximprove
createdb neximprove
psql -d neximprove -f migrations.sql
```

#### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port
PORT=3001 npm run dev
```

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [bcrypt Documentation](https://github.com/dcodeIO/bcrypt.js/)
