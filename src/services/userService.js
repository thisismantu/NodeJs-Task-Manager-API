const { User } = require("../models/User");

// Fetch all users
const getAllUsers = async () => {
    try {
        return await User.findAll({ limit: 10 });
    } catch (error) {
        throw new Error(error.message);
    }
};

// Fetch a user by ID
const getUserById = async (id) => {
    try {
        return await User.findByPk(id);
    } catch (error) {
        throw new Error(error.message);
    }
};

// Create a new user
const createUser = async (userData) => {
    try {
        return await User.create(userData);
    } catch (error) {
        throw new Error(error.message);
    }
};

// Update a user
const updateUser = async (id, updatedData) => {
    try {
        await User.update(updatedData, { where: { id } });
        return await User.findByPk(id);
    } catch (error) {
        throw new Error(error.message);
    }
};

// Delete a user
const deleteUser = async (id) => {
    try {
        return await User.destroy({ where: { id } });
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
