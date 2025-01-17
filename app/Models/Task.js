const db = require('../../config/db'); // Ensure db is properly configured
const { getPrefixedTableName } = require('../../config/dbUtils');

// Get a list of tasks
const getTaskList = async () => {
    try {
        const tableName = getPrefixedTableName('tasks');
        if (!tableName) {
            throw new Error('Table name is not defined');
        }
        // Fetch tasks from the database
        const [queryResponse] = await db.query(`SELECT * FROM \`${tableName}\` LIMIT 10`);
        return queryResponse;
    } catch (err) {
        console.error('Error fetching tasks:', err.message);
        throw new Error(`Unable to fetch tasks: ${err.message}`);
    }
};

/**
 * Create a new task
 */
const createTask = async (taskData) => {
    try {
        if (!taskData || Object.keys(taskData).length === 0) {
            throw new Error('No task data provided');
        }

        const tableName = getPrefixedTableName('tasks');
        if (!tableName) {
            throw new Error('Table name is not defined');
        }

        const { product_id, product_name, quantity, due_date } = taskData;

        // Insert new task into the database
        const [queryResponse] = await db.query(`
            INSERT INTO \`${tableName}\` (product_id, product_name, quantity, due_date)
            VALUES (?, ?, ?, ?)
        `, [product_id, product_name, quantity, due_date]);

        return { taskId: queryResponse.insertId, message: 'Task created successfully' };
    } catch (err) {
        console.error('Error creating task:', err.message);  // Log the error for debugging
        throw new Error(err.message || 'An error occurred while creating the task.');
    }
};

module.exports = {
    getTaskList,
    createTask
};
