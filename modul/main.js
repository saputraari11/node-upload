const express = require("express")
const app = express()
const multer = require("multer")
const path = require("path")
const fs = require("fs")
const mysql = require("mysql")
const cors = require("cors")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.static(__dirname))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./image")
    },
    filename: (req, file, cb) => {
        cb(null, "image-" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })
const port = () => {
    return app.listen("8080", () => {

        console.log("Server run on port 8080")
    })
}

module.exports = { app, mysql, fs, port, upload, path }