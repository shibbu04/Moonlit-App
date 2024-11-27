# Moonlit 🌙: Real-Time Chat Application

## 📋 Table of Contents
- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Environment Configuration](#-environment-configuration)
- [Project Structure](#-project-structure)
- [Local Development Setup](#-local-development-setup)
- [Application Architecture](#-application-architecture)
- [Error Handling and Robustness](#-error-handling-and-robustness)
- [Deployment](#-deployment)
- [Advanced Features](#-advanced-features)
- [Project Links](#-project-links)
- [Testing Real-Time Messaging](#-testing-real-time-messaging)
- [About the Developer](#-about-the-developer)

## 📝 Project Overview 

Moonlit Chat is a sophisticated real-time chat application built with React and Socket.IO, designed to provide seamless, instant communication across multiple users. The platform offers a modern, responsive, and intuitive messaging experience.

**Explore Project** : [Link](https://moonlit-app.vercel.app)

## 🚀 Key Features

- **Real-time Messaging**
  - Instant communication powered by WebSocket technology
  - Low-latency message broadcasting
  - Unique message timestamping

- **User Management**
  - Dynamic username registration
  - Real-time active user list tracking
  - Automatic user join/leave notifications
  - Username uniqueness validation

- **Responsive Design**
  - Mobile-friendly interface
  - Adaptive sidebar for small screens
  - Cross-device compatibility

- **Enhanced User Experience**
  - Clean, modern UI
  - Social media integration
  - Lightweight and fast performance

## 🛠 Tech Stack

### Frontend
- **React** (v18.2.0)
  - Hooks-based functional components
  - Responsive state management
- **Socket.IO Client** (v4.8.1)
  - Real-time bidirectional event-based communication
- **Lucide React**
  - Elegant, consistent icon system

### Backend
- **Node.js**
- **Express.js**
  - Lightweight web application framework
- **Socket.IO Server** (v4.8.1)
  - WebSocket implementation
- **CORS** 
  - Cross-Origin Resource Sharing support

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or later)
- npm (v6 or later)
- Git

## 🌐 Environment Configuration

### Backend (.env)
```env
# Localhost Configuration
PORT=5000
CORS_ORIGIN=http://localhost:3000

# Production Configuration
# PORT=5000
# CORS_ORIGIN=https://moonlit-app.vercel.app
```

### Frontend (.env)
```env
# Localhost Configuration
REACT_APP_BACKEND_URL=http://localhost:5000
REACT_APP_SOCKET_URL=http://localhost:5000

# Production Configuration
# REACT_APP_BACKEND_URL=https://moonlit-app.onrender.com
# REACT_APP_SOCKET_URL=https://moonlit-app.onrender.com
```

## 📦 Project Structure
```
└── Moonlit-App
    ├── backend
    │   ├── package.json
    │   ├── package-lock.json
    │   └── server.js
    ├── frontend
    │   ├── manifest.json
    │   ├── package.json
    │   ├── package-lock.json
    │   ├── public
    │   │   └── index.html
    │   ├── src
    │   │   ├── App.js
    │   │   ├── index.js
    │   │   └── styles
    │   │       └── index.css
    │   └── vercel.json
    └── README.md
```

## 💻 Local Development Setup

### 1. Clone the Repository
```bash
git clone https://github.com/shibbu04/Moonlit-App.git
cd Moonlit-App
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start development server
npm run dev  # Uses nodemon for development
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start React development server
npm start
```

## 🏗 Application Architecture

### Message Flow and Communication
The application uses Socket.IO to establish real-time, bidirectional communication between clients and the server:

1. **Connection Establishment**
   - Clients connect to the server using Socket.IO client
   - Server maintains a set of connected users
   - Each connection receives a unique socket identifier

2. **Message Broadcasting**
   - When a client sends a message, it's emitted to the server
   - The server broadcasts the message to all other connected clients
   - The original sender is explicitly excluded from receiving their own message

3. **Concurrency Handling**
   - Utilizes Node.js's event-driven, non-blocking I/O model
   - Socket.IO manages connections asynchronously
   - Supports multiple simultaneous client connections
   - Implements automatic reconnection strategy

### Connection Strategy
- WebSocket connection with robust CORS configuration
- Automatic reconnection
  - Attempts: 5
  - Delay between attempts: 1000ms
- Fallback mechanisms for network instability

## 🛡 Error Handling and Robustness

### Client Disconnection Management
- Graceful handling of unexpected client disconnects
- Automatic removal of disconnected users from active user list
- System-level notifications for user joins and leaves

### Network Resilience
- Configurable reconnection attempts
- Validation of incoming user data
- Prevention of duplicate usernames
- Maximum message length enforcement (500 characters)

### Edge Case Handling
- Username uniqueness validation
- Trim and length restrictions on username and messages
- Explicit error events for connection issues
- Timestamp generation for each message

## 🚢 Deployment

### Frontend (Vercel)
- Deployed on Vercel
- Custom `vercel.json` handles client-side routing
- Supports custom domain

### Backend (Render)
- Deployed as a Node.js web service
- Automatic SSL
- Global CDN support

## 🌟 Advanced Features
- System-level user notifications
- Mobile-responsive design
- Configurable username (max 20 characters)
- Intelligent message tracking

## 🔗 Project Links
- **Frontend**: [Vercel Deployment](https://moonlit-app.vercel.app)
- **Backend**: [Render Deployment](https://moonlit-app.onrender.com/api/health)
- **GitHub Repo**: [Project Repository](https://github.com/shibbu04/Moonlit-App)

## 🧪 Testing Real-Time Messaging

### Local Testing
1. Start the backend server using `npm run dev` in the backend directory
2. Start the frontend application using `npm start` in the frontend directory
3. Open multiple browser windows/tabs
4. Connect with different usernames
5. Send messages and observe real-time updates across all connected clients

### Test Scenarios
- Simultaneous user connections
- Message broadcasting
- User join/leave notifications
- Mobile responsiveness
- Network reconnection handling

## 👥 About the Developer

**Shivam Singh**
- 🌐 Portfolio: [shivam04.tech](https://shivam04.tech/)
- 💼 LinkedIn: [Shivam Singh](https://www.linkedin.com/in/shivamsingh57680/)
- 🐱 GitHub: [@shibbu04](https://github.com/shibbu04/)

**Made with ❤️ by Shivam | Connect. Communicate. Celebrate! 🌈**
