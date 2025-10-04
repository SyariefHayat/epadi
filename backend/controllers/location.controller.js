const { User } = require('../models/user.model');

const getProvinces = async (req, res) => {
    try {
        const provinces = await User.aggregate([
            { $match: { role: 'farmer' } },
            {
                $lookup: {
                    from: 'farmers',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'farmerDetail'
                }
            },
            { $unwind: '$farmerDetail' },
            {
                $group: {
                    _id: '$farmerDetail.province',
                    name: { $first: '$farmerDetail.province' }
                }
            },
            { $match: { _id: { $ne: null } } },
            { $sort: { name: 1 } },
            {
                $project: {
                    id: '$_id',
                    name: 1,
                    _id: 0
                }
            }
        ]);

        res.status(200).json({
            data: provinces
        });
    } catch (error) {
        console.error('Error fetching provinces:', error);
        res.status(500).json({ 
            message: 'Gagal memuat data provinsi',
            error: error.message 
        });
    }
};

const getCities = async (req, res) => {
    try {
        const { provinceId } = req.query;

        if (!provinceId) {
            return res.status(400).json({ message: 'Province ID is required' });
        }

        const cities = await User.aggregate([
            { $match: { role: 'farmer' } },
            {
                $lookup: {
                    from: 'farmers',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'farmerDetail'
                }
            },
            { $unwind: '$farmerDetail' },
            { $match: { 'farmerDetail.province': provinceId } },
            {
                $group: {
                    _id: '$farmerDetail.city',
                    name: { $first: '$farmerDetail.city' }
                }
            },
            { $match: { _id: { $ne: null } } },
            { $sort: { name: 1 } },
            {
                $project: {
                    id: '$_id',
                    name: 1,
                    _id: 0
                }
            }
        ]);

        res.status(200).json({
            data: cities
        });
    } catch (error) {
        console.error('Error fetching cities:', error);
        res.status(500).json({ 
            message: 'Gagal memuat data kota',
            error: error.message 
        });
    }
};

const getSubDistricts = async (req, res) => {
    try {
        const { cityId } = req.query;

        if (!cityId) {
            return res.status(400).json({ message: 'City ID is required' });
        }

        const subDistricts = await User.aggregate([
            { $match: { role: 'farmer' } },
            {
                $lookup: {
                    from: 'farmers',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'farmerDetail'
                }
            },
            { $unwind: '$farmerDetail' },
            { $match: { 'farmerDetail.city': cityId } },
            {
                $group: {
                    _id: '$farmerDetail.subDistrict',
                    name: { $first: '$farmerDetail.subDistrict' }
                }
            },
            { $match: { _id: { $ne: null } } },
            { $sort: { name: 1 } },
            {
                $project: {
                    id: '$_id',
                    name: 1,
                    _id: 0
                }
            }
        ]);

        res.status(200).json({
            data: subDistricts
        });
    } catch (error) {
        console.error('Error fetching sub-districts:', error);
        res.status(500).json({ 
            message: 'Gagal memuat data kecamatan',
            error: error.message 
        });
    }
};

const getWards = async (req, res) => {
    try {
        const { subDistrictId } = req.query;

        if (!subDistrictId) {
            return res.status(400).json({ message: 'Sub-district ID is required' });
        }

        const wards = await User.aggregate([
            { $match: { role: 'farmer' } },
            {
                $lookup: {
                    from: 'farmers',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'farmerDetail'
                }
            },
            { $unwind: '$farmerDetail' },
            { $match: { 'farmerDetail.subDistrict': subDistrictId } },
            {
                $group: {
                    _id: '$farmerDetail.ward',
                    name: { $first: '$farmerDetail.ward' }
                }
            },
            { $match: { _id: { $ne: null } } },
            { $sort: { name: 1 } },
            {
                $project: {
                    id: '$_id',
                    name: 1,
                    _id: 0
                }
            }
        ]);

        res.status(200).json({
            data: wards
        });
    } catch (error) {
        console.error('Error fetching wards:', error);
        res.status(500).json({ 
            message: 'Gagal memuat data desa/kelurahan',
            error: error.message 
        });
    }
};

module.exports = {
    getProvinces,
    getCities,
    getSubDistricts,
    getWards
};