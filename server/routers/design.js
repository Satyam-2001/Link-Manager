const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()
const Design = require("../models/Design")


router.get('/design', async (req, res) => {
    try {
        const designs = await Design.find({})
        res.status(200).send(designs[0])
    }
    catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.post('/design', auth, async (req, res) => {
    try {
        await Design.deleteMany({})
        const design = new Design(req.body)
        await design.save()
        res.status(201).send(design)
    }
    catch (e) {
        res.status(400).send(e)
    }
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

module.exports = router
