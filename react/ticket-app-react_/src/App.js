import React, { useState, useEffect } from 'react';
import './App.css';

// Simple Icon Components
const CheckCircle = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const AlertCircle = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);

const X = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const LogOut = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

const Ticket = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path>
    <path d="M13 5v2"></path>
    <path d="M13 17v2"></path>
    <path d="M13 11v2"></path>
  </svg>
);

const PlusCircle = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="16"></line>
    <line x1="8" y1="12" x2="16" y2="12"></line>
  </svg>
);

const Edit2 = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
  </svg>
);

const Trash2 = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="m19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

// Utility Functions
const generateId = () => Math.random().toString(36).substr(2, 9);

const getSession = () => {
  try {
    return JSON.parse(localStorage.getItem('ticketapp_session'));
  } catch {
    return null;
  }
};

const setSession = (user) => {
  localStorage.setItem('ticketapp_session', JSON.stringify(user));
};

const clearSession = () => {
  localStorage.removeItem('ticketapp_session');
};

const getTickets = () => {
  try {
    return JSON.parse(localStorage.getItem('tickets')) || [];
  } catch {
    return [];
  }
};

const saveTickets = (tickets) => {
  localStorage.setItem('tickets', JSON.stringify(tickets));
};

// Toast Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast toast-${type}`}>
      {type === 'success' ? <CheckCircle /> : <AlertCircle />}
      <span>{message}</span>
      <button onClick={onClose} className="toast-close">
        <X size={18} />
      </button>
    </div>
  );
};

