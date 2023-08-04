const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    url: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!value.includes('.')) {
                throw new Error(`URL is invalid!`)
            }
        }
    },
    image: {
        type: String,
    },
}, {
    timestamps: true
})

const Course = mongoose.model('Course', courseSchema)

module.exports = Course