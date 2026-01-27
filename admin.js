// Admin Panel for Portfolio
const API_URL = ''; // Same domain for Vercel

const AdminApp = () => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [currentView, setCurrentView] = React.useState('dashboard');
    const [theme, setTheme] = React.useState(() => localStorage.getItem('theme') || 'light');
    const [stats, setStats] = React.useState({
        totalMessages: 0,
        totalProjects: 0,
        todayMessages: 0,
        weekMessages: 0
    });
    const [messages, setMessages] = React.useState([]);
    const [projects, setProjects] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    React.useEffect(() => {
        const auth = localStorage.getItem('adminAuth');
        if (auth === 'authenticated') {
            setIsAuthenticated(true);
            loadDashboardData();
        }
    }, []);

    const loadDashboardData = async () => {
        setLoading(true);
        try {
            // Load projects
            const projectsRes = await fetch(`${API_URL}/api/projects`);
            const projectsData = await projectsRes.json();
            if (projectsData.success) {
                setProjects(projectsData.data);
                setStats(prev => ({ ...prev, totalProjects: projectsData.count }));
            }

            // Load messages (from localStorage for now)
            const storedMessages = JSON.parse(localStorage.getItem('adminMessages') || '[]');
            setMessages(storedMessages);
            setStats(prev => ({
                ...prev,
                totalMessages: storedMessages.length,
                todayMessages: storedMessages.filter(m => isToday(m.date)).length,
                weekMessages: storedMessages.filter(m => isThisWeek(m.date)).length
            }));
        } catch (error) {
            console.error('Error loading data:', error);
        }
        setLoading(false);
    };

    const isToday = (dateString) => {
        const today = new Date();
        const date = new Date(dateString);
        return date.toDateString() === today.toDateString();
    };

    const isThisWeek = (dateString) => {
        const today = new Date();
        const date = new Date(dateString);
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        return date >= weekAgo && date <= today;
    };

    if (!isAuthenticated) {
        return <LoginScreen onLogin={() => {
            setIsAuthenticated(true);
            loadDashboardData();
        }} />;
    }

    return (
        <div className="admin-container">
            <Sidebar 
                currentView={currentView} 
                setCurrentView={setCurrentView}
                onLogout={() => {
                    localStorage.removeItem('adminAuth');
                    setIsAuthenticated(false);
                }}
            />
            <main className="admin-main">
                <Header theme={theme} setTheme={setTheme} />
                <div className="admin-content">
                    {currentView === 'dashboard' && <Dashboard stats={stats} loading={loading} />}
                    {currentView === 'messages' && <Messages messages={messages} setMessages={setMessages} />}
                    {currentView === 'projects' && <Projects projects={projects} setProjects={setProjects} />}
                    {currentView === 'analytics' && <Analytics messages={messages} />}
                </div>
            </main>
        </div>
    );
};


// Login Screen Component
const LoginScreen = ({ onLogin }) => {
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Simple password check (in production, use proper authentication)
        if (password === 'admin@2024') {
            localStorage.setItem('adminAuth', 'authenticated');
            onLogin();
        } else {
            setError('Invalid password');
        }
    };

    return (
        <div className="login-screen">
            <div className="login-box">
                <div className="login-header">
                    <h1>🔐 Admin Panel</h1>
                    <p>Portfolio Management System</p>
                </div>
                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter admin password"
                            required
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" className="login-btn">Login</button>
                    <p className="login-hint">Default password: admin@2024</p>
                </form>
            </div>
        </div>
    );
};

// Sidebar Component
const Sidebar = ({ currentView, setCurrentView, onLogout }) => {
    const menuItems = [
        { id: 'dashboard', icon: '📊', label: 'Dashboard' },
        { id: 'messages', icon: '📧', label: 'Messages' },
        { id: 'projects', icon: '🚀', label: 'Projects' },
        { id: 'analytics', icon: '📈', label: 'Analytics' }
    ];

    return (
        <aside className="admin-sidebar">
            <div className="sidebar-header">
                <h2>Admin Panel</h2>
            </div>
            <nav className="sidebar-nav">
                {menuItems.map(item => (
                    <button
                        key={item.id}
                        className={`nav-item ${currentView === item.id ? 'active' : ''}`}
                        onClick={() => setCurrentView(item.id)}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <span className="nav-label">{item.label}</span>
                    </button>
                ))}
            </nav>
            <div className="sidebar-footer">
                <button className="logout-btn" onClick={onLogout}>
                    <span>🚪</span> Logout
                </button>
            </div>
        </aside>
    );
};

// Header Component
const Header = ({ theme, setTheme }) => {
    return (
        <header className="admin-header">
            <h1>Portfolio Admin</h1>
            <button 
                className="theme-toggle-btn"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
                {theme === 'light' ? '🌙' : '☀️'}
            </button>
        </header>
    );
};


