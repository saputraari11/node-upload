const { moment, crypto, app, md5, path, fs } = require("./main")
const { db } = require("./../auth/api")
const { upload_barang, upload_user } = require("./../file/image")

const registrasi_barang = (link, valid) => {
    return app.post(link, upload_barang.single("image"), (req, res) => {
        if (!req.file) {
            res.json({
                massage: "File not send"
            })
        } else {
            let data = {
                nama_barang: req.body.nama_barang,
                harga: req.body.harga,
                stok: req.body.stok,
                deskripsi: req.body.deskripsi,
                image: req.file.filename

            }
            let sql = "insert into barang set ?"

            db.query(sql, data, (err, result) => {
                if (err) throw err
                res.json({ massage: result.affectedRows + " has been inserted" })
            })
        }
    })
}
const registrasi_user = (link, valid) => {
    return app.post(link, upload_user.single("foto"), (req, res) => {
        if (!req.file) {
            res.json({
                massage: "File not send"
            })
        } else {
            let data = {
                id_user: req.body.id_user,
                nama_user: req.body.nama_user,
                alamat: req.body.alamat,
                username: req.body.username,
                password: md5(req.body.password),
                foto: req.file.filename

            }
            let sql = "insert into user set ?"

            db.query(sql, data, (err, result) => {
                if (err) throw err
                res.json({ massage: result.affectedRows + " has been inserted" })
            })
        }
    })
}
const registrasi_admin = (link) => {
    return app.post(link, (req, res) => {
        let data = {
            id_admin: req.body.id_admin,
            nama_admin: req.body.nama_admin,
            username: req.body.username,
            password: md5(req.body.password)
        }
        let sql = "insert into admin set ?"

        db.query(sql, data, (err, result) => {
            if (err) throw err

            res.json({ massage: result.affectedRows + " has been inserted" })
        })

    })
}

const getInfo_admin = (link, valid) => {
    return app.get(link, (req, res) => {
        let data = null
        let sql = null
        if (Object(req.params) !== undefined) {
            data = { id_admin: req.params.id_admin }
            sql = "select * from admin where ?"
            db.query(sql, data, (err, result) => {
                if (err) throw err
                res.json({ count: result.count, result: result })
            })
        } else {
            sql = "select * from admin"
            db.query(sql, (err, result) => {
                if (err) throw err

                res.json({ count: result.count, result: result })
            })
        }
    })
}
const getInfo_barang = (link, valid) => {
    return app.get(link, (req, res) => {
        let data = { kode_barang: req.params.kode_barang }
        let sql = null
        if (data.kode_barang !== undefined) {
            sql = "select * from barang where ?"
            db.query(sql, data, (err, result) => {
                if (err) throw err
                res.json({ count: result.count, result: result })
            })
        } else {
            sql = "select * from barang"
            db.query(sql, (err, result) => {
                if (err) throw err
                res.json({ count: result.count, result: result })
            })
        }
    })
}
const getInfo_user = (link, valid) => {
    return app.get(link, (req, res) => {
        let data = { id_user: req.params.id_user }
        let sql = null
        if (data.id_user !== undefined) {
            sql = "select * from user where ?"
            db.query(sql, data, (err, result) => {
                if (err) throw err
                res.json({ count: result.count, result: result })
            })
        } else {
            sql = "select * from user"
            db.query(sql, (err, result) => {
                if (err) throw err
                res.json({ count: result.count, result: result })
            })
        }
    })
}

