const userController=require('../controllers/userController.js')
const router = require("express").Router()

router.post("/adduser",userController.addUser)


module.exports = router