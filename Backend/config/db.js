const mongoose = require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
const connectDB = async () => {
    try{
        const connection= await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Connected: ${connection.connection.host}`);
    }
catch(error)
{
    console.log(`Error: ${error.message}`);
    process.exit();
}
}

module.exports = connectDB;