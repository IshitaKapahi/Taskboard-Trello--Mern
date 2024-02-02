const express = require('express');
const { CreateTask, AllTasks, UpdateTask, DeleteTask, GetTask } = require('../controllers/taskController')

//router object
const router = express.Router()

//routing


//Get a task
router.get('/:id', GetTask);

//Get all tasks
router.get('/', AllTasks);

// Create a new task
router.post('/', CreateTask);

//Update a task
router.patch('/:id', UpdateTask);

//Delete a Task
router.delete('/:id', DeleteTask);







module.exports = router;
