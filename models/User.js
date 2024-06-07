const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        password: { type: String }
    },
    { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
