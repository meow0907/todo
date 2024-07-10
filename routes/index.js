const router = require("express").Router();

const activityRouter = require("../modules/activity/activity.route");
const subactivityRouter = require("../modules/subActivity/subactivity.route")

router.use("/api/v1/activities", activityRouter);
router.use("/api/v1/sub-activities", subactivityRouter);


module.exports = router;