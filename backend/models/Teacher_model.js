const mongoose = require('mongoose');
const User = require('./User'); // Base user schema import

const teacherSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    classes: [{
        className: { type: String }, // Name of the class
        students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }] // Reference to students in this class
    }],
    subject: { type: String } // Optional: the subject that the teacher teaches
});

const Teacher_model = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher_model
