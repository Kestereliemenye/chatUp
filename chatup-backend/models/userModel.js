const mongoose = require("mongoose")
require("dotenv").config()
const mongoURI = process.env.MONGO_URI;
  
// connect to database
    const connect = mongoose.connect(mongoURI)

//to check for succesfull connection
connect.then(() => {
        console.log("Database connected");
        
}).catch((err) => {
    console.log("Database not connected");
    console.error(err)
})
    
//create schema
const loginSchema = new mongoose.Schema({
    //we need name password and email
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})
//create model
const createUser = mongoose.model(
    //name of collection
    "users", loginSchema)
module.exports = createUser