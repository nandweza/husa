const mongoose = require("mongoose");

const SectorSchema = new mongoose.Schema(
    {
        title: { type: String, unique: true, required: true },
        content: { type: String, required: true },
        img: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("sector", SectorSchema);
