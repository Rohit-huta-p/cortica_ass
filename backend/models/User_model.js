const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const user_Schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['admin', 'teacher', 'student'],
        default: 'student'
    },
    profilePicture: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    createdAt: { type: Date, default: Date.now }
});

// Hashing password
user_Schema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// match passwords
user_Schema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

// Generate JWT Token
user_Schema.methods.generateToken = function() {
    return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
const User_model = mongoose.model('User', user_Schema);
module.exports = User_model;
