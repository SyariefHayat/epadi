const { User } = require("../models/user.model");
const { SUC } = require("../utils/response");

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

module.exports = {
    getDashboardSummary,
}