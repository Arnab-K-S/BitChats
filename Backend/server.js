const express=require('express');
const dotenv=require('dotenv');
// const { chats } = require('./data/data');
const connectDB = require('./config/db');
const app = express();
const port = process.env.PORT || 3000;

const userRoutes=require('./routes/userRoutes')
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

const {notFound, errorHandler} = require('./middleware/errorMiddleware');
const cors = require('cors');
dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());
app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes)
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);


app.listen(port, () => {
  console.log(`ChatApp Server listening at http://localhost:${port}`);
});