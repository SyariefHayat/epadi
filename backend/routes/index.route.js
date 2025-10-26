const router = require("express").Router();
const upload = require("../middlewares/upload");

const verifyToken = require("../middlewares/verifyToken");
const verifyLocation = require("../middlewares/verifyLocation");

const isOperator = require("../middlewares/isOperator");
const authController = require("../controllers/auth.controller");
const adminController = require("../controllers/admin.controller");
const biodataController = require("../controllers/biodata.controller");
const locationController = require('../controllers/location.controller');
const allowedRegionController = require('../controllers/allowedRegion.controller');

router.get("/", (req, res) => {
    res.send("Server is running!");
})

router.post("/sign-up", verifyLocation, authController.SignUpUser);
router.post("/sign-in", authController.SignInUser);
router.post("/sign-out", verifyToken, authController.SignOutUser);

router.get("/admin/get/summary", adminController.getDashboardSummary);
router.get("/admin/get/farmer", verifyToken, isOperator, adminController.getAllFarmers);
router.get("/admin/get/buyers", verifyToken, isOperator, adminController.getAllBuyers);

router.get("/admin/get/allowedRegion", allowedRegionController.getAllRegions);
router.post("/admin/create/allowedRegion", allowedRegionController.createRegion);
router.put("/admin/update/allowedRegion/:id", allowedRegionController.updateRegion);
router.patch("/admin/toggle/allowedRegion/:id", allowedRegionController.toggleRegionStatus);
router.delete("/admin/delete/allowedRegion/:id", allowedRegionController.deleteRegion);

router.get('/location/provinces', verifyToken, isOperator, locationController.getProvinces);
router.get('/location/cities', verifyToken, isOperator, locationController.getCities);
router.get('/location/sub-districts', verifyToken, isOperator, locationController.getSubDistricts);
router.get('/location/wards', verifyToken, isOperator, locationController.getWards);

router.post("/farmer/biodata/create", verifyToken, upload.single("farmerProfilePhoto"), verifyLocation, biodataController.FarmerBiodata);
router.put("/farmer/biodata/edit/:farmerId", verifyToken, upload.single("farmerProfilePhoto"), biodataController.updateFarmerBiodata);
router.get("/farmer/biodata/get/:userId", verifyToken, biodataController.getFarmerBiodata);
router.delete("/farmer/biodata/delete/:farmerId", verifyToken, isOperator, biodataController.deleteFarmerBiodata);

router.post("/buyer/biodata/create", verifyToken, upload.single("buyerProfilePhoto"), verifyLocation, biodataController.BuyerBiodata);

module.exports = router;