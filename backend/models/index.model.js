const mongoose = require("mongoose");

const FarmerSchema = new mongoose.Schema(
    {
        NIK: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 16,
            maxlength: 16,
            match: /^[0-9]{16}$/ // validasi angka 16 digit
        },
            fullName: {
            type: String,
            required: true,
            trim: true
        },
        dateOfBirth: {
        type: Date,
        required: true
        },
        gender: {
        type: String,
        enum: ["Laki-laki", "Perempuan"],
        required: true
        },
        phone: {
        type: String,
        trim: true,
        match: /^[0-9]{10,15}$/ // opsional validasi nomor HP
        },
        address: {
        type: String,
        required: true,
        trim: true
        },
        village: {
        type: String,
        required: true,
        trim: true
        },
        district: {
        type: String,
        required: true,
        trim: true
        },
        province: {
        type: String,
        required: true,
        trim: true
        },

        // Data pertanian
        landArea: {
        type: Number, // hektar
        required: true,
        min: 0
        },
        landLocation: {
        type: String,
        trim: true
        },
        riceVariety: {
        type: String, // contoh: IR64, Inpari 32, Ciherang
        required: true
        },
        plantingSeason: {
        type: String, // contoh: MT1, MT2, MT3
        required: true
        },
        harvestEstimate: {
        type: Number, // ton per hektar
        min: 0
        },

        // Keanggotaan
        farmerGroup: {
        type: String, // nama kelompok tani
        trim: true
        },
        farmerCardNumber: {
        type: String, // nomor kartu tani (jika ada)
        trim: true,
        unique: true,
        sparse: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Farmer", FarmerSchema);