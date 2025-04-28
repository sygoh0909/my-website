const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/sy");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error: "));
db.once("open", () => {
    console.log("Connected to MongoDB!");
});

app.get("/api/data", async(req, res) => {
    try{
        const data = await db.collection("skills").find().toArray();
        res.json(data);
    }
    catch (err) {
        res.status(500).json({error: "Failed to fetch data"});
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});