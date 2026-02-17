const { SUC, ERR } = require("../utils/response");
const { User } = require("../models/user.model");
const { Farmer } = require("../models/farmer.model");
const { Buyer } = require("../models/buyer.model");

// const FarmerBiodata = async (req, res) => {
//     const profileImgFile = req.file;
//     const profilePhoto = profileImgFile ? `${profileImgFile.filename}` : null;

//     const { 
//         user,
//         nik,
//         fullName,
//         dateOfBirth, 
//         gender, 
//         phone, 
//         postalCode, 
//         province, 
//         city, 
//         subDistrict, 
//         ward, 
//         address, 
//         landArea, 
//         riceVariety, 
//         estimatedHarvest, 
//         howLongBecomeFarmer,
//         landOwnership,
//         landLocation,
//         plantingSeason,
//         farmerGroup,
//         farmerCardNumber
//     } = req.body;

//     try {
//         const requiredFields = {
//             user,
//             nik,
//             fullName,
//             dateOfBirth,
//             gender,
//             postalCode,
//             province,
//             city,
//             subDistrict,
//             ward,
//             address,
//             landArea,
//             riceVariety,
//             estimatedHarvest,
//             howLongBecomeFarmer,
//             landOwnership,
//             landLocation,
//             plantingSeason,
//             farmerGroup
//         };

//         const emptyFields = Object.entries(requiredFields)
//             .filter(([key, value]) => value === undefined || value === null || value === "")
//             .map(([key]) => key);

//         if (emptyFields.length > 0) {
//             return ERR(res, 400, `Field berikut wajib diisi: ${emptyFields.join(", ")}`);
//         }

//         if (!["Laki-laki", "Perempuan"].includes(gender)) {
//             return ERR(res, 400, "Jenis kelamin harus 'Laki-laki' atau 'Perempuan'");
//         }

//         if (landArea < 0) return ERR(res, 400, "Luas lahan tidak boleh negatif");
//         if (estimatedHarvest < 0) return ERR(res, 400, "Estimasi panen tidak boleh negatif");

//         const birthDate = new Date(dateOfBirth);
//         if (isNaN(birthDate.getTime())) {
//             return ERR(res, 400, "Format tanggal lahir tidak valid");
//         }

//         const today = new Date();
//         const age = today.getFullYear() - birthDate.getFullYear();
//         const monthDiff = today.getMonth() - birthDate.getMonth();

//         if (age < 17 || (age === 17 && monthDiff < 0)) {
//             return ERR(res, 400, "Umur minimal 17 tahun");
//         }

//         const existingUser = await User.findById(user);
//         if (!existingUser) return ERR(res, 404, "User tidak ditemukan");

//         const existingFarmer = await Farmer.findOne({ user });
//         if (existingFarmer) {
//             return ERR(res, 409, "Data biodata petani sudah ada untuk user ini");
//         }

//         if (phone && phone.trim()) {
//             const existingPhone = await Farmer.findOne({ phone: phone.trim() });
//             if (existingPhone) return ERR(res, 409, "Nomor HP sudah digunakan");
//         }

//         if (farmerCardNumber && farmerCardNumber.trim()) {
//             const existingCard = await Farmer.findOne({ 
//                 farmerCardNumber: farmerCardNumber.trim() 
//             });
//             if (existingCard) {
//                 return ERR(res, 409, "Nomor kartu tani sudah digunakan");
//             }
//         }

//         const farmerData = {
//             user,
//             nik: nik.trim(),
//             fullName: fullName.trim(),
//             profilePhoto: profilePhoto,
//             dateOfBirth: birthDate,
//             gender: gender.trim(),
//             postalCode: postalCode.trim(),
//             province: province.trim(),
//             city: city.trim(),
//             subDistrict: subDistrict.trim(),
//             ward: ward.trim(),
//             address: address.trim(),
//             landArea: parseFloat(landArea),
//             riceVariety: riceVariety.trim(),
//             estimatedHarvest: parseFloat(estimatedHarvest),
//             howLongBecomeFarmer: howLongBecomeFarmer.trim(),
//             landOwnership: landOwnership.trim(),
//             landLocation: landLocation.trim(),
//             plantingSeason: plantingSeason.trim(),
//             farmerGroup: farmerGroup.trim(),
//         };

//         if (phone && phone.trim()) farmerData.phone = phone.trim();
//         if (farmerCardNumber && farmerCardNumber.trim()) {
//             farmerData.farmerCardNumber = farmerCardNumber.trim();
//         }

//         const newFarmer = new Farmer(farmerData);
//         await newFarmer.save();

//         await newFarmer.populate('user', 'fullName email');

//         return SUC(res, 201, "Biodata petani berhasil disimpan", newFarmer);
//     } catch (error) {
//         console.error("Error in FarmerBiodata:", error);

//         if (error.name === 'ValidationError') {
//             const validationErrors = Object.values(error.errors).map(err => err.message);
//             return ERR(res, 400, `Validation Error: ${validationErrors.join(', ')}`);
//         }

//         if (error.code === 11000) {
//             const field = Object.keys(error.keyPattern)[0];
//             return ERR(res, 409, `${field} sudah digunakan`);
//         }

//         if (error.name === 'CastError') {
//             return ERR(res, 400, "Invalid ID format");
//         }

//         return ERR(res, 500, "Internal Server Error");
//     }
// };

const getFarmerBiodata = async (req, res) => {
    try {
        const { userId } = req.params;

        const farmer = await Farmer.findOne({ user: userId }).populate('user', 'fullName email NIK');

        if (!farmer) {
            return ERR(res, 404, "Biodata petani tidak ditemukan");
        }

        return SUC(res, 200, "Biodata berhasil diambil", farmer);
    } catch (error) {
        console.error("Error in getFarmerBiodata:", error);

        if (error.name === 'CastError') {
            return ERR(res, 400, "Invalid user ID format");
        }

        return ERR(res, 500, "Internal Server Error");
    }
};

const getDashboardSummary = async (req, res) => {
    try {
        const [farmers, distributors, investors, buyers] = await Promise.all([
            Farmer.find().lean(),
            User.find({ role: "distributor" }),
            User.find({ role: "investor" }),
            User.find({ role: "buyer" }),
        ]);

        return SUC(res, 200, {
            farmers,
            distributors,
            investors,
            buyers
        }, "Success getting data");
    } catch (error) {
        console.error(error);
        return ERR(res, 500, "Error getting data");
    }
};

const getAllFarmers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const skip = (page - 1) * limit;
        const { search, province, city, subDistrict, ward } = req.query;

        const filter = {};

        if (search && search.trim()) {
            const regex = new RegExp(search.trim(), 'i');
            filter.$or = [
                { NIK: { $regex: regex } },
                { fullName: { $regex: regex } }
            ];
        }

        if (province) filter.province = new RegExp(`^${province}$`, 'i');
        if (city) filter.city = new RegExp(`^${city}$`, 'i');
        if (subDistrict) filter.subDistrict = new RegExp(`^${subDistrict}$`, 'i');
        if (ward) filter.ward = new RegExp(`^${ward}$`, 'i');

        const totalFarmers = await Farmer.countDocuments(filter);

        const farmers = await Farmer.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate("userId", "fullName email phone role")
            .lean();

        return SUC(res, 200, {
            data: farmers,
            pagination: {
                total: totalFarmers,
                page,
                limit,
                totalPages: Math.ceil(totalFarmers / limit)
            }
        }, "Success getting farmers");

    } catch (error) {
        console.error(error);
        return ERR(res, 500, "Error getting data");
    }
};

const getAllBuyers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const skip = (page - 1) * limit;

        const totalBuyers = await Buyer.countDocuments();

        const buyers = await Buyer.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate("userId", "fullName email phone role")
            .lean();

        return SUC(res, 200, {
            data: buyers,
            pagination: {
                total: totalBuyers,
                page,
                limit,
                totalPages: Math.ceil(totalBuyers / limit)
            }
        }, "Success getting buyers");

    } catch (error) {
        console.error(error);
        return ERR(res, 500, "Error getting data");
    }
};

module.exports = {
    getFarmerBiodata,
    getDashboardSummary,
    getAllFarmers,
    getAllBuyers,
};