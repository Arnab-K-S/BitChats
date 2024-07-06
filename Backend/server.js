const express=require('express');
const dotenv=require('dotenv');
// const { chats } = require('./data/data');
const connectDB = require('./config/db');
const app = express();
const port = process.env.PORT || 3000;
const userRoutes=require('./routes/userRoutes')
const {notFound, errorHandler} = require('./middleware/errorMiddleware');

dotenv.config();
connectDB();

app.use(express.json());
app.use(notFound);
app.use(errorHandler);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/user',userRoutes)


app.listen(port, () => {
  console.log(`ChatApp Server listening at http://localhost:${port}`);
});