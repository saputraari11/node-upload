const { app, fs, path, port, upload } = require("./main")
const { koneksi } = require("./koneksi")
const { error } = require("console")
const db = koneksi("olshop")

// app.post("/barang", upload.single("image"), (req, res) => {
//     let data = {}
//     Object.assign(data, Object(req.body)) //menggabungkan object body dengan data 
//     data[Object(req.file.fieldname)] = req.file.filename //menambahkan image ke database


//     if (!(req.file)) {
//         res.json({ massage: "Tidak ada file yang terkirim" })
//     } else {
//         let sql = "insert into barang set ?"

//         db.query(sql, data, (err, result) => {
//             if (err) throw err

//             res.json({ massage: result.affectedRows + " Data has been inserted" })

//         })
//     }
// })

// app.put("/barang", upload.single("image"), (req, res) => {
//     let data = null,
//         sql = null
//     let kode = { kode_barang: req.body.kode_barang }
//     data = {...Object(req.body) }
//     for (k in kode) {
//         delete data[k]
//     }

//     if (req.file) {
//         sql = "select * from barang where ?"
//         db.query(sql, kode, (err, result) => {
//             if (err) throw err
//             let filename = result[0].image
//             let dir = path.join(__dirname, "image", filename)
//             fs.unlink(dir, (error) => {})
//         })
//     }
//     sql = "update barang set ? where ?"

//     db.query(sql, [data, kode], (err, result) => {
//         if (err) {
//             res.json({ massage: err.massage })
//         } else { res.json({ massage: result.affectedRows + " Data has been updated" }) }
//     })
// })

app.delete("/barang/:kode_barang", (req, res) => {
    let id = {},
        sql = null
    Object.assign(id, Object(req.params))

    sql = "select * from barang where ?"

    db.query(sql, id, (err, result) => {
        let filename = result[0].image
        let dir = path.join(__dirname, "image", filename)
        fs.unlink(dir, (error) => {})
    })

    sql = "delete from barang where ?"
    db.query(sql, id, (err, result) => {
        if (err) throw err
        res.json({ massage: result.affectedRows + " Data has been deleted" })
    })

})
port()