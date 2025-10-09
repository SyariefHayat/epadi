const mongoose = require("mongoose");
const { Schema } = mongoose;

const FarmerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },

    NIK: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 16,
        maxlength: 16,
        match: /^[0-9]{16}$/,
        sparse: true,
    },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ["Laki-laki", "Perempuan"] },
    phone: { type: String, trim: true, match: /^[0-9]{10,15}$/, default: "" },

    provinceCode: { type: String, trim: true, index: true },
    province: { type: String, trim: true, index: true },
    postalCode: { type: String, trim: true, index: true },
    cityCode: { type: String, trim: true },
    city: { type: String, trim: true },
    subDistrictCode: { type: String, trim: true },
    subDistrict: { type: String, trim: true },
    ward: { type: String, trim: true },
    wardCode: { type: String, trim: true },
    address: { type: String, trim: true },

    landArea: { type: Number, min: 0 },
    riceVariety: { type: String, trim: true },
    estimatedHarvest: { type: Number, min: 0 },
    howLongBecomeFarmer: { type: String, trim: true },
    landOwnership: { type: String, trim: true },
    landLocation: { type: String, trim: true },
    plantingSeason: { type: String, trim: true },

    farmerGroup: { type: String, trim: true },
    farmerCardNumber: { type: String, trim: true, unique: true, sparse: true },
    createdBy:  { type: Schema.Types.ObjectId, ref: "User", index: true },
}, { timestamps: true, versionKey: false });

module.exports = {
    Farmer: mongoose.model("Farmer", FarmerSchema),
};