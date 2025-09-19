const mongoose = require("mongoose");

const FarmerSchema = new mongoose.Schema({
    role: { type: String, enum: ["farmer", "buyer", "distributor", "investor"], required: true },
    NIK: { type: String, required: true, unique: true, trim: true, minlength: 16, maxlength: 16,    match: /^[0-9]{16}$/ },
    fullName: { type: String, required: true, trim: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ["Laki-laki", "Perempuan"], required: true },
    phone: { type: String, trim: true, match: /^[0-9]{10,15}$/ },

    postalCode: { type: String, required: true, trim: true },
    province: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    subDistrict: { type: String, required: true, trim: true },
    ward: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },

    landArea: { type: Number, required: true, min: 0 },
    riceVariety: { type: String, required: true, trim: true },
    estimatedHarvest: { type: Number, min: 0, required: true },
    howLongBecomeFarmer: { type: String, required: true, trim: true },
    landOwnership: { type: String, required: true, trim: true },
    landLocation: { type: String, trim: true },
    plantingSeason: { type: String, required: true, trim: true },
    
    farmerGroup: { type: String, trim: true },
    farmerCardNumber: { type: String, trim: true, unique: true, sparse: true }
}, { timestamps: true });

module.exports = {
    Farmer: mongoose.model("Farmer", FarmerSchema),
}