const edit_admin = (link, valid) => {
    return app.put(link, (req, res) => {
        let data = [{
            nama_admin: req.body.nama_admin,
            username: req.body.username
        }, {
            id_admin: req.body.id_admin
        }]
        for (x in data[0]) {
            if (data[0][x] === undefined) {
                delete data[0][x]
            }
        }
        if (data[0].password !== undefined) {
            data[0].password = md5(data[0].password)
        }
        let sql = "update admin set ? where ?"

        db.query(sql, data, (err, result) => {
            if (err) throw err
            res.json({ massage: result.affectedRows + " has been updated" })
        })
    })
}
const edit_barang = (link, valid) => {
    return app.put(link, upload_barang.single("image"), (req, res) => {
        let sql = null
        let data = null
        let kode_barang = req.body.kode_barang


        if (req.file) {
            sql = "select * from barang where ?"
            db.query(sql, { kode_barang: kode_barang }, (err, result) => {
                if (err) throw err
                let filename = result[0].image
                let dir = path.join(__dirname, "..", "file", "image", "barang", filename)
                fs.unlink(dir, (error) => {})
            })
        }
        data = [{
            nama_barang: req.body.nama_barang,
            harga: req.body.harga,
            stok: req.body.stok,
            deskripsi: req.body.deskripsi,
            image: req.file.filename
        }, {
            kode_barang: kode_barang
        }]
        for (x in data[0]) {
            if (data[0][x] === undefined) {
                delete data[0][x]
            }
        }
        sql = "update barang set ? where ?"

        db.query(sql, data, (err, result) => {
            if (err) throw err
            res.json({ massage: result.affectedRows + " has been updated" })
        })
    })
}
const edit_user = (link, valid) => {
    return app.put(link, upload_user.single("foto"), (req, res) => {
        let sql = null
        let data = null
        let id_user = req.body.id_user


        if (req.file) {
            sql = "select * from user where ?"
            db.query(sql, { id_user: id_user }, (err, result) => {
                if (err) throw err
                let filename = result[0].foto
                let dir = path.join(__dirname, "..", "file", "image", "user", filename)
                fs.unlink(dir, (error) => {})
            })
        }
        data = [{
            nama_user: req.body.nama_user,
            alamat: req.body.alamat,
            username: req.body.username,
            foto: req.file.filename
        }, {
            id_user: req.body.id_user
        }]
        for (x in data[0]) {
            if (data[0][x] === undefined) {
                delete data[0][x]
            }
        }
        if (data[0].password !== undefined) {
            data[0].password = md5(req.body.password)

        }
        sql = "update user set ? where ?"

        db.query(sql, data, (err, result) => {
            if (err) throw err
            res.json({ massage: result.affectedRows + " has been updated" })
        })
    })
}

const delete_admin = (link, valid) => {
    return app.delete(link, (req, res) => {
        let data = {
            id_admin: req.params.id_admin
        }
        let sql = "delete from admin where ?"
        db.query(sql, data, (err, result) => {
            if (err) throw err
            res.json({ massage: result.affectedRows + " has been deleted" })

        })
    })
}
const delete_barang = (link, valid) => {
    return app.delete(link, (req, res) => {
        let sql = null
        let data = {
            kode_barang: req.params.kode_barang
        }
        sql = "select * from barang where ?"
        db.query(sql, data, (err, result) => {
            let filename = result[0].image
            let dir = path.join(__dirname, "..", "file", "image", "barang", filename)
            fs.unlink(dir, (error) => {})
        })
        sql = "delete from barang where ?"

        db.query(sql, data, (err, result) => {
            if (err) throw err
            res.json({ massage: result.affectedRows + " has been deleted" })

        })
    })
}
const delete_user = (link, valid) => {
    return app.delete(link, (req, res) => {
        let sql = null
        let data = {
            id_user: req.params.id_user
        }
        sql = "select * from user where ?"
        db.query(sql, data, (err, result) => {
            let filename = result[0].foto
            let dir = path.join(__dirname, "..", "file", "image", "user", filename)
            fs.unlink(dir, (error) => {})
        })
        sql = "delete from user where ?"

        db.query(sql, data, (err, result) => {
            if (err) throw err
            res.json({ massage: result.affectedRows + " has been deleted" })

        })
    })
}

