const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema(
    {
        content: { type: String, required: true },
        img: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("gallery", GallerySchema);
