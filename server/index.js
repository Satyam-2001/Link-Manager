require("./db/mongoose")
const express = require("express")
const cors = require('cors');
const courseRouter = require("./routers/course")
const designRouter = require("./routers/design")

const port = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(express.json())
app.use(courseRouter)
app.use(designRouter)

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})