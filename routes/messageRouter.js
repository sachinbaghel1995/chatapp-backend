const { Router } = require("express");
const router = Router();
const messageController = require("../controllers/messageController");
const userAuthentication = require("../middleware/authMiddleware");

router.post("/message/:groupId",userAuthentication.authenticate, messageController.postMessage);
router.get("/getmessage/:groupId", userAuthentication.authenticate, messageController.getMessages);

module.exports = router;
