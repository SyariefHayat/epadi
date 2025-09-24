const { SUC, ERR } = require("../utils/response");
const { Farmer, User } = require("../models/index.model");

const FarmerBiodata = async (req, res) => {
    const profileImgFile = req.file;
    const profileImage = profileImgFile ? `${profileImgFile.filename}` : null;

    const {
        user,
        dateOfBirth,
        gender,
        phone,
        postalCode,
        province,
        city,
        subDistrict,
        ward,
        address,
        landArea,
        riceVariety,
        estimatedHarvest,
        howLongBecomeFarmer,
        landOwnership,
        landLocation,
        plantingSeason,
        farmerGroup,
        farmerCardNumber
    } = req.body;

    try {
        const requiredFields = {
            user,
            dateOfBirth,
            gender,
            postalCode,
            province,
            city,
            subDistrict,
            ward,
            address,
            landArea,
            riceVariety,
            estimatedHarvest,
            howLongBecomeFarmer,
            landOwnership,
            landLocation,
            plantingSeason,
            farmerGroup
        };

        const emptyFields = Object.entries(requiredFields)
            .filter(([key, value]) => value === undefined || value === null || value === "")
            .map(([key]) => key);

        if (emptyFields.length > 0) return ERR(res, 400, `Field berikut wajib diisi: ${emptyFields.join(", ")}`);

        if (!["Laki-laki", "Perempuan"].includes(gender)) return ERR(res, 400, "Jenis kelamin harus 'Laki-laki' atau 'Perempuan'");

        if (landArea < 0) return ERR(res, 400, "Luas lahan tidak boleh negatif");

        if (estimatedHarvest < 0) return ERR(res, 400, "Estimasi panen tidak boleh negatif");

        const birthDate = new Date(dateOfBirth);
        if (isNaN(birthDate.getTime())) return ERR(res, 400, "Format tanggal lahir tidak valid");

        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (age < 17 || (age === 17 && monthDiff < 0)) return ERR(res, 400, "Umur minimal 17 tahun");

        if (!user) return ERR(res, 401, "User tidak terautentikasi");

        const existingUser = await User.findById(user);
        if (!existingUser) return ERR(res, 404, "User tidak ditemukan");

        const existingFarmer = await Farmer.findOne({ user });
        if (existingFarmer) return ERR(res, 409, "Data biodata petani sudah ada untuk user ini");

        if (farmerCardNumber) {
            const existingCard = await Farmer.findOne({ 
                farmerCardNumber: farmerCardNumber.trim() 
            });
            if (existingCard) {
                return ERR(res, 409, "Nomor kartu tani sudah digunakan");
            }
        }

        const existingPhone = await Farmer.findOne({ phone: phone.trim() });
        if (existingPhone) return ERR(res, 409, "Nomor HP sudah digunakan");

        const farmerData = {
            user,
            profilePicture: profileImage,
            dateOfBirth: birthDate,
            gender: gender.trim(),
            phone: phone.trim(),
            postalCode: postalCode.trim(),
            province: province.trim(),
            city: city.trim(),
            subDistrict: subDistrict.trim(),
            ward: ward.trim(),
            address: address.trim(),
            landArea: parseFloat(landArea),
            riceVariety: riceVariety.trim(),
            estimatedHarvest: parseFloat(estimatedHarvest),
            howLongBecomeFarmer: howLongBecomeFarmer.trim(),
            landOwnership: landOwnership.trim(),
            landLocation: landLocation.trim(),
            plantingSeason: plantingSeason.trim(),
            farmerGroup: farmerGroup.trim(),
        };

        if (farmerCardNumber && farmerCardNumber.trim()) farmerData.farmerCardNumber = farmerCardNumber.trim();

        const newFarmer = new Farmer(farmerData);
        await newFarmer.save();

        await newFarmer.populate('user', 'fullName email');

        return SUC(res, 201, "Biodata petani berhasil disimpan", newFarmer);
    } catch (error) {
        console.error("Error in FarmerBiodata:", error);

        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return ERR(res, 400, `Validation Error: ${validationErrors.join(', ')}`);
        }

        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return ERR(res, 409, `${field} sudah digunakan`);
        }

        if (error.name === 'CastError') return ERR(res, 400, "Invalid ID format");

        return ERR(res, 500, "Internal Server Error");
    }
};

module.exports = {
    FarmerBiodata,
}