// Dashboard Component
const Dashboard = ({ stats, loading }) => {
    if (loading) {
        return <div className="loading">Loading dashboard...</div>;
    }

    return (
        <div className="dashboard">
            <h2>Dashboard Overview</h2>
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">📧</div>
                    <div className="stat-info">
                        <h3>{stats.totalMessages}</h3>
                        <p>Total Messages</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">📅</div>
                    <div className="stat-info">
                        <h3>{stats.todayMessages}</h3>
                        <p>Today's Messages</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">📊</div>
                    <div className="stat-info">
                        <h3>{stats.weekMessages}</h3>
                        <p>This Week</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">🚀</div>
                    <div className="stat-info">
                        <h3>{stats.totalProjects}</h3>
                        <p>Total Projects</p>
                    </div>
                </div>
            </div>
            <div className="quick-actions">
                <h3>Quick Actions</h3>
                <div className="action-buttons">
                    <button className="action-btn">
                        <span>➕</span> Add New Project
                    </button>
                    <button className="action-btn">
                        <span>📧</span> View Messages
                    </button>
                    <button className="action-btn">
                        <span>📈</span> View Analytics
                    </button>
                </div>
            </div>
        </div>
    );
};

// Messages Component
const Messages = ({ messages, setMessages }) => {
    const [filter, setFilter] = React.useState('all');
    const [selectedMessage, setSelectedMessage] = React.useState(null);

    const filteredMessages = messages.filter(msg => {
        if (filter === 'unread') return !msg.read;
        if (filter === 'read') return msg.read;
        return true;
    });

    const markAsRead = (id) => {
        const updated = messages.map(msg => 
            msg.id === id ? { ...msg, read: true } : msg
        );
        setMessages(updated);
        localStorage.setItem('adminMessages', JSON.stringify(updated));
    };

    const deleteMessage = (id) => {
        if (confirm('Are you sure you want to delete this message?')) {
            const updated = messages.filter(msg => msg.id !== id);
            setMessages(updated);
            localStorage.setItem('adminMessages', JSON.stringify(updated));
            setSelectedMessage(null);
        }
    };

    return (
        <div className="messages-view">
            <div className="messages-header">
                <h2>Messages</h2>
                <div className="message-filters">
                    <button 
                        className={filter === 'all' ? 'active' : ''}
                        onClick={() => setFilter('all')}
                    >
                        All ({messages.length})
                    </button>
                    <button 
                        className={filter === 'unread' ? 'active' : ''}
                        onClick={() => setFilter('unread')}
                    >
                        Unread ({messages.filter(m => !m.read).length})
                    </button>
                    <button 
                        className={filter === 'read' ? 'active' : ''}
                        onClick={() => setFilter('read')}
                    >
                        Read ({messages.filter(m => m.read).length})
                    </button>
                </div>
            </div>
            <div className="messages-content">
                <div className="messages-list">
                    {filteredMessages.length === 0 ? (
                        <div className="no-messages">No messages found</div>
                    ) : (
                        filteredMessages.map(msg => (
                            <div 
                                key={msg.id}
                                className={`message-item ${!msg.read ? 'unread' : ''} ${selectedMessage?.id === msg.id ? 'selected' : ''}`}
                                onClick={() => {
                                    setSelectedMessage(msg);
                                    if (!msg.read) markAsRead(msg.id);
                                }}
                            >
                                <div className="message-header">
                                    <strong>{msg.name}</strong>
                                    {!msg.read && <span className="unread-badge">New</span>}
                                </div>
                                <div className="message-email">{msg.email}</div>
                                <div className="message-preview">{msg.message.substring(0, 50)}...</div>
                                <div className="message-date">{new Date(msg.date).toLocaleDateString()}</div>
                            </div>
                        ))
                    )}
                </div>
                <div className="message-detail">
                    {selectedMessage ? (
                        <>
                            <div className="detail-header">
                                <h3>{selectedMessage.name}</h3>
                                <button 
                                    className="delete-btn"
                                    onClick={() => deleteMessage(selectedMessage.id)}
                                >
                                    🗑️ Delete
                                </button>
                            </div>
                            <div className="detail-info">
                                <p><strong>Email:</strong> <a href={`mailto:${selectedMessage.email}`}>{selectedMessage.email}</a></p>
                                <p><strong>Date:</strong> {new Date(selectedMessage.date).toLocaleString()}</p>
                                {selectedMessage.phone && <p><strong>Phone:</strong> {selectedMessage.phone}</p>}
                                {selectedMessage.company && <p><strong>Company:</strong> {selectedMessage.company}</p>}
                            </div>
                            <div className="detail-message">
                                <h4>Message:</h4>
                                <p>{selectedMessage.message}</p>
                            </div>
                            {selectedMessage.attachments && selectedMessage.attachments.length > 0 && (
                                <div className="detail-attachments">
                                    <h4>Attachments:</h4>
                                    <ul>
                                        {selectedMessage.attachments.map((file, idx) => (
                                            <li key={idx}>{file}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="no-selection">Select a message to view details</div>
                    )}
                </div>
            </div>
        </div>
    );
};


// Projects Component
const Projects = ({ projects, setProjects }) => {
    const [isAdding, setIsAdding] = React.useState(false);
    const [editingProject, setEditingProject] = React.useState(null);

    const handleAddProject = async (projectData) => {
        try {
            const response = await fetch(`${API_URL}/api/admin/projects`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(projectData)
            });
            const data = await response.json();
            if (data.success) {
                setProjects([...projects, data.data]);
                setIsAdding(false);
                alert('Project added successfully!');
            }
        } catch (error) {
            console.error('Error adding project:', error);
            alert('Failed to add project');
        }
    };

    const handleDeleteProject = async (id) => {
        if (!confirm('Are you sure you want to delete this project?')) return;
        
        try {
            const response = await fetch(`${API_URL}/api/admin/projects/${id}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            if (data.success) {
                setProjects(projects.filter(p => p.id !== id));
                alert('Project deleted successfully!');
            }
        } catch (error) {
            console.error('Error deleting project:', error);
            alert('Failed to delete project');
        }
    };

    return (
        <div className="projects-view">
            <div className="projects-header">
                <h2>Projects Management</h2>
                <button 
                    className="add-project-btn"
                    onClick={() => setIsAdding(true)}
                >
                    ➕ Add New Project
                </button>
            </div>
            
            {isAdding && (
                <ProjectForm 
                    onSubmit={handleAddProject}
                    onCancel={() => setIsAdding(false)}
                />
            )}

            <div className="projects-grid">
                {projects.map(project => (
                    <div key={project.id} className="project-card-admin">
                        <img src={project.image} alt={project.title} />
                        <div className="project-info">
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <div className="project-meta">
                                <span>ID: {project.id}</span>
                                {project.featured && <span className="featured-badge">⭐ Featured</span>}
                            </div>
                            <div className="project-actions">
                                <button onClick={() => setEditingProject(project)}>✏️ Edit</button>
                                <button onClick={() => handleDeleteProject(project.id)}>🗑️ Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Project Form Component
const ProjectForm = ({ project, onSubmit, onCancel }) => {
    const [formData, setFormData] = React.useState(project || {
        title: '',
        description: '',
        longDescription: '',
        image: '',
        technologies: [],
        category: '',
        featured: false,
        liveUrl: '',
        githubUrl: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="project-form-modal">
            <div className="project-form">
                <h3>{project ? 'Edit Project' : 'Add New Project'}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Title *</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Category *</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({...formData, category: e.target.value})}
                                required
                            >
                                <option value="">Select category</option>
                                <option value="Web Application">Web Application</option>
                                <option value="Dashboard">Dashboard</option>
                                <option value="Website">Website</option>
                                <option value="Mobile App">Mobile App</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Short Description *</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            rows="2"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Long Description</label>
                        <textarea
                            value={formData.longDescription}
                            onChange={(e) => setFormData({...formData, longDescription: e.target.value})}
                            rows="4"
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Image URL *</label>
                            <input
                                type="url"
                                value={formData.image}
                                onChange={(e) => setFormData({...formData, image: e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={formData.featured}
                                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                                />
                                Featured Project
                            </label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Live URL</label>
                            <input
                                type="url"
                                value={formData.liveUrl}
                                onChange={(e) => setFormData({...formData, liveUrl: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label>GitHub URL</label>
                            <input
                                type="url"
                                value={formData.githubUrl}
                                onChange={(e) => setFormData({...formData, githubUrl: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="submit-btn">
                            {project ? 'Update' : 'Add'} Project
                        </button>
                        <button type="button" className="cancel-btn" onClick={onCancel}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Analytics Component
const Analytics = ({ messages }) => {
    const getMessagesByDay = () => {
        const days = {};
        messages.forEach(msg => {
            const day = new Date(msg.date).toLocaleDateString();
            days[day] = (days[day] || 0) + 1;
        });
        return days;
    };

    const messagesByDay = getMessagesByDay();

    return (
        <div className="analytics-view">
            <h2>Analytics</h2>
            <div className="analytics-grid">
                <div className="analytics-card">
                    <h3>Messages Over Time</h3>
                    <div className="chart">
                        {Object.entries(messagesByDay).map(([day, count]) => (
                            <div key={day} className="chart-bar">
                                <div className="bar" style={{height: `${count * 20}px`}}></div>
                                <span className="bar-label">{day}</span>
                                <span className="bar-value">{count}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="analytics-card">
                    <h3>Message Statistics</h3>
                    <ul className="stats-list">
                        <li>Total Messages: <strong>{messages.length}</strong></li>
                        <li>Unread: <strong>{messages.filter(m => !m.read).length}</strong></li>
                        <li>Read: <strong>{messages.filter(m => m.read).length}</strong></li>
                        <li>This Week: <strong>{messages.filter(m => {
                            const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                            return new Date(m.date) >= weekAgo;
                        }).length}</strong></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

// Render the app
ReactDOM.render(<AdminApp />, document.getElementById('admin-root'));
