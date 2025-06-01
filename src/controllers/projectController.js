import mongoose from 'mongoose';
import connectMongodb from '../config/mongodb.js';
import Project from '../models/project.js';

export const getAllProjects = async (req, res) => {
  try {
    await connectMongodb();

    const { title } = req.query;
    let filter = {};

    if (title) {
      filter.title = decodeURIComponent(title);
    }

    const projects = await Project.find(filter);
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getProjectById = async (req, res) => {
  try {
    await connectMongodb();

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid project id' });
    }

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const createProject = async (req, res) => {
  try {
    await connectMongodb();

    const { title, description } = req.body;
    let image = null;

    if (req.file) {
      image = req.file.filename; 
    }

    const newProject = new Project({ title, description, image });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateProject = async (req, res) => {
  try {
    await connectMongodb();

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid project id' });
    }

    const updateData = { ...req.body };

    const updated = await Project.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteProject = async (req, res) => {
  try {
    await connectMongodb();

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid Project id' });
    }

    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
