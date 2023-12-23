const db = require("../models");
const Message = db.messages;
const Image=db.images
const multer = require("multer");
const path = require("path");

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

const postImage = async (req, res) => {
  try {
   
    const { groupId } = req.params;

    
    const userId = req.user.id; // Ensure req.user has user details from authentication
    const response = await Image.create({
      image:req.file.path,
      userId,
      groupId,
    });

    return res
      .status(201)
      .json({ message: "Message created successfully", data: response });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: "10000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("image");

const getImage = async (req, res) => {
  try {
    const { groupId } = req.params;

    // Fetch all images for a specific group
    const images = await db.images.findAll({
      where: { groupId },
      attributes: ['id', 'image'], // Define the attributes you want to retrieve
    });

    return res.status(200).json({ images });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  postMessage,
  getMessages,
  postImage,
  upload,
  getImage
};
