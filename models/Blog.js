const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        title: { type: String, required, unique: true },
        content: { type: String, required },
        img: { type: String },
        category: { type: String },
        author: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("post", PostSchema);
