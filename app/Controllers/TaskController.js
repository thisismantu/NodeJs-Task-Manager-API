const { TaskModel } = require('../Models/Task');


exports.taskList = async (req, res) => {
    try {
        const response = await TaskModel.getTaskList();
        res.json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};





/**
 * Create Task
 */
exports.createTask = async (req, res) => {
    try {
        const task_id = await Task.createTask(req.body);
        return res.status(201).json({
            status: 201,
            message: 'Task created successfully',
            task_id
        });
    } catch (err) {
        // Log the error for debugging purposes
        console.error('Error creating task:', err);

        // Return a more descriptive error message
        return res.status(500).json({
            status: 500,
            error: err.message || 'An unexpected error occurred while creating the task.',
        });
    }
};
