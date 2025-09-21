require("dotenv").config();
const bcrypt = require("bcrypt");

const { SUC, ERR } = require("../utils/response");
const { Farmer, User } = require("../models/index.model");

const SignUpUser = async (req, res) => {
    const { role, fullName, NIK, password } = req.body;

    try {
        if (!role || !NIK || !fullName || !password) return ERR(res, 400, "NIK, Full Name, dan Password wajib diisi");

        const existingUser = await User.findOne({ 
            $or: [
                { NIK },
                { username }
            ]
        });

        if (existingUser) return ERR(res, 409, "NIK atau username sudah terdaftar");

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            role,
            NIK,
            fullName,
            password: hashedPassword
        });

        return SUC(res, 201, user, "User created successfully");
    } catch (error) {
        console.error(error);
        return ERR(res, 500, "Signup failed");
    }
};

const SignInUser = async (req, res) => {
    const { NIK, password } = req.body;

    try {
        if (!NIK || !password) return ERR(res, 400, "NIK dan Password wajib diisi");

        const user = await User.findOne({ NIK });
        if (!user) return ERR(res, 404, "User tidak terdaftar");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return ERR(res, 401, "Password salah");

        return SUC(res, 200, user, "Login successfully");
    } catch (error) {
        console.error(error);
        return ERR(res, 500, "Error signing in");
    }
};

const SignOutFarmer = async (req, res) => {
    try {
        return SUC(res, 200, null, "Logout berhasil");
    } catch (error) {
        console.error("Logout error: ", error);
        return ERR(res, 500, "Logout failed");
    }
};

const ForgotPasswordFarmer = async (req, res) => {
    const { NIK } = req.body;

    try {
        if (!NIK) return ERR(res, 400, "NIK wajib diisi");

        const farmer = await Farmer.findOne({ NIK });
        if (!farmer) return ERR(res, 404, "Farmer tidak ditemukan");

        // Implementasi: kirim OTP / reset link ke email / SMS (opsional)
        return SUC(res, 200, null, "Reset password request received");
    } catch (error) {
        console.error(error);
        return ERR(res, 500, "Something went wrong");
    }
};

module.exports = {
    SignUpUser,
    SignInUser,
    SignOutFarmer,
    ForgotPasswordFarmer,
};