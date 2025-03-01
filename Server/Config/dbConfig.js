const mongoose = require("mongoose");

// Connection logic
mongoose.connect(process.env.CONN_STRING);

// Connection state
const db = mongoose.connection;

// DB Connection
db.on("connected", () => {
  console.log("Connected to DB Successfully");
});

db.on("err", () => {
  console.log("Connection to DB Failed");
});

module.exports = db;
