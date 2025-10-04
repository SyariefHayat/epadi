const router = require("express").Router();
const upload = require("../middlewares/upload");
const verifyToken = require("../middlewares/verifyToken");

const authController = require("../controllers/auth.controller");
const biodataController = require("../controllers/biodata.controller");
const adminController = require("../controllers/admin.controller");
const locationController = require('../controllers/location.controller');

router.get("/", (req, res) => {
    res.send("Server is running!");
})

router.post("/sign-up", authController.SignUpUser);
router.post("/sign-in", authController.SignInUser);
router.post("/sign-out", verifyToken, authController.SignOutUser);

router.get("/admin/get/summary", verifyToken, adminController.getDashboardSummary);
router.get("/admin/get/farmer", verifyToken, adminController.getAllFarmers);

router.get('/location/provinces', verifyToken, locationController.getProvinces);
router.get('/location/cities', verifyToken, locationController.getCities);
router.get('/location/sub-districts', verifyToken, locationController.getSubDistricts);
router.get('/location/wards', verifyToken, locationController.getWards);

router.post("/farmer/biodata/create", upload.single("profilePhoto"), biodataController.FarmerBiodata);
router.get("/farmer/biodata/get/:userId", biodataController.getFarmerBiodata);

module.exports = router;