const { registrasi_admin, registrasi_barang, registrasi_user, getInfo_admin, getInfo_barang, getInfo_user, edit_admin, edit_barang, edit_user, delete_admin, delete_barang, delete_transaksi, delete_user, input_transaksi, Info_transaksi, update_transaksi } = require("./main/function")
const { login_user } = require("./auth/api")
const { port } = require("./main/main")

delete_admin("/admin/:id_admin")

port()