// Landing Page Component
const LandingPage = ({ onNavigate }) => {
  return (
    <div className="page-wrapper hero-bg">
      <div className="container">
        <header className="header">
          <h1 className="logo">TicketFlow</h1>
          <button onClick={() => onNavigate('login')} className="btn btn-link">
            Login
          </button>
        </header>

        <section className="hero">
          <div className="circle-1"></div>
          <div className="circle-2"></div>

          <div className="hero-content">
            <h2 className="hero-title">
              Manage Your Tickets<br />With Ease
            </h2>
            <p className="hero-text">
              Streamline your workflow with our intuitive ticket management system. 
              Track, organize, and resolve issues efficiently.
            </p>
            <div className="hero-buttons">
              <button onClick={() => onNavigate('signup')} className="btn btn-primary">
                Get Started
              </button>
              <button onClick={() => onNavigate('login')} className="btn btn-secondary">
                Login
              </button>
            </div>
          </div>

          <svg className="wave-svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,64 C360,100 720,20 1080,64 C1440,108 1440,120 1440,120 L0,120 Z" fill="#fff" />
          </svg>
        </section>

        <section className="features">
          <h3 className="section-title">Key Features</h3>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎫</div>
              <h4>Create Tickets</h4>
              <p>Easily create and categorize support tickets</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h4>Track Progress</h4>
              <p>Monitor ticket status in real-time</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h4>Collaborate</h4>
              <p>Work together to resolve issues faster</p>
            </div>
          </div>
        </section>

        <footer className="footer">
          <p>© 2025 TicketFlow. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

// Auth Page Component
const AuthPage = ({ mode, onNavigate, onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (mode === 'signup' && !formData.name) newErrors.name = 'Name is required';
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (mode === 'login') {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === formData.email && u.password === formData.password);

      if (user) {
        setSession({ email: user.email, name: user.name });
        onLogin();
      } else {
        setToast({ message: 'Invalid credentials. Try demo@example.com / password123', type: 'error' });
      }
    } else {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.some(u => u.email === formData.email)) {
        setToast({ message: 'Email already exists', type: 'error' });
        return;
      }
      users.push(formData);
      localStorage.setItem('users', JSON.stringify(users));
      setToast({ message: 'Account created! Please login.', type: 'success' });
      setTimeout(() => onNavigate('login'), 2000);
    }
  };

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (!users.some(u => u.email === 'demo@example.com')) {
      users.push({ email: 'demo@example.com', password: 'password123', name: 'Demo User' });
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, []);

  return (
    <div className="page-wrapper auth-bg">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      
      <div className="auth-card">
        <div className="auth-header">
          <h2>{mode === 'login' ? 'Welcome Back' : 'Get Started'}</h2>
          <p>{mode === 'login' ? 'Login to your account' : 'Create your account'}</p>
        </div>

        <div>
          {mode === 'signup' && (
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-input"
              />
              {errors.name && <p className="form-error">{errors.name}</p>}
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="form-input"
            />
            {errors.email && <p className="form-error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              className="form-input"
            />
            {errors.password && <p className="form-error">{errors.password}</p>}
          </div>

          <button onClick={handleSubmit} className="btn btn-primary btn-full">
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </div>

        <p className="auth-footer">
          {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => onNavigate(mode === 'login' ? 'signup' : 'login')} className="auth-link">
            {mode === 'login' ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

// Dashboard Component
const Dashboard = ({ user, onNavigate, onLogout }) => {
  const [tickets] = useState(getTickets());

  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    inProgress: tickets.filter(t => t.status === 'in_progress').length,
    closed: tickets.filter(t => t.status === 'closed').length
  };

  return (
    <div className="page-wrapper dashboard-bg">
      <div className="container">
        <header className="header-dashboard">
          <div>
            <h1 className="logo">TicketFlow</h1>
            <p className="user-welcome">Welcome, {user.name}</p>
          </div>
          <button onClick={onLogout} className="btn btn-logout">
            <LogOut size={20} />
            Logout
          </button>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon stat-icon-blue">{stats.total}</div>
            <h3 className="stat-label">Total Tickets</h3>
          </div>
          <div className="stat-card">
            <div className="stat-icon stat-icon-green">{stats.open}</div>
            <h3 className="stat-label">Open</h3>
          </div>
          <div className="stat-card">
            <div className="stat-icon stat-icon-amber">{stats.inProgress}</div>
            <h3 className="stat-label">In Progress</h3>
          </div>
          <div className="stat-card">
            <div className="stat-icon stat-icon-gray">{stats.closed}</div>
            <h3 className="stat-label">Closed</h3>
          </div>
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <button onClick={() => onNavigate('tickets')} className="btn btn-primary">
            <Ticket size={20} />
            Manage Tickets
          </button>
        </div>

        <footer className="footer">
          <p>© 2025 TicketFlow. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

// Ticket Management Component
const TicketManagement = ({ user, onNavigate, onLogout }) => {
  const [tickets, setTickets] = useState(getTickets());
  const [showModal, setShowModal] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', status: 'open', priority: 'medium' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!['open', 'in_progress', 'closed'].includes(formData.status)) {
      newErrors.status = 'Invalid status';
    }
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    let updatedTickets;
    if (editingTicket) {
      updatedTickets = tickets.map(t => t.id === editingTicket.id ? { ...formData, id: t.id } : t);
      setToast({ message: 'Ticket updated successfully!', type: 'success' });
    } else {
      const newTicket = { ...formData, id: generateId() };
      updatedTickets = [...tickets, newTicket];
      setToast({ message: 'Ticket created successfully!', type: 'success' });
    }

    saveTickets(updatedTickets);
    setTickets(updatedTickets);
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      const updatedTickets = tickets.filter(t => t.id !== id);
      saveTickets(updatedTickets);
      setTickets(updatedTickets);
      setToast({ message: 'Ticket deleted successfully!', type: 'success' });
    }
  };

  const openModal = (ticket = null) => {
    if (ticket) {
      setEditingTicket(ticket);
      setFormData(ticket);
    } else {
      setEditingTicket(null);
      setFormData({ title: '', description: '', status: 'open', priority: 'medium' });
    }
    setErrors({});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTicket(null);
    setFormData({ title: '', description: '', status: 'open', priority: 'medium' });
    setErrors({});
  };

  return (
    <div className="page-wrapper dashboard-bg">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      
      <div className="container">
        <header className="header-dashboard">
          <div className="tickets-header">
            <button onClick={() => onNavigate('dashboard')} className="back-link">
              ← Dashboard
            </button>
            <h1>Ticket Management</h1>
          </div>
          <button onClick={onLogout} className="btn btn-logout">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </header>

        <div className="tickets-actions">
          <button onClick={() => openModal()} className="btn btn-primary">
            <PlusCircle size={20} />
            Create New Ticket
          </button>
        </div>

        <div className="tickets-grid">
          {tickets.length === 0 ? (
            <div className="empty-state">
              <p>No tickets yet. Create your first ticket!</p>
            </div>
          ) : (
            tickets.map(ticket => (
              <div key={ticket.id} className="ticket-card">
                <div className="ticket-header">
                  <h3 className="ticket-title">{ticket.title}</h3>
                  <span className={`ticket-status status-${ticket.status.replace('_', '-')}`}>
                    {ticket.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="ticket-description">{ticket.description || 'No description'}</p>
                <div className="ticket-actions">
                  <button onClick={() => openModal(ticket)} className="btn btn-edit">
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button onClick={() => handleDelete(ticket.id)} className="btn btn-delete">
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <footer className="footer">
          <p>© 2025 TicketFlow. All rights reserved.</p>
        </footer>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editingTicket ? 'Edit Ticket' : 'Create New Ticket'}</h2>
            <div>
              <div className="form-group">
                <label className="form-label">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="form-input"
                />
                {errors.title && <p className="form-error">{errors.title}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                  className="form-textarea"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Status *</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="form-select"
                >
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
                {errors.status && <p className="form-error">{errors.status}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="form-select"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="modal-actions">
                <button onClick={handleSubmit} className="btn btn-primary">
                  {editingTicket ? 'Update' : 'Create'}
                </button>
                <button onClick={closeModal} className="btn btn-cancel">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Main App Component
export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = getSession();
    if (session) {
      setUser(session);
      setCurrentPage('dashboard');
    }
  }, []);

  const handleLogin = () => {
    const session = getSession();
    setUser(session);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    clearSession();
    setUser(null);
    setCurrentPage('landing');
  };

  const handleNavigate = (page) => {
    if (['dashboard', 'tickets'].includes(page) && !getSession()) {
      setCurrentPage('login');
      return;
    }
    setCurrentPage(page);
  };

  if (currentPage === 'landing') return <LandingPage onNavigate={handleNavigate} />;
  if (currentPage === 'login') return <AuthPage mode="login" onNavigate={handleNavigate} onLogin={handleLogin} />;
  if (currentPage === 'signup') return <AuthPage mode="signup" onNavigate={handleNavigate} onLogin={handleLogin} />;
  if (currentPage === 'dashboard') return <Dashboard user={user} onNavigate={handleNavigate} onLogout={handleLogout} />;
  if (currentPage === 'tickets') return <TicketManagement user={user} onNavigate={handleNavigate} onLogout={handleLogout} />;

  return null;
}