const input_transaksi = (link) => {
    return app.post(link, (req, res) => {
        let data, sql = null
        data = { kode_transaksi: req.body.kode_transaksi, id_user: req.body.id_user, tgl_transaksi: moment().format("YYYY-MM-DD HH:mm:ss") }
        sql = "insert into transaksi set ?"

        db.query(sql, data, (err, result) => {
            if (err) throw err

            sql = "select * from barang where ?"

            db.query(sql, { kode_barang: req.body.kode_barang }, (err, result) => {
                if (err) throw err
                data = { kode_transaksi: req.body.kode_transaksi, kode_barang: req.body.kode_barang, jumlah: req.body.jumlah, harga_beli: null }
                let stok = result[0].stok
                let jumlah = data.jumlah
                let kode_barang = data.kode_barang
                let harga = result[0].harga
                data.harga_beli = jumlah * harga
                sql = "insert into detail_transaksi set ?"
                db.query(sql, data, (err, result) => {
                    if (err) throw err
                    stok = stok - jumlah
                    sql = "update barang set ? where ?"

                    db.query(sql, [{ stok: stok }, { kode_barang: kode_barang }], (err, result) => {
                        if (err) throw err
                        res.json({ massage: result.affectedRows + " Has been Inserted" })
                    })
                })

            })
        })
    })
}

