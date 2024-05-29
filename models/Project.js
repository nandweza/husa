const mongoose = require("mongoose");

const SectorSchema = new mongoose.Schema(
    {
        title: { type: String, unique: true, required },
        content: { type: String, required },
        img: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("sector", SectorSchema);
