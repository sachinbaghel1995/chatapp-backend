const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.users;

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    const decodedToken = jwt.verify(token, "SECRETKEY");

    const foundUser = await User.findByPk(decodedToken.id); // Ensure the token payload carries the user ID

    if (!foundUser) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = foundUser;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = {
  authenticate
};
