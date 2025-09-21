require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

// const path = require("path");
const routes = require("./routes/index.route")

const app = express();
const PORT = process.env.API_PORT || 8000;
const MONGO_URL = process.env.MONGO_URL;

app.use(cors());
app.use(express.json());
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose.connect(MONGO_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => {
        console.error("Failed connect to MongoDB:", error);
        process.exit(1);
    });

app.use(routes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});

module.exports = app;