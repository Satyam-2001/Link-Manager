require("./db/mongoose")
const express = require("express")
const cors = require('cors');
const courseRouter = require("./routers/course")
const designRouter = require("./routers/design")
const axios = require('axios');



const port = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(express.json())
app.use(courseRouter)
app.use(designRouter)

app.get('/call', (req, res) => {
    res.send({ msg: 'done' })
})

const url = 'http://localhost:3000'

setInterval(() => {
    try {
        axios.get(`${url}/call`)
    }
    catch (e) {
        console.log(e)
    }
}, 5000)

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})