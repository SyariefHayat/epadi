const mongoose = require("mongoose");
const { Schema } = mongoose;

const BuyerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },

    fullName: { type: String, required: true, unique: true, trim: true },
    profilePicture: { type: String, default: "" },
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

    purchasingCapacity: { 
        type: Number, 
        required: true,
        min: 0,
        comment: "Kemampuan membeli dalam Rupiah"
    },

    createdBy:  { type: Schema.Types.ObjectId, ref: "User", index: true },
}, { timestamps: true, versionKey: false });

module.exports = {
    Buyer: mongoose.model("Buyer", BuyerSchema),
};