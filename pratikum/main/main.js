const express = require("express")
const moment = require("moment")
const md5 = require("md5")
const path = require("path")
const fs = require("fs")
const multer = require("multer")
const Cryptr = require("cryptr")
const cryptr = new Cryptr("mt09vj04300m43vnei53n02d94d039d32")
const cors = require("cors")
let mysql = require("mysql")
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname))

let port = () => {
    return app.listen(8080, () => {
        console.log("Server run on port 8000")
    })

}

module.exports = { mysql, app, moment, md5, port, multer, path, fs, cryptr }