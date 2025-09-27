const router = require("express").Router();
// const upload = require('../middlewares/upload');
const upload = require("../middlewares/upload");
const verifyToken = require("../middlewares/verifyToken");

const authController = require("../controllers/auth.controller");
const biodataController = require("../controllers/biodata.controller");
const adminController = require("../controllers/admin.controller");
// const donorController = require("../controllers/donor.controller");
// const adminController = require("../controllers/admin.controller");
// const articleController = require("../controllers/article.controller");
// const programController = require("../controllers/program.controller");
// const commentController = require("../controllers/comment.controller");
// const profileController = require("../controllers/profile.controller");
// const campaignController = require("../controllers/campaign.controller");
// const notificationController = require("../controllers/notification.controller");
// const verifyToken = require("../middlewares/authMiddleware");
// const isProductManager = require("../middlewares/isProductManager");
// const isFundraiser = require("../middlewares/isFundraiser");
// const checkCampaignAccess = require("../middlewares/checkCampaignAccess");
// const checkArticleAccess = require("../middlewares/checkArticleAccess");
// const isProjectCurator = require("../middlewares/isProjectCurator");
// const checkProgramAccess = require("../middlewares/checkProgramAccess");

router.get("/", (req, res) => {
    res.send("Server is running!");
})

router.post("/sign-up", authController.SignUpUser);
router.post("/sign-in", authController.SignInUser);
router.post("/sign-out", verifyToken, authController.SignOutUser);

router.get("/admin/get/summary", verifyToken, adminController.getDashboardSummary);

router.post("/farmer/biodata/create", upload.single("profilePhoto"), biodataController.FarmerBiodata);
router.get("/farmer/biodata/get/:userId", biodataController.getFarmerBiodata);

module.exports = router;