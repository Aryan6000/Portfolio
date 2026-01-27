const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

// GET /api/projects - Get all projects
router.get('/', async (req, res) => {
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

// GET /api/projects/:id - Get single project by ID
router.get('/:id', async (req, res) => {
    try {
        const projectsPath = path.join(__dirname, '../data/projects.json');
        const data = await fs.readFile(projectsPath, 'utf8');
        const projects = JSON.parse(data);
        
        const project = projects.find(p => p.id === parseInt(req.params.id));
        
        if (!project) {
            return res.status(404).json({
                success: false,
                error: 'Project not found'
            });
        }
        
        res.json({
            success: true,
            data: project
        });
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch project'
        });
    }
});

module.exports = router;
