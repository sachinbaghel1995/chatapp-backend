const { Router } = require("express");
const router = Router();
const groupController = require("../controllers/groupController");
const userAuthentication = require("../middleware/authMiddleware");

router.post(
  "/creategroup",
  userAuthentication.authenticate,
  groupController.createGroup
);
router.get(
  "/all/:userId",
  userAuthentication.authenticate,
  groupController.getAllGroups
);
router.post(
  "/:groupId/addUser/:userId",
  userAuthentication.authenticate,
  groupController.addUserToGroup
);
router.get(
  "/:groupId/members",
  userAuthentication.authenticate,
  groupController.getGroupMembers
);

module.exports = router;
