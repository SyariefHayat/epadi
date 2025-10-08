const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true, index: true },
    phone: { type: String, trim: true, match: /^[0-9]{10,15}$/, index: true },
    fullName: { type: String, required: true, unique: true, trim: true },

    role: {
        type: String,
        enum: ["farmer", "buyer", "distributor", "investor", "operator", "admin"],
        default: "farmer",
        index: true
    },

    email: {
        type: String, 
        trim: true, 
        required: function() {
            return this.role === "operator" || this.role === "admin"
        },
        index: true
    },

    profilePicture: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
}, { timeStamps: true, versionKey: false });

UserSchema.pre("validate", function(next) {
    if (!this.email && !this.phone) {
        this.invalidate("email", "Either email or phone is required");
        this.invalidate("phone", "Either email or phone is required");
    }
    next();
});

module.exports = {
    User: mongoose.model("User", UserSchema),
};