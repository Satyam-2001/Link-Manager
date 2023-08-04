const mongoose = require("mongoose")

const designSchema = new mongoose.Schema({
    header_body: {
        type: String,
    },
    header_image: {
        type: String,
    },
    footer_body: {
        type: String,
    },
    background_color: {
        type: String,
    },
    text_color: {
        type: String,
    },
    card_color: {
        type: String,
    },
})

const Design = mongoose.model('Design', designSchema)

module.exports = Design