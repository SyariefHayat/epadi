const mongoose = require("mongoose");

const FarmerSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    profilePicture: { type: String, default: "" },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ["Laki-laki", "Perempuan"], required: true },
    phone: { type: String, trim: true, match: /^[0-9]{10,15}$/, default: "" },

    postalCode: { type: String, trim: true, required: true },
    province: { type: String, trim: true, required: true },
    city: { type: String, trim: true, required: true },
    subDistrict: { type: String, trim: true, required: true },
    ward: { type: String, trim: true, required: true },
    address: { type: String, trim: true, required: true },

    landArea: { type: Number, min: 0, required: true },
    riceVariety: { type: String, trim: true, required: true },
    estimatedHarvest: { type: Number, min: 0, required: true },
    howLongBecomeFarmer: { type: String, trim: true, required: true },
    landOwnership: { type: String, trim: true, required: true },
    landLocation: { type: String, trim: true, required: true },
    plantingSeason: { type: String, trim: true, required: true },

    farmerGroup: { type: String, trim: true, required: true },
    farmerCardNumber: { type: String, trim: true, unique: true, sparse: true }
}, { timestamps: true });

module.exports = {
    Farmer: mongoose.model("Farmer", FarmerSchema),
};