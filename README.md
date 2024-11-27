# Real-Time Chat Application

## Overview
A real-time chat application built with **React**, **Node.js**, and **Socket.IO**, enabling multiple users to communicate in a shared chatroom environment. The project consists of a **frontend**, **backend**, and real-time communication system.

---

## Features
- Real-time messaging with Socket.IO.
- Online users list and system notifications for user join/leave events.
- Backend health check and concurrency management.
- Optimized for deployment with scalability in mind.

---

## Technology Stack
- **Frontend:** React, Socket.IO Client, CSS.
- **Backend:** Node.js, Express, Socket.IO.
- **Deployment:** Vercel (frontend & backend).

---

## Prerequisites
- **Node.js**: v14 or later.
- **npm** or **yarn** installed.

---

## Project Structure
### Frontend
```
frontend/
├── public/
├── src/
│   ├── components/
│   ├── App.js
│   ├── index.js
│   └── styles/
├── package.json
└── README.md
```

### Backend
```
backend/
├── server.js
├── package.json
└── README.md
```

---

## Local Setup
### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   npm install
   npm start
   ```
2. Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   CORS_ORIGIN=http://localhost:3000
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   npm install
   npm start
   ```
2. Create a `.env` file in the frontend directory:
   ```env
   REACT_APP_BACKEND_URL=http://localhost:5000
   ```

---

## Running the Application
- **Frontend Development Mode**: 
  ```bash
  npm start
  ```
  Access the app at [http://localhost:3000](http://localhost:3000).
  
- **Backend Development Mode**:
  ```bash
  npm run dev
  ```

- Ensure the **backend** server is running before starting the **frontend**.

---

## Deployment
### Frontend
Configured for **Vercel** deployment:
- **Build Command**: `npm run build`
- **Output Directory**: `build`

### Backend
Deployed as serverless functions on **Vercel**:
- **Entry Point**: `server.js`
- Serverless function-ready.

---

## API Endpoints
- **GET /api/health**: Backend health check.

---

## Socket.IO Events
### Core Events
- **user_join**: Handles user connections.
- **send_message**: Broadcasts messages to all connected users.
- **disconnect**: Handles user disconnections.

### Concurrency Handling
- Manages multiple client connections with event-driven architecture.
- Broadcast messages in real time.

---

## Performance Optimization
### Frontend
- Code splitting.
- Memoization of components.
- Efficient state management.

### Backend
- Stateless design for horizontal scaling.
- Asynchronous event handling for concurrent users.

---

## Security Considerations
- **CORS** configuration for secure communication.
- Unique username validation to prevent conflicts.
- Basic error handling for robust functionality.

---

## Monitoring and Logging
- Console logs for user connection/disconnection events.
- Basic error tracking for debugging.

---

## Future Improvements
- Implement private messaging between users.
- Add user authentication for secure access.
- Integrate persistent chat history using a database.

---

## Troubleshooting
- Ensure the **backend** server is running before starting the **frontend**.
- Verify the environment variables in both `.env` files.
- Check console logs for connection or error messages.