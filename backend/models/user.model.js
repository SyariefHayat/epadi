const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
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
    
    fullName: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    token: { type: String }
});

module.exports = {
    User: mongoose.model("User", UserSchema),
};