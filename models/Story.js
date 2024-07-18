const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema(
    {
        title: { type: String, unique: true, required: true },
        content: { type: String, required: true },
        name: { type: String },
        img: { type: String },
        video: { type: String }
    },
    { timestamps: true }
);

module.exports = mongoose.model("story", StorySchema);
