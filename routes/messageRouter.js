const { Router } = require("express");
const router = Router();
const messageController = require("../controllers/messageController");
const userAuthentication = require("../middleware/authMiddleware");

router.post("/message",userAuthentication.authenticate, messageController.postMessage);

module.exports = router;
