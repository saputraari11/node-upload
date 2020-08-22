const { multer, path } = require("./../main/main")

const storage_barang = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./file/image/barang")
    },
    filename: (req, file, cb) => {
        cb(null, "image-" + Date.now() + path.extname(file.originalname))
    }
})
const storage_user = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./file/image/user")
    },
    filename: (req, file, cb) => {
        cb(null, "image-" + Date.now() + path.extname(file.originalname))
    }
})

const upload_barang = multer({ storage: storage_barang })
const upload_user = multer({ storage: storage_user })

module.exports = { upload_barang, upload_user }