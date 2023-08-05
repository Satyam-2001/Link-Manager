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
        const index = await Course.countDocuments({});
        const course = new Course({ index, ...req.body })
        await course.save()
        res.status(201).send(course)
    }
    catch (e) {
        res.status(400).send(e)
    }
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.post('/orderup', async (req, res) => {
    try {
        const course_1 = await Course.findOne({ _id: req.body.id })
        const index = course_1._doc.index
        if (index === 0) return;
        const course_2 = await Course.findOne({ index: index - 1 })
        const c1 = { ...course_1._doc }
        const c2 = { ...course_2._doc }
        delete c1._id
        delete c2._id
        await Course.replaceOne({ _id: course_1._doc._id }, { ...c1, index: index - 1 })
        await Course.replaceOne({ _id: course_2._doc._id }, { ...c2, index })
        res.send()
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.post('/orderdown', async (req, res) => {
    try {
        const course_1 = await Course.findOne({ _id: req.body.id })
        const index = course_1._doc.index
        const course_2 = await Course.findOne({ index: index + 1 })
        if (!course_2) return;
        const c1 = { ...course_1._doc }
        const c2 = { ...course_2._doc }
        delete c1._id
        delete c2._id
        await Course.replaceOne({ _id: course_1._doc._id }, { ...c1, index: index + 1 })
        await Course.replaceOne({ _id: course_2._doc._id }, { ...c2, index })
        res.send()
    } catch (e) {
        res.status(400).send(e)
    }
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
