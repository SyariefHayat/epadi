require("dotenv").config();
const bcrypt = require("bcrypt");

const { SUC, ERR } = require("../utils/response");
const { User } = require("../models/user.model");

const SignUpUser = async (req, res) => {
    const { uid, email, fullName, role, NIK } = req.body;

    try {
        if (!uid || !email || !fullName || !role || !NIK) return ERR(res, 400, "uid, email, fullName, role, dan NIK wajib diisi");

        const existingUser = await User.findOne({ 
            $or: [
                { NIK },
                { fullName }
            ]
        });

        if (existingUser) return ERR(res, 409, "NIK atau nama lengkap sudah terdaftar");

        const user = await User.create({
            uid,
            email,
            fullName,
            role,
            NIK,
        });

        return SUC(res, 201, user, "User created successfully");
    } catch (error) {
        console.error(error);
        return ERR(res, 500, "Signup failed");
    }
};

const SignInUser = async (req, res) => {
    const { uid, email } = req.body;

    try {
        if (!uid || !email) return ERR(res, 400, "uid dan email wajib diisi");

        const user = await User.findOne({ 
            $or: [
                { uid },
                { email },
            ]
        });
        if (!user) return ERR(res, 404, 'User tidak terdaftar');

        return SUC(res, 200, user, "Login successfully");
    } catch (error) {
        console.error(error);
        return ERR(res, 500, "Error signing in");
    }
};

const SignOutUser = async (req, res) => {
    const { NIK } = req.body;

    try {
        if (!NIK) return ERR(res, 400, "NIK wajib diisi");

        const user = await User.findOne({ NIK });
        if (!user) return ERR(res, 404, "User tidak ditemukan");
        
        return SUC(res, 200, null, "Logout berhasil");
    } catch (error) {
        console.error("Logout error: ", error);
        return ERR(res, 500, "Logout failed");
    }
};

// const ForgotPasswordFarmer = async (req, res) => {
//     const { NIK } = req.body;

//     try {
//         if (!NIK) return ERR(res, 400, "NIK wajib diisi");

//         const farmer = await Farmer.findOne({ NIK });
//         if (!farmer) return ERR(res, 404, "Farmer tidak ditemukan");

//         // Implementasi: kirim OTP / reset link ke email / SMS (opsional)
//         return SUC(res, 200, null, "Reset password request received");
//     } catch (error) {
//         console.error(error);
//         return ERR(res, 500, "Something went wrong");
//     }
// };

module.exports = {
    SignUpUser,
    SignInUser,
    SignOutUser,
    // ForgotPasswordFarmer,
};