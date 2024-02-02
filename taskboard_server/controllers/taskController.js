const Task = require('../db/task');
const asyncHandler = require('express-async-handler')


//Get A Task
const GetTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
        res.status(404);
        throw new Error("task not found");
    }
    res.json(task);

})
// Get All Tasks
const AllTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

//For Creating A Task
const CreateTask = asyncHandler(async (req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
    });
    const newTask = await task.save();
    res.status(201).json(newTask);

});
//For Updating a Task
const UpdateTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
        res.status(404);
        throw new Error("task not found");
    }
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
});

//For Deleting a Task
const DeleteTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
        res.status(404);
        throw new Error("task not found");
    }
    const delete1 = await Task.deleteOne(task);
    res.status(200).json(task);
});



//exporting controllers
module.exports = { CreateTask, AllTasks, UpdateTask, DeleteTask, GetTask };