const db = require("../models");
const Message = db.messages;

const postMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message content is missing" });
    }

    const userId = req.user.id; // Ensure req.user has user details from authentication
    const response = await Message.create({ text: message, userId });
    
    return res.status(201).json({ message: "Message created successfully", data: response });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getMessages = async (req, res) => {
  try {
    const userId = req.user.id; 

    const messages = await Message.findAll({
      where: { userId }, 
      attributes: ['id', 'text', 'createdAt'], 
      order: [['createdAt', 'DESC']], 
    });

    return res.status(200).json({ messages });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  postMessage,
  getMessages
};
