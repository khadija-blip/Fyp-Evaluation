const path = require('path');
const Project = require('../models/Project');
const asyncHandler = require('../utils/asyncHandler');

const parseTechStack = (input) => {
  if (!input) return undefined;
  if (Array.isArray(input)) return input;
  return input
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
};

const createProject = asyncHandler(async (req, res) => {
  const { title, abstract, supervisorId, technologies } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: 'Project file is required' });
  }

  if (!title || !abstract) {
    return res.status(400).json({ message: 'Title and abstract required' });
  }

  const project = await Project.create({
    title,
    abstract,
    student: req.user._id,
    supervisor: supervisorId || undefined,
    technologies: parseTechStack(technologies),
    fileUrl: `/uploads/${req.file.filename}`,
    fileName: path.basename(req.file.originalname),
    status: 'submitted',
  });

  return res.status(201).json({ project });
});

const getProjects = asyncHandler(async (req, res) => {
  const filter = {};

  if (req.user.role === 'student') {
    filter.student = req.user._id;
  } else if (req.user.role === 'supervisor') {
    filter.supervisor = req.user._id;
  }

  if (req.query.status) {
    filter.status = req.query.status;
  }

  const projects = await Project.find(filter)
    .populate('student', 'name email')
    .populate('supervisor', 'name email');

  return res.json({ projects });
});

const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)
    .populate('student', 'name email')
    .populate('supervisor', 'name email');

  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  const isOwner =
    project.student._id.toString() === req.user._id.toString();
  const isSupervisor =
    project.supervisor &&
    project.supervisor._id.toString() === req.user._id.toString();

  if (
    req.user.role === 'student' &&
    !isOwner
  ) {
    return res.status(403).json({ message: 'Access denied' });
  }

  if (req.user.role === 'supervisor' && !isSupervisor) {
    return res.status(403).json({ message: 'Access denied' });
  }

  return res.json({ project });
});

const updateProjectDecision = asyncHandler(async (req, res) => {
  const { status, remarks } = req.body;
  const allowedStatuses = ['under_review', 'accepted', 'rejected'];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  if (
    req.user.role === 'supervisor' &&
    project.supervisor?.toString() !== req.user._id.toString()
  ) {
    return res.status(403).json({ message: 'Not assigned to you' });
  }

  project.status = status;
  project.remarks = remarks;

  await project.save();

  return res.json({ project });
});

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProjectDecision,
};


