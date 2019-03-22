const express = require('express');

const project = require('./data/helpers/projectModel.js');
const action = require('./data/helpers/actionModel.js');

const router = express.Router();

// Get Requests **********************
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

// Post Requests *************************
router.post('/project', async (req, res) => {
  try {
    const projectBody = req.body;
    if(projectBody.name && projectBody.description) {
      const newProject = await project.insert(projectBody);
      res.status(201).json(newProject);
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

router.post('/action', async (req, res) => {
  try {
    const actionBody = req.body;
    if(actionBody.project_id && actionBody.description && actionBody.notes) {
      const newAction = await action.insert(actionBody);
      res.status(201).json(newAction);
    } else {
      res.status(400).json({
        message: "New Action must have a valid project ID, description, and notes."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error - can't update."
    });
  }
});

// Update requests *********************
router.put('/:projectId', async (req, res) => {
  try {
    const id = req.params.projectId;
    const changes = req.body;
    const updatePrj = await project.update(id, changes);
    if(changes.description && changes.name) {
      if(res.body) {
        res.status(201).json(res.body);
      } else {
        res.status(404).json({
          message: "Error - project does not exist."
        });
      }
    } else {
      res.status(400).json({
        message: "To update project: need description and name."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error - can't update project."
    });
  }
});

router.put('/:actionId', async (req, res) => {
  try {
    const id = req.params.actionId;
    const changes = req.body;
    const updateAct = await action.update(id, changes);
    if(changes.description && changes.notes && changes.project_id) {
      if(res.body) {
        res.status(201).json(res.body);
      } else {
        res.status(404).json({
          message: "Error - action does not exist."
        });
      }
    } else {
      res.status(400).json({
        message: "To update action: need description, notes, and the project ID."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error - can't update action."
    });
  }
});

// Delete requests ********************
router.delete('/:projectId', async (req, res) => {
  try {
    const delProject = await project.remove(req.params.projectId);
    res.status(200).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error - can't delete project."
    });
  }
});

router.delete('/:actionId', async (req, res) => {
  try {
    const delAction = await action.remove(req.params.actionId);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error - can't delete action."
    });
  }
});

module.exports = router;