const Info_transaksi = (link) => {
    return app.get(link, (req, res) => {
        let data, sql = null
        data = { kode_transaksi: req.params.kode_transaksi }
        if (data.kode_transaksi !== undefined) {
            sql = "select u.nama_user,u.alamat,t.kode_transaksi,b.nama_barang,b.harga,dt.jumlah,dt.harga_beli,t.tgl_transaksi from transaksi t join detail_transaksi dt using(kode_transaksi) join user u using(id_user) join barang b using(kode_barang) where dt.?"
            db.query(sql, data, (err, result) => {
                if (err) throw err
                result[0].tgl_transaksi = moment().format("YYYY-MM-DD HH:mm:ss")
                res.json({ count: result.count, result: result })
            })
        } else {
            sql = "select u.nama_user,u.alamat,t.kode_transaksi,b.nama_barang,b.harga,dt.jumlah,dt.harga_beli,t.tgl_transaksi from transaksi t join detail_transaksi dt using(kode_transaksi) join user u using(id_user) join barang b using(kode_barang)"
            db.query(sql, (err, result) => {
                if (err) throw err
                result[0].tgl_transaksi = moment().format("YYYY-MM-DD HH:mm:ss")
                res.json({ count: result.count, result: result })
            })
        }
    })
}
const update_transaksi = (link) => {
    return app.put(link, (req, res) => {
        let sql = null
        let data = [{ kode_barang: req.body.kode_barang, jumlah: req.body.jumlah, harga_beli: null }, { kode_transaksi: req.body.kode_transaksi }]
        let kode_transaksi = data[1].kode_transaksi
        for (x in data[0]) {
            if (data[0][x] === undefined) {
                delete data[0][x]
            }
        }
        if (data[0].kode_barang === undefined) {
            let jumlah_baru = data[0].jumlah
            sql = "select * from detail_transaksi where ?"
            db.query(sql, { kode_transaksi: kode_transaksi }, (err, result) => {
                if (err) throw err
                let kode_barang = result[0].kode_barang
                let total_jumlah = null
                let jumlah_lama = result[0].jumlah
                sql = "select b.stok,b.harga from barang b join detail_transaksi dt using(kode_barang) where dt.?"
                db.query(sql, { kode_transaksi: kode_transaksi }, (err, result) => {
                    let stok = result[0].stok
                    let harga = result[0].harga
                    if (jumlah_baru > jumlah_lama) {
                        total_jumlah = jumlah_baru - jumlah_lama
                        sql = "update barang set ? where ?"
                        db.query(sql, [{ stok: stok - total_jumlah }, { kode_barang: kode_barang }], (err, result) => {
                            if (err) throw err
                        })
                        data[0].harga_beli = harga * jumlah_baru
                        data[0].kode_barang = kode_barang
                        sql = "update detail_transaksi set ? where ?"
                        db.query(sql, data, (err, result) => {
                            if (err) throw err
                            res.json({ massage: result.affectedRows + " has been updated" })
                        })
                    } else {
                        total_jumlah = jumlah_lama - jumlah_baru
                        sql = "update barang set ? where ?"
                        db.query(sql, [{ stok: stok + total_jumlah }, { kode_barang: kode_barang }], (err, result) => {
                            if (err) throw err
                        })
                        data[0].harga_beli = harga * jumlah_baru
                        data[0].kode_barang = kode_barang
                        sql = "update detail_transaksi set ? where ?"
                        db.query(sql, data, (err, result) => {
                            if (err) throw err
                            res.json({ massage: result.affectedRows + " has been updated" })
                        })
                    }
                })
            })

        } else if (data[0].jumlah === undefined) {
            sql = "select b.stok,dt.jumlah,b.kode_barang from detail_transaksi dt join barang b using(kode_barang) where ?"
            db.query(sql, data[1], (err, result) => {
                if (err) throw err
                let stok, kode_barang, harga = null
                stok = result[0].stok
                let jumlah = result[0].jumlah
                kode_barang = result[0].kode_barang
                let total_stok = stok + jumlah

                sql = "update barang set ? where ?"
                db.query(sql, [{ stok: total_stok }, { kode_barang: kode_barang }], (err, result) => {
                    if (err) throw err
                })
                sql = "select * from barang where ?"

                db.query(sql, { kode_barang: data[0].kode_barang }, (err, result) => {
                    if (err) throw err
                    stok = result[0].stok
                    kode_barang = data[0].kode_barang
                    harga = result[0].harga
                    data[0].harga_beli = jumlah * harga
                    data[0].jumlah = jumlah
                    sql = "update detail_transaksi set ? where ?"
                    db.query(sql, data, (err, result) => {
                        if (err) throw err
                        stok = stok - jumlah
                        sql = "update barang set ? where ?"

                        db.query(sql, [{ stok: stok }, { kode_barang: kode_barang }], (err, result) => {
                            if (err) throw err
                            res.json({ massage: result.affectedRows + " Has been updated" })
                        })
                    })

                })
            })
        } else {
            sql = "select b.stok,dt.jumlah,b.kode_barang from detail_transaksi dt join barang b using(kode_barang) where ?"
            db.query(sql, data[1], (err, result) => {
                if (err) throw err
                let stok = result[0].stok
                let jumlah = result[0].jumlah
                let kode_barang = result[0].kode_barang
                let total_stok = stok + jumlah

                sql = "update barang set ? where ?"
                db.query(sql, [{ stok: total_stok }, { kode_barang: kode_barang }], (err, result) => {
                    if (err) throw err
                })

            })
            sql = "select * from barang where ?"

            db.query(sql, { kode_barang: data[0].kode_barang }, (err, result) => {
                if (err) throw err
                let stok = result[0].stok
                let jumlah = data[0].jumlah
                let kode_barang = data[0].kode_barang
                let harga = result[0].harga
                data[0].harga_beli = jumlah * harga
                sql = "update detail_transaksi set ? where ?"
                db.query(sql, data, (err, result) => {
                    if (err) throw err
                    stok = stok - jumlah
                    sql = "update barang set ? where ?"

                    db.query(sql, [{ stok: stok }, { kode_barang: kode_barang }], (err, result) => {
                        if (err) throw err
                        res.json({ massage: result.affectedRows + " Has been updated" })
                    })
                })

            })
        }
    })
}
const delete_transaksi = (link) => {
    return app.delete(link, (req, res) => {
        let data = { kode_transaksi: req.body.kode_transaksi }
        let sql = null
        sql = "delete from transaksi where ?"
        db.query(sql, data, (err, result) => {
            if (err) throw err
            sql = "delete from detail_transaksi where ?"
            db.query(sql, data, (err, result) => {
                if (err) throw err
            })
            res.json({ massage: result.affectedRows + " Has been deleted" })
        })
    })
}

module.exports = { registrasi_admin, registrasi_barang, registrasi_user, getInfo_admin, getInfo_barang, getInfo_user, update_transaksi, edit_admin, edit_barang, edit_user, input_transaksi, Info_transaksi, delete_admin, delete_barang, delete_user, delete_transaksi }