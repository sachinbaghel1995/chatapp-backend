const express = require("express");
const cors = require("cors");

const app = express();

var corOptions = {
  origin: "http://127.0.0.1:8001",
};

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "hello" });
});
console.log("sachin");

const userRouter = require("./routes/userRouter.js");
app.use("/api/users", userRouter);

const messageRouter=require("./routes/messageRouter.js")
app.use("/api/messages",messageRouter)
const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
