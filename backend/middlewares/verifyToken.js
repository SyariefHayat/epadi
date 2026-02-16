const { ERR } = require("../utils/response");
const { User } = require("../models/user.model");
const { admin } = require("../config/firebaseAdmin");

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return ERR(res, 401, "Authorization token is missing or invalid format");
    }

    const token = authHeader.split(" ")[1];

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        if (!decodedToken.uid) return ERR(res, 401, "Token tidak valid");

        const user = await User.findOne({ uid: decodedToken.uid });
        if (!user) {
            console.error("User not found for uid:", decodedToken.uid);
            return ERR(res, 404, "User record not found in database");
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Error verifikasi token:', error);
        return ERR(res, 401, "Token verification failed: " + error.message);
    }
};

module.exports = verifyToken;