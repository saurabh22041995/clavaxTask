const express = require('express')
const router = express.Router()

const Student = require('../models/student')

// get all students
router.get('/allstudents', async (req, res) => {
    try{
        const students = await Student.find()
        res.json(students)
    } catch(err){
        res.status(500).json({ message: err.message })
    }
})

// get by id

router.get('/student/:id', getStudent, (req, res) => {
    res.json(res.student)
})

// post student

router.post('/poststudent', async (req, res) => {
    const students = new Student({
        student_name: req.body.father_name,
        father_name: req.body.father_name,
        dob: req.body.dob,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        pin: req.body.pin,
        phone: req.body.phone,
        Email: req.body.Email,
        class: req.body.class,
        marks: req.body.marks,
        enrollDate: req.body.enrollDate
    })
    try{
        const newStudent = await students.save()
        res.status(200).json(newStudent)
        
    } catch(err){
        res.status(400).json({ message: err.message })
    }
})

// update student

router.put('/updateStudent/:id', getStudent, async (req, res) => {
    if(req.body.student_name !== null){
        res.student.student_name = req.body.student_name
    }
    if(req.body.father_name !== null){
        res.student.father_name = req.body.father_name
    }
    if(req.body.dob !== null){
        res.student.dob = req.body.dob
    }
    if(req.body.address !== null){
        res.student.address = req.body.address
    }
    if(req.body.city !== null){
        res.student.city = req.body.city
    }
    if(req.body.state !== null){
        res.student.state = req.body.state
    }
    if(req.body.pin !== null){
        res.student.pin = req.body.pin
    }
    if(req.body.phone !== null){
        res.student.phone = req.body.phone
    }
    if(req.body.Email !== null){
        res.student.Email = req.body.Email
    }
    if(req.body.class !== null){
        res.student.class = req.body.class
    }
    if(req.body.marks !== null){
        res.student.marks = req.body.marks
    }
    if(req.body.enrollDate !== null){
        res.student.enrollDate = req.body.enrollDate
    }
    try {
        const updatedStudent = await res.student.save()
        res.json(updatedStudent)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// helper function (middleware)
async function getStudent(req, res, next){
    let student
    try {
        student = await Student.findById(req.params.id)
        if(student == null){
            return res.status(404).json({ message: 'Cannot find student' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    res.student = student
    next()
}

module.exports = router