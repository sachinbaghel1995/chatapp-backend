const db = require("../models");
const Message = db.messages;

const postMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { groupId } = req.params;

    if (!message) {
      return res.status(400).json({ error: "Message content is missing" });
    }

    const userId = req.user.id; // Ensure req.user has user details from authentication
    const response = await Message.create({ text: message, userId, groupId });

    return res
      .status(201)
      .json({ message: "Message created successfully", data: response });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getMessages = async (req, res) => {
  try {
    const userId = req.user.id;
    const { groupId } = req.params;
    const lastMessageTimestamp = req.query.lastMessageTimestamp; // Retrieve last fetched message timestamp from query params

    // let whereClause = { userId };
    if (lastMessageTimestamp) {
      whereClause = {
        // userId,
        createdAt: { [Op.gt]: new Date(lastMessageTimestamp) }, // Retrieve messages created after the last fetched message
      };
    }

    const messages = await Message.findAll({
      where: { groupId },
      attributes: ["id", "text", "createdAt"],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({ messages });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  postMessage,
  getMessages,
};
