const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

// Simple authentication middleware (in production, use JWT or proper auth)
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader === 'Bearer admin@2024') {
        next();
    } else {
        res.status(401).json({ success: false, error: 'Unauthorized' });
    }
};

// GET /api/admin/projects - Get all projects (admin view)
router.get('/projects', authenticate, async (req, res) => {
    try {
        const projectsPath = path.join(__dirname, '../data/projects.json');
        const data = await fs.readFile(projectsPath, 'utf8');
        const projects = JSON.parse(data);
        
        res.json({
            success: true,
            count: projects.length,
            data: projects
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch projects'
        });
    }
});

// POST /api/admin/projects - Add new project
router.post('/projects', authenticate, async (req, res) => {
    try {
        const projectsPath = path.join(__dirname, '../data/projects.json');
        const data = await fs.readFile(projectsPath, 'utf8');
        const projects = JSON.parse(data);
        
        // Generate new ID
        const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
        
        const newProject = {
            id: newId,
            ...req.body,
            completedDate: new Date().toISOString().split('T')[0]
        };
        
        projects.push(newProject);
        
        await fs.writeFile(projectsPath, JSON.stringify(projects, null, 2));
        
        res.json({
            success: true,
            message: 'Project added successfully',
            data: newProject
        });
    } catch (error) {
        console.error('Error adding project:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to add project'
        });
    }
});

// PUT /api/admin/projects/:id - Update project
router.put('/projects/:id', authenticate, async (req, res) => {
    try {
        const projectsPath = path.join(__dirname, '../data/projects.json');
        const data = await fs.readFile(projectsPath, 'utf8');
        let projects = JSON.parse(data);
        
        const projectIndex = projects.findIndex(p => p.id === parseInt(req.params.id));
        
        if (projectIndex === -1) {
            return res.status(404).json({
                success: false,
                error: 'Project not found'
            });
        }
        
        projects[projectIndex] = {
            ...projects[projectIndex],
            ...req.body,
            id: parseInt(req.params.id)
        };
        
        await fs.writeFile(projectsPath, JSON.stringify(projects, null, 2));
        
        res.json({
            success: true,
            message: 'Project updated successfully',
            data: projects[projectIndex]
        });
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update project'
        });
    }
});

// DELETE /api/admin/projects/:id - Delete project
router.delete('/projects/:id', authenticate, async (req, res) => {
    try {
        const projectsPath = path.join(__dirname, '../data/projects.json');
        const data = await fs.readFile(projectsPath, 'utf8');
        let projects = JSON.parse(data);
        
        const filteredProjects = projects.filter(p => p.id !== parseInt(req.params.id));
        
        if (filteredProjects.length === projects.length) {
            return res.status(404).json({
                success: false,
                error: 'Project not found'
            });
        }
        
        await fs.writeFile(projectsPath, JSON.stringify(filteredProjects, null, 2));
        
        res.json({
            success: true,
            message: 'Project deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete project'
        });
    }
});

// GET /api/admin/messages - Get all messages (stored in a file or database)
router.get('/messages', authenticate, async (req, res) => {
    try {
        const messagesPath = path.join(__dirname, '../data/messages.json');
        
        // Create file if it doesn't exist
        try {
            await fs.access(messagesPath);
        } catch {
            await fs.writeFile(messagesPath, JSON.stringify([]));
        }
        
        const data = await fs.readFile(messagesPath, 'utf8');
        const messages = JSON.parse(data);
        
        res.json({
            success: true,
            count: messages.length,
            data: messages
        });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch messages'
        });
    }
});

// GET /api/admin/stats - Get dashboard statistics
router.get('/stats', authenticate, async (req, res) => {
    try {
        const projectsPath = path.join(__dirname, '../data/projects.json');
        const messagesPath = path.join(__dirname, '../data/messages.json');
        
        const projectsData = await fs.readFile(projectsPath, 'utf8');
        const projects = JSON.parse(projectsData);
        
        let messages = [];
        try {
            const messagesData = await fs.readFile(messagesPath, 'utf8');
            messages = JSON.parse(messagesData);
        } catch {
            // Messages file doesn't exist yet
        }
        
        const today = new Date();
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        
        const stats = {
            totalProjects: projects.length,
            totalMessages: messages.length,
            todayMessages: messages.filter(m => {
                const msgDate = new Date(m.date);
                return msgDate.toDateString() === today.toDateString();
            }).length,
            weekMessages: messages.filter(m => {
                const msgDate = new Date(m.date);
                return msgDate >= weekAgo && msgDate <= today;
            }).length,
            unreadMessages: messages.filter(m => !m.read).length
        };
        
        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch statistics'
        });
    }
});

module.exports = router;
