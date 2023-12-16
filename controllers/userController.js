const { where } = require("sequelize");
const db = require("../models");
const bcrypt = require("bcrypt");
const User = db.users;

function isstringinvalid(string) {
  if (string == undefined || string.length === 0) {
    return true;
  } else {
    return false;
  }
}

const addUser = async (req, res) => {
  try {
    const { name, email,phone, password, } = req.body;
    if (
      isstringinvalid(name) ||
      isstringinvalid(email) ||
      isstringinvalid(password)||
      isstringinvalid(password)
    ) {
      return res
        .status(400)
        .json({ err: "Bad parameters . Something is missing" });
    }
    const saltrounds = 10;
    bcrypt.hash(password, saltrounds, async (err, hash) => {
      console.log(err);
      await User.create({ name, email, phone, password: hash }); // hash password
      res.status(201).json({ message: "Successfuly create new user" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = {
  addUser,
};
