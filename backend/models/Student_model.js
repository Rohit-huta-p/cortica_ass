const mongoose = require('mongoose');
// base schema
const User_model = require('./User_model'); 

const studentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    attendance: [{
        date: { type: Date, default: Date.now },
        time: { type: String },  // Time of the punch-in
        selfie: { type: String }, // URL or path to the selfie image
    }]
});


const Student_model = mongoose.model('Student', studentSchema);

module.exports = Student_model
