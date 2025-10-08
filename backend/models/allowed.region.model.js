const mongoose = require("mongoose");

const AllowedRegionSchema = new mongoose.Schema({
    regionCode: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    regionName: {
        type: String,
        required: true,
        trim: true,
    },
    level: {
        type: String,
        enum: ["province", "regency", "district", "village"],
        required: true,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const AllowedRegion = mongoose.model("AllowedRegion", AllowedRegionSchema);

module.exports = AllowedRegion;