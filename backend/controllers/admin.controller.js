const { SUC } = require("../utils/response");
const { User } = require("../models/user.model");

const getDashboardSummary = async (req, res) => {
    try {
        const [farmers, distributors, investors, buyers] = await Promise.all([
            User.find({ role: "farmer" }),
            User.find({ role: "distributor" }),
            User.find({ role: "investor" }),
            User.find({ role: "buyer" }),
        ]);

        return SUC(res, 200, { farmers, distributors, investors, buyers }, "Success getting data");
    } catch (error) {
        console.error(error);
        return ERR(res, 500, "Error getting data");
    }
}

const getAllFarmers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const skip = (page - 1) * limit;

        const totalFarmers = await User.countDocuments({ role: "farmer" });

        const farmers = await User.find({ role: "farmer" })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate("farmerDetail");

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
}

module.exports = {
    getDashboardSummary,
    getAllFarmers,
}