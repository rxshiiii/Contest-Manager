const mongoose = require('mongoose');
require('dotenv').config();

exports.connect = async () => {
    try {
        const dbURL = process.env.DB_URL;
        if(!dbURL){
            throw new Error("Check your .env file!");
        }
        await mongoose.connect(dbURL);
        console.log("Database connected successfully!");

    } catch (error) {
        console.error("Error in database connection",error);
        process.exit(1);
    }
};