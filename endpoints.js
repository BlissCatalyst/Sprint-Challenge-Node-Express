const express = require('express');

const project = require('./data/helpers/projectModel.js');
const action = require('./data/helpers/actionModel.js');

const router = express.Router();

// Get Requests
router.get('/projects', async (req, res) => {
  try {
    const data = await project.get();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the posts."
    });
  }
});

router.get('/projects/:projectId', async (req, res) => {
  try {
    console.log(req.params.projectId);
    const data = await project.get(req.params.projectId);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the actions."
    });
  }
});

module.exports = router;