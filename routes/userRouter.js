const userController=require('../controllers/userController.js')
const router = require("express").Router()
const userAuthentication=require("../middleware/authMiddleware.js")

router.post("/adduser",userController.addUser)
router.post("/login",userController.login)
router.get('/user',userAuthentication.authenticate,userController.getUser)
router.get('/getallusers',userController.getAllUsers)

module.exports = router