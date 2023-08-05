const express = require('express')
const router = new express.Router()
const Course = require("../models/Course")


router.get('/course', async (req, res) => {
    try {
        const courses = await Course.find({})
        res.status(200).send(courses)
    }
    catch (e) {
        res.status(400).send()
    }
})

router.post('/course', async (req, res) => {
    try {
        const course = new Course(req.body)
        await course.save()
        res.status(201).send(course)
    }
    catch (e) {
        res.status(400).send(e)
    }
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.patch('/course', async (req, res) => {

    try {
        const course = await Course.findByIdAndUpdate(req.body._id, req.body)
        res.send(course)
    }
    catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

router.delete('/course/:id', async (req, res) => {
    try {
        await Course.deleteOne({ _id: req.params.id })
        res.send()
    }
    catch (e) {
        res.status(500).send()
    }
})

module.exports = router
