const AllowedRegion = require("../models/allowed.region.model");
const { ERR } = require("../utils/response");

const verifyLocation = async (req, res, next) => {
    try {
        const { provinceCode, cityCode, subDistrictCode, wardCode } = req.body;

        if (!provinceCode && !cityCode && !subDistrictCode && !wardCode) return ERR(res, 400, "Data wilayah tidak lengkap");

        const regionLevels = [
            { code: wardCode, level: "village" },
            { code: subDistrictCode, level: "district" },
            { code: cityCode, level: "regency" },
            { code: provinceCode, level: "province" },
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
            return ERR(res, 403, "Wilayah kamu belum dibuka untuk akses sistem")
        };

        req.allowedRegion = allowed;

        next();

    } catch (error) {
        console.error("Error verifying location:", error);
        return ERR(res, 500, "Gagal memverifikasi wilayah");
    }
};

module.exports = verifyLocation;