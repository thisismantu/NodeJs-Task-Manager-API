const express = require('express');
const router = express.Router();

// Controllers
const UserController = require('../app/Controllers/UserController');
const TaskController = require('../app/Controllers/TaskController');

// Group routes for users
router.route('/users')
    .get(UserController.getAllUsers)          
    .post(UserController.createUser);        

router.route('/users/:id')
    .get(UserController.getUserById)         
    .put(UserController.updateUser)         
    .delete(UserController.deleteUser);    

//Group routes for items

router.route('/tasks')
    .get(TaskController.taskList);        


// router.route('/tasks/:id')
//     .get(TaskController.getUserById)         
//     .put(TaskController.updateUser)         
//     .delete(TaskController.deleteUser);    


module.exports = router;
