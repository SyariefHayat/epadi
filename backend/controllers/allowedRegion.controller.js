const { AllowedRegion } = require("../models/allowed.region.model");

const getAllRegions = async (req, res) => {
    try {
        const { level, isActive, search } = req.query;
        const filter = {};

        if (level) filter.level = level;
        if (isActive !== undefined) filter.isActive = isActive === "true";
        if (search) {
            filter.$or = [
                { regionCode: { $regex: search, $options: "i" } },
                { regionName: { $regex: search, $options: "i" } },
            ];
        }

        const regions = await AllowedRegion.find(filter).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: regions.length,
            data: regions,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching regions",
            error: error.message,
        });
    }
};

const getRegionById = async (req, res) => {
    try {
        const region = await AllowedRegion.findById(req.params.id);

        if (!region) {
            return res.status(404).json({
                success: false,
                message: "Region not found",
            });
        }

        res.status(200).json({
            success: true,
            data: region,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching region",
            error: error.message,
        });
    }
};

const getRegionByCode = async (req, res) => {
    try {
        const region = await AllowedRegion.findOne({ regionCode: req.params.code });

        if (!region) {
            return res.status(404).json({
                success: false,
                message: "Region not found",
            });
        }

        res.status(200).json({
            success: true,
            data: region,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching region",
            error: error.message,
        });
    }
};

const createRegion = async (req, res) => {
    try {
        const { regionCode, regionName, level, isActive } = req.body;

        const existingRegion = await AllowedRegion.findOne({ regionCode });
        if (existingRegion) {
            return res.status(400).json({
                success: false,
                message: "Region code already exists",
            });
        }

        const region = await AllowedRegion.create({
            regionCode,
            regionName,
            level,
            isActive,
        });

        res.status(201).json({
            success: true,
            message: "Region created successfully",
            data: region,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating region",
            error: error.message,
        });
    }
};

const updateRegion = async (req, res) => {
    try {
        const { regionCode, regionName, level, isActive } = req.body;

        if (regionCode) {
            const existingRegion = await AllowedRegion.findOne({
                regionCode,
                _id: { $ne: req.params.id },
            });
            if (existingRegion) {
                return res.status(400).json({
                    success: false,
                    message: "Region code already exists",
                });
            }
        }

        const region = await AllowedRegion.findByIdAndUpdate(
            req.params.id,
            { regionCode, regionName, level, isActive },
            { new: true, runValidators: true }
        );

        if (!region) {
            return res.status(404).json({
                success: false,
                message: "Region not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Region updated successfully",
            data: region,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating region",
            error: error.message,
        });
    }
};

const toggleRegionStatus = async (req, res) => {
    try {
        const region = await AllowedRegion.findById(req.params.id);

        if (!region) {
            return res.status(404).json({
                success: false,
                message: "Region not found",
            });
        }

        region.isActive = !region.isActive;
        await region.save();

        res.status(200).json({
            success: true,
            message: `Region ${region.isActive ? "activated" : "deactivated"} successfully`,
            data: region,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error toggling region status",
            error: error.message,
        });
    }
};

const deleteRegion = async (req, res) => {
    try {
        const region = await AllowedRegion.findByIdAndDelete(req.params.id);

        if (!region) {
            return res.status(404).json({
                success: false,
                message: "Region not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Region deleted successfully",
            data: region,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting region",
            error: error.message,
        });
    }
};

const bulkCreateRegions = async (req, res) => {
    try {
        const { regions } = req.body;

        if (!Array.isArray(regions) || regions.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide an array of regions",
            });
        }

        const createdRegions = await AllowedRegion.insertMany(regions, {
            ordered: false,
        });

        res.status(201).json({
            success: true,
            message: `${createdRegions.length} regions created successfully`,
            data: createdRegions,
        });
    } catch (error) {
        if (error.code === 11000) {
            const insertedCount = error.result?.nInserted || 0;
            return res.status(207).json({
                success: true,
                message: `${insertedCount} regions created, some duplicates were skipped`,
                error: "Some region codes already exist",
            });
        }

        res.status(500).json({
            success: false,
            message: "Error creating regions",
            error: error.message,
        });
    }
};

const getRegionsByLevel = async (req, res) => {
    try {
        const { level } = req.params;
        const { isActive } = req.query;

        const filter = { level };
        if (isActive !== undefined) filter.isActive = isActive === "true";

        const regions = await AllowedRegion.find(filter).sort({ regionName: 1 });

        res.status(200).json({
            success: true,
            count: regions.length,
            data: regions,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching regions",
            error: error.message,
        });
    }
};

module.exports = {
    getAllRegions,
    getRegionById,
    getRegionByCode,
    createRegion,
    updateRegion,
    toggleRegionStatus,
    deleteRegion,
    bulkCreateRegions,
    getRegionsByLevel
};