const mongoose = require('mongoose');
const User = require('./User'); // Base user schema import

const admin_Schema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Admin_model = mongoose.model('Admin', admin_Schema);

module.exports = Admin_model
