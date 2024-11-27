import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { 
  LucideGithub, 
  Linkedin, 
  Globe, 
  ArrowRight,
  Menu,
  X 
} from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

function App() {
  // Socket state
  const [socket, setSocket] = useState(null);

  // Chat states
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Mobile responsive states
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Socket connection
  useEffect(() => {
    const newSocket = io(BACKEND_URL, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });

    newSocket.on('connect', () => {
      console.log('Socket connected successfully');
      setSocket(newSocket);
    });

    newSocket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  // User login handler
  const handleLogin = () => {
    if (username.trim() && socket) {
      try {
        socket.emit('user_join', username);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Login error:', error);
      }
    }
  };

  // Message send handler
  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && socket) {
      const messageData = {
        username,
        message,
        timestamp: new Date().toLocaleTimeString()
      };

      try {
        socket.emit('send_message', messageData);
        setMessages(prevMessages => [...prevMessages, { ...messageData, self: true }]);
        setMessage('');
      } catch (error) {
        console.error('Message send error:', error);
      }
    }
  };

  // Leave room handler
  const leaveRoom = () => {
    if (socket) {
      socket.emit('leave_room', username);
      setIsLoggedIn(false);
      setUsername('');
      setMessages([]);
      setUsers([]);
    }
  };

  // Socket event listeners
  useEffect(() => {
    if (!socket) return;

    const handleUserUpdate = (data) => {
      setUsers(data.users);
      setMessages(prevMessages => [
        ...prevMessages, 
        { 
          username: 'System', 
          message: `${data.username} ${data.action === 'join' ? 'joined' : 'left'} the chat`,
          timestamp: new Date().toLocaleTimeString(),
          system: true
        }
      ]);
    };

    const handleReceiveMessage = (messageData) => {
      setMessages(prevMessages => [...prevMessages, messageData]);
    };

    socket.on('user_update', handleUserUpdate);
    socket.on('receive_message', handleReceiveMessage);

    return () => {
      socket.off('user_update', handleUserUpdate);
      socket.off('receive_message', handleReceiveMessage);
    };
  }, [socket]);

  // Login screen
  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <h1>Moonlit 🌙</h1>
            <p>Your Friendly Neighborhood Chat App</p>
          </div>
          <div className="login-content">
            <input 
              type="text" 
              placeholder="Choose a cool username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={20}
            />
            <button onClick={handleLogin}>
              Start Chatting <ArrowRight className="button-icon" />
            </button>
          </div>
          
          {/* Enhanced Social Footer */}
          <div className="social-footer">
            <div className="social-links">
              <a 
                href="https://github.com/shivams1208" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link"
              >
                <LucideGithub strokeWidth={1.5} />
                <span>GitHub</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/shivam-sharma-3b184422a/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link"
              >
                <Linkedin strokeWidth={1.5} />
                <span>LinkedIn</span>
              </a>
              <a 
                href="https://shivam-portfolio-v2.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link"
              >
                <Globe strokeWidth={1.5} />
                <span>Portfolio</span>
              </a>
            </div>
            <div className="footer-tagline">
              <p>Designed with ❤️ by Shivam</p>
              <p>🌈 Connect. Communicate. Celebrate!</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Chat interface
  return (
    <div className="chat-container">
      {/* Mobile Sidebar Toggle */}
      <div className="mobile-header">
        <button 
          className="mobile-sidebar-toggle" 
          onClick={() => setIsMobileSidebarOpen(true)}
        >
          <Menu />
        </button>
        <h2>Moonlit Chat</h2>
      </div>
      
      <div className={`users-sidebar ${isMobileSidebarOpen ? 'mobile-sidebar-open' : ''}`}>
        <button 
          className="mobile-sidebar-close" 
          onClick={() => setIsMobileSidebarOpen(false)}
        >
          <X />
        </button>
        <div className="users-header">
          <h2>Active Connections</h2>
          <span className="user-count">{users.length}</span>
        </div>
        <div className="logged-in-user">
          Logged in as: {username}
        </div>
        <div className="users-list">
          {users.map(user => (
            <div key={user} className="user-item">
              <span className="user-icon">👤</span>
              {user}
            </div>
          ))}
        </div>
        <button 
          className="leave-room-btn" 
          onClick={() => {
            leaveRoom();
            setIsMobileSidebarOpen(false);
          }}
        >
          Leave Room
        </button>
      </div>
      
      <div className="chat-area">
        <div className="chat-header">
          <h2>Chat Room</h2>
          <p>Connecting people, one message at a time</p>
        </div>
        <div className="messages">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`message ${msg.self ? 'self' : ''} ${msg.system ? 'system' : ''}`}
            >
              {!msg.system && (
                <span className="username">{msg.username}</span>
              )}
              <span className="message-text">{msg.message}</span>
              <span className="timestamp">{msg.timestamp}</span>
            </div>
          ))}
        </div>
        
        <form onSubmit={sendMessage} className="message-form">
          <input 
            type="text" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            maxLength={500}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default App;