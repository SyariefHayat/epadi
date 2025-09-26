const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: true, unique: true, trim: true },
    role: { 
        type: String, 
        enum: ["farmer", "buyer", "distributor", "investor"], 
        default: "farmer" 
    },
    NIK: {
        type: String, 
        required: true, 
        unique: true, 
        trim: true, 
        minlength: 16, 
        maxlength: 16, 
        match: /^[0-9]{16}$/ 
    },
});

module.exports = {
    User: mongoose.model("User", UserSchema),
};