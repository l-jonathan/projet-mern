const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://" + process.env.DB_USER_PASS + "@cluster0.dui5l.mongodb.net/mern-project")
  .then(() => console.log("connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));
