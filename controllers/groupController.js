const { where } = require("sequelize");
const db = require("../models");
const Group = db.groups;
const User = db.users;

async function createGroup(req, res) {
  try {
    const { name } = req.body;
    const userId = req.user.id;
    const adminId = req.user.id;

    const newGroup = await Group.create({ name, userId ,adminId});
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await newGroup.addUser(user);
    res
      .status(201)
      .json({ message: "Group created successfully", group: newGroup });
  } catch (error) {
    res.status(500).json({ error: "Failed to create group" });
  }
}

async function getAllGroups(req, res) {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const groups = await user.getGroups();
    res.status(200).json(groups);
  } catch (error) {
    console.error("Error fetching user groups:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function addUserToGroup(req, res) {
  try {
    const { groupId, userId } = req.params;

    const user = await User.findByPk(userId);
    const group = await Group.findByPk(groupId);

    if (!user || !group) {
      return res.status(404).json({ error: "User or Group not found" });
    }

    await group.addUser(user);
    res.status(200).json({ message: "User added to group successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add user to group" });
  }
}

async function getGroupMembers(req, res) {
  try {
    const { groupId } = req.params;
    const userId = req.user.id;
    const group = await Group.findByPk(groupId, {
      include: {
        model: User,
        attributes: ["id", "name", "email"],
      },
    });

    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    console.log("Fetched Group:", group);
    console.log("Associated users:", group.users);

    const members = group.users;

    res.status(200).json({ members,isAdmin:group.adminId===userId , adminId:group.adminId });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch group members" });
  }
}

module.exports = {
  createGroup,
  getAllGroups,
  addUserToGroup,
  getGroupMembers,
};
