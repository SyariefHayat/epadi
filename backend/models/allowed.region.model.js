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
        enum: ["provinsi", "kabupaten", "kecamatan", "desa"],
        required: true,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

module.exports = {
    AllowedRegion: mongoose.model("AllowedRegion", AllowedRegionSchema),
};