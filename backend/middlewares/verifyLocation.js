const AllowedRegion = require("../models/allowed.region.model");
const { ERR } = require("../utils/response");

const verifyLocation = async (req, res, next) => {
    try {
        const { province, regency, district, village } = req.body;

        const regionLevels = [
            { code: village, level: "village" },
            { code: district, level: "district" },
            { code: regency, level: "regency" },
            { code: province, level: "province" },
        ].filter(r => !!r.code);

        let allowed = null;

        for (const { code, level } of regionLevels) {
            allowed = await AllowedRegion.findOne({
                regionCode: code,
                level,
                isActive: true,
            });
            if (allowed) break;
        }

        if (!allowed) {
            return ERR(res, 403, "Wilayah kamu belum dibuka untuk akses sistem");
        }

        req.allowedRegion = allowed;
        next();

    } catch (error) {
        console.error(error);
        return ERR(res, 500, "Gagal memverifikasi wilayah");
    }
};

module.exports = verifyLocation;