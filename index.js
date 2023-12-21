// const express = require("express");
// const cors = require("cors");

// const app = express();

// var corOptions = {
//   origin: "http://127.0.0.1:8001",
// };

// app.use(cors());

// app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.json({ message: "hello" });
// });
// console.log("sachin");

// const userRouter = require("./routes/userRouter.js");
// app.use("/api/users", userRouter);

// const messageRouter=require("./routes/messageRouter.js")
// app.use("/api/messages",messageRouter)

// const groupRouter=require("./routes/groupRouter.js")
// app.use("/api/groups",groupRouter)

// const PORT = process.env.PORT || 8002;

// app.listen(PORT, () => {
//   console.log(`server is running on port ${PORT}`);
// });


// server.js

const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:3000',
    // methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'hello' });
});

// Your other routes...
const userRouter = require('./routes/userRouter.js');
app.use('/api/users', userRouter);

const messageRouter = require('./routes/messageRouter.js');
app.use('/api/messages', messageRouter);

const groupRouter = require('./routes/groupRouter.js');
app.use('/api/groups', groupRouter);

// Socket.IO handling
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle incoming messages
  socket.on('message', (data) => {
    console.log('Received message:', data);

    // Broadcast the received message to all connected clients
    io.emit('message', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 8002;
server.listen(PORT, () => {
  console.log(`Server and Socket.IO running on port ${PORT}`);
});
