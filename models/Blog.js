const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        content: { type: String, required: true },
        img: { type: String },
        category: { type: String },
        author: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("post", PostSchema);
