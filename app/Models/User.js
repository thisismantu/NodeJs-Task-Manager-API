const bcrypt = require('bcryptjs');
const db = require('../../config/db');
const { getPrefixedTableName } = require('../../config/dbUtils');
// const paginate  = require('../../config/pagination');

const loginUsers = async () => {
    try {

        const tableName = getPrefixedTableName('users');
        const [queryResponse] = await db.query(`SELECT * FROM \`${tableName}\` LIMIT 10`);
        return queryResponse;
    } catch (err) {
        throw new Error(err.message);
    }
};

const getAllUsers = async () => {
    try {

        const tableName = getPrefixedTableName('users');
        const [queryResponse] = await db.query(`SELECT * FROM \`${tableName}\` LIMIT 10`);
        return queryResponse;
    } catch (err) {
        throw new Error(err.message);
    }
};

const getUserById = async (id) => {
    try {
        const tableName = getPrefixedTableName('users');
        const [queryResponse] = await db.query(`SELECT * FROM \`${tableName}\` WHERE id = ?`, [id]);
        return queryResponse[0];
    } catch (err) {
        throw new Error(err.message);
    }
};

const createUser = async (userData) => {
    try {
        // Destructure user data
        const { name, mobile, email, password } = userData;

        // Hash passwords before storing them
        const hashedPassword = await bcrypt.hash(password, 10);  // Hash the main password
        
        // Check if the mobile number or email already exists in the database
        const [existingUser] = await db.query(
            'SELECT `id` FROM `users` WHERE `mobile` = ? OR `email` = ?',
            [mobile, email]
        );

        if (existingUser.length > 0) {
            throw new Error('A user with this mobile or email already exists.');
        }

        // Insert the new user into the database
        const [queryResponse] = await db.query(
            'INSERT INTO `users` (`name`, `mobile`, `email`, `password`) VALUES (?, ?, ?, ?)',
            [name, mobile, email, hashedPassword]
        );

        // Return the inserted user's ID
        return queryResponse.insertId;
    } catch (err) {
        // Handle errors and provide more context
        console.error('Error creating user:', err.message);  // Log the error for debugging
        throw new Error(err.message || 'An error occurred while creating the user.');
    }
};

const updateUser = async (id, userData) => {
    try {
        const { name, email, password } = userData;
        const [queryResponse] = await db.query(
            'UPDATE `users` SET name = ?, email = ?, password = ? WHERE id = ?',
            [name, email, password, id]
        );
        return queryResponse.affectedRows > 0;
    } catch (err) {
        throw new Error(err.message);
    }
};

const deleteUser = async (id) => {
    try {
        const [queryResponse] = await db.query('DELETE FROM `users` WHERE id = ?', [id]);
        return queryResponse.affectedRows > 0;
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    loginUsers
};
