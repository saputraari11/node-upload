const { app, md5, cryptr } = require("../main/main")
const { koneksi } = require("./../main/koneksi")
const db = koneksi("olshop")

const login_user = (link) => {
    return app.post(link, (req, res) => {
        let data = [{ username: req.body.username }, { password: md5(req.body.password) }]
        let sql = "select * from user where ?"

        db.query(sql, data, (err, result) => {
            if (err) throw err
            if (result.length > 0) {
                res.json({ massage: "login success", token: cryptr.encrypt(result[0].id_user), data: result })
            } else {
                res.json({ massage: "Username/Password not found!" })
            }
        })


    })
}
const login_admin = (link) => {
    return app.post(link, (req, res) => {
        let data = [{ username: req.body.username }, { password: md5(req.body.password) }]
        let sql = "select * from admin where ?"

        db.query(sql, data, (err, result) => {
            if (err) throw err
            if (result.length > 0) {
                res.json({ massage: "login success", token: cryptr.encrypt(result[0].id_admin), data: result })
            } else {
                res.json({ massage: "Username/Password not found!" })
            }
        })


    })
}
const validate_user = () => {
    return (req, res, next) => {
        if (!req.get("token")) {
            res.json({ massage: "Token not found!" })
        } else {
            let token = req.get("token")
            let data = { id_user: cryptr.decrypt(token) }

            let sql = "select * from user where ?"

            db.query(sql, data, (err, result) => {
                if (err) throw err

                if (result.length > 0) {
                    req.body.id_user = result[0].id_user
                    next()
                } else {
                    res.json({ massage: "Token not same!" })
                }
            })
        }
    }
}
const validate_admin = () => {
    return (req, res, next) => {
        if (!req.get("token")) {
            res.json({ massage: "Token not found!" })
        } else {
            let token = req.get("token")
            let data = { id_admin: cryptr.decrypt(token) }

            let sql = "select * from admin where ?"

            db.query(sql, data, (err, result) => {
                if (err) throw err

                if (result.length > 0) {
                    next()
                } else {
                    res.json({ massage: "Token not same!" })
                }
            })
        }
    }
}
module.exports = { login_user, db }