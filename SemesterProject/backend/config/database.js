const mongoose = require("mongoose");
const env = require("dotenv");
env.config();

const connectDatabase = () => {
    mongoose
      .connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((data) => {
        console.log(`Mongodb connected with server: ${data.connection.host}`);
      })
      .catch((error) => {
        console.error(`Error connecting to MongoDB: ${error}`);
      });
  };
  

module.exports = connectDatabase;