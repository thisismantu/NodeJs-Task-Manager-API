const User = require('../Models/User');


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getUserById = async (req, res) => {
    try {
        const user = await User.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const user_id = await User.createUser(req.body);
        res.status(201).json({ message: 'User created successfully', user_id });
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: err.message || 'An unexpected error occurred',
        });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const isUpdated = await User.updateUser(req.params.id, req.body);
        if (!isUpdated) {
            return res.status(404).json({ error: 'User not found or no changes made' });
        }
        res.json({ message: 'User updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const isDeleted = await User.deleteUser(req.params.id);
        if (!isDeleted) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

