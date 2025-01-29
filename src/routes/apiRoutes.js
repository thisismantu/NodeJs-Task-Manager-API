const express = require('express');
const router = express.Router();
// Controllers
//const TaskController = require('../controllers/TaskController'); 
// User Routes
router.route('/users')
    .get(UserController.getAllUsers)
    .post(UserController.createUser);

router.route('/users/:id')
    .get(UserController.getUserById)
    .put(UserController.updateUser)
    .delete(UserController.deleteUser);

// // Task Routes
// router.route('/tasks') // Changed to plural for consistency
//     .get(TaskController.taskList);

// router.route('/tasks/:id')
//     .get(TaskController.getTaskById) // Updated method name for clarity
//     .put(TaskController.updateTask)
//     .delete(TaskController.deleteTask);

module.exports = router;
