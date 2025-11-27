const express = require('express');
const {
  createProject,
  getProjects,
  getProjectById,
  updateProjectDecision,
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router
  .route('/')
  .post(protect('student'), upload.single('file'), createProject)
  .get(protect(), getProjects);

router
  .route('/:id')
  .get(protect(), getProjectById);

router.patch(
  '/:id/decision',
  protect(['supervisor', 'admin']),
  updateProjectDecision
);

module.exports = router;


