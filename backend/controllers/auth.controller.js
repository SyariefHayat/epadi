require("dotenv").config();
const { SUC, ERR } = require("../utils/response");
const { Farmer } = require("../models/index.model");

const SignUpFarmer = async (req, res) => {
    const {
        role,
        NIK,
        fullName,
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
        const existingFarmer = await Farmer.findOne({ 
            $or: [
                { NIK },
                { farmerCardNumber } 
            ]
        });
        if (existingFarmer) return ERR(res, 409, "Petani sudah terdaftar");

        const farmerData = {
            role,
            NIK,
            fullName,
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
        };

        const farmer = await Farmer.create(farmerData);

        return SUC(res, 201, farmer, "Farmer created successfully");
    } catch (error) {
        console.error(error);
        return ERR(res, 500, "Signup failed");
    }
};

const SignInUser = async (req, res) => {
    const { uid, email } = req.body;

    try {
        if(!uid || !email) return ERR(res, 400, "uid and email is required");

        const user = await User.findOne({ 
            $or: [
                { uid },
                { email },
            ]
        });
        if (!user) return ERR(res, 404, 'User tidak terdaftar');

        await user.save();
        
        return SUC(res, 200, user, 'Login succesfully');
    } catch (error) {
        console.error(error);
        return ERR(res, 500, "Error signing in token")
    }
}

const SignOutUser = async (req, res) => {
    const id = req.user._id;

    try {
        if (!id) return ERR(res, 400, "User id is required");

        const user = await User.findById(id);
        if (!user) return ERR(res, 404, "User not found");

        return SUC(res, 200, user, "Activity Recorded");
    } catch (error) {
        console.error("Activity logging error: ", error);
        return ERR(res, 500, "Activity logging error")
    }
}

const ForgotPasswordUser = async (req, res) => {
    const { email } = req.body;

    try {
        if (!email) return ERR(res, 400, "Email is required");

        const user = await User.findOne({ email });
        if (!user) return ERR(res, 404, "User not found");

        await user.save();

        return SUC(res, 200, null, "Reset password request received");
    } catch (error) {
        console.error(error);
        return ERR(res, 500, "Something went wrong");
    }
}

module.exports = {
    SignUpFarmer, 
    SignInUser,
    SignOutUser,
    ForgotPasswordUser,
}