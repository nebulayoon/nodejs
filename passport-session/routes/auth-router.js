const express = require("express")
const router = express.Router()
const userCtrl = require("../controllers/userCtrl")

router.post('/login', userCtrl.userLogin)
router.post('/logout', userCtrl.userLogout)
router.get('/loginuser', userCtrl.userInfo)

module.exports = router