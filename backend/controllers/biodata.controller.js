const { SUC, ERR } = require("../utils/response");
const { User } = require("../models/user.model");
const { Farmer } = require("../models/farmer.model");

const FarmerBiodata = async (req, res) => {
    const profileImgFile = req.file;
    const profileImage = profileImgFile ? `${profileImgFile.filename}` : null;

    const {
        fullName,
        NIK,
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
        farmerCardNumber,
        createdBy
    } = req.body;

    try {
        const requiredFields = {
            fullName,
            NIK,
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
            farmerGroup,
            createdBy
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

        const existingUser = await User.findById(createdBy);
        if (!existingUser) return ERR(res, 404, "User tidak ditemukan");

        const existingFarmer = await Farmer.findOne({ NIK });
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
            fullName,
            NIK,
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

const getFarmerBiodata = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) return ERR(res, 400, "User id wajib diisi");

        const farmer = await Farmer.findOne({ user: userId })
            .populate("user", "fullName email")
            .lean(false);

        if (!farmer) return ERR(res, 404, "Biodata farmer tidak ditemukan");

        return SUC(res, 200, farmer, "Success getting data");
    } catch (error) {
        console.error("GetFarmerByUser error:", error);
        return ERR(res, 500, "Internal Server Error");
    }
};

const isBlank = (v) => v === undefined || v === null || (typeof v === "string" && v.trim() === "");
const toTrimOrNull = (v) => (isBlank(v) ? undefined : String(v).trim());
const toNumberOrUndefined = (v) => {
    if (isBlank(v)) return undefined;
    const n = Number(v);
    return Number.isFinite(n) ? n : undefined;
};

const toDateOrUndefined = (v) => {
    if (isBlank(v)) return undefined;
    const d = new Date(v);
    return isNaN(d.getTime()) ? undefined : d;
};

const mapGender = (v) => {
    if (isBlank(v)) return undefined;
    const raw = String(v).trim();
    if (raw === "L" || raw === "P") return raw;
    if (/^laki/i.test(raw)) return "L";
    if (/^perem/i.test(raw)) return "P";
    return raw;
};

const updateFarmerBiodata = async (req, res) => {
    const { farmerId } = req.params;

    try {
        const profileImgFile = req.file;
        const profileImage = profileImgFile ? profileImgFile.filename : undefined;

        const {
            NIK,
            fullName,

            dateOfBirth,
            gender,
            phone,

            postalCode,
            province,
            provinceCode,
            city,
            cityCode,
            subDistrict,
            subDistrictCode,
            ward,
            wardCode,
            address,

            landArea,
            riceVariety,
            estimatedHarvest,
            howLongBecomeFarmer,
            landOwnership,
            landLocation,
            plantingSeason,
            farmerGroup,
            farmerCardNumber,
        } = req.body;

        const $set = {};

        if (!isBlank(NIK)) $set.NIK = String(NIK).trim();
        if (!isBlank(fullName)) $set.fullName = String(fullName).trim();

        if (!isBlank(profileImage)) {
            $set.profilePicture = profileImage;
        }

        const dob = toDateOrUndefined(dateOfBirth);
        if (dob) $set.dateOfBirth = dob;

        const g = mapGender(gender);
        if (g) $set.gender = g;

        if (!isBlank(phone)) $set.phone = String(phone).trim();

        if (!isBlank(postalCode)) $set.postalCode = String(postalCode).trim();

        const _province = toTrimOrNull(province);
        if (_province) $set.province = _province;
        const _provinceCode = toTrimOrNull(provinceCode);
        if (_provinceCode) $set.provinceCode = _provinceCode;

        const _city = toTrimOrNull(city);
        if (_city) $set.city = _city;
        const _cityCode = toTrimOrNull(cityCode);
        if (_cityCode) $set.cityCode = _cityCode;

        const _subDistrict = toTrimOrNull(subDistrict);
        if (_subDistrict) $set.subDistrict = _subDistrict;
        const _subDistrictCode = toTrimOrNull(subDistrictCode);
        if (_subDistrictCode) $set.subDistrictCode = _subDistrictCode;

        const _ward = toTrimOrNull(ward);
        if (_ward) $set.ward = _ward;
        const _wardCode = toTrimOrNull(wardCode);
        if (_wardCode) $set.wardCode = _wardCode;

        const _address = toTrimOrNull(address);
        if (_address) $set.address = _address;

        const _landArea = toNumberOrUndefined(landArea);
        if (_landArea !== undefined) $set.landArea = _landArea;

        const _estimatedHarvest = toNumberOrUndefined(estimatedHarvest);
        if (_estimatedHarvest !== undefined) $set.estimatedHarvest = _estimatedHarvest;

        const _riceVariety = toTrimOrNull(riceVariety);
        if (_riceVariety) $set.riceVariety = _riceVariety;

        const _howLong = toTrimOrNull(howLongBecomeFarmer);
        if (_howLong) $set.howLongBecomeFarmer = _howLong;

        const _landOwnership = toTrimOrNull(landOwnership);
        if (_landOwnership) $set.landOwnership = _landOwnership;

        const _landLocation = toTrimOrNull(landLocation);
        if (_landLocation) $set.landLocation = _landLocation;

        const _plantingSeason = toTrimOrNull(plantingSeason);
        if (_plantingSeason) $set.plantingSeason = _plantingSeason;

        const _farmerGroup = toTrimOrNull(farmerGroup);
        if (_farmerGroup) $set.farmerGroup = _farmerGroup;

        const _farmerCardNumber = toTrimOrNull(farmerCardNumber);
        if (_farmerCardNumber) $set.farmerCardNumber = _farmerCardNumber;

        if (Object.keys($set).length === 0) {
            return res.status(400).json({ message: "Tidak ada field yang diubah." });
        }

        const updated = await Farmer.findByIdAndUpdate(
            farmerId,
            { $set, $currentDate: { updatedAt: true } },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Data petani tidak ditemukan." });
        }

        return res.status(200).json({
            message: "Biodata petani berhasil diperbarui.",
            data: updated,
        });
    } catch (error) {
        console.error("updateFarmerBiodata error:", error);
        return res.status(500).json({ message: "Terjadi kesalahan pada server." });
    }
};

const deleteFarmerBiodata = async (req, res) => {
    try {
        console.log("lll");
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    FarmerBiodata,
    getFarmerBiodata,
    updateFarmerBiodata,
    deleteFarmerBiodata,
}