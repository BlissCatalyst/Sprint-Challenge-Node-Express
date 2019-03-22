const express = require('express');

const project = require('./data/helpers/projectModel.js');
const action = require('./data/helpers/actionModel.js');

const router = express.Router();

// Get Requests
router.get('/', async (req, res) => {
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

router.get('/:projectId', async (req, res) => {
  try {
    const data = await project.get(req.params.projectId);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the actions."
    });
  }
});

// Post Requests
router.post('/', async (req, res) => {
  try {
    const newProject = await project.insert(req.body);
    if(newProject.name && newProject.description) {
      res.status(201).json(res.body);
    } else {
      res.status(400).json({
        message: "New Project must have a name and a description."
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error - could not post. Server at fault."
    });
  }
});

router.post('/:projectId', async (req, res) => {
  try {
    const newAction = await action.insert(req.body);
    if(newAction.porject_id && newAction.description && newAction.notes) {
      res.status(201).json(res.body);
    } else {
      res.status(400).json({
        message: "New Action must have a valid project ID, description, and notes."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error from server."
    });
  }
});

module.exports = router;