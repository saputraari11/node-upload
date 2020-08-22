let { mysql } = require("./main")
let koneksi = (data) => {

    const con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: data
    })
    con.connect(error => {
        if (error) {
            console.log(error.message)
        } else {
            console.log("Connected")
        }
    })
    return con
}

module.exports = { koneksi }