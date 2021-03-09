const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    student_name: {
        type: String,
        required: true
    },
    father_name: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pin: {
        type: String,
        required: true,
        max: 6
    },
    phone: {
        type: String,
        max: 10,
        required: true,
    },
    Email: {
        type: String,
        unique: true,
        required: true,
    },
    class: {
        type: String,
        default: "Select Class",
        required: true,
    },
    marks: {
        type: Number,
        required: true,
        required: true,
    },
    enrollDate: {
        type: Date,
        required: true,
        default: Date.now,
        required: true,
    }
})

module.exports = mongoose.model('Student', studentSchema)