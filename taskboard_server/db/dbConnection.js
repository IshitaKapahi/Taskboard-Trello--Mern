const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const connectDb = asyncHandler(async () => {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log("Connection is established", connect.connection.host, connect.connection.name);

});

module.exports = connectDb;