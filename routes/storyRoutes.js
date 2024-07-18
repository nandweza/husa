const express = require("express");
const storyController = require("../controllers/storyController");
const uploads = require("../middleware/imageUpload");
// const upload = require("../middleware/videoUpload");
const { checkAuthentication } = require("../middleware/auth");

const router = express.Router();

router
    .route("/")
    .get(checkAuthentication, storyController.getStory)
    .post(uploads, storyController.postStory);

router
    .route("/:storyId")
    .get(checkAuthentication, storyController.getStoryById)
    .post(storyController.deleteStory);

// updated routes
router
    .route("/update/:storyId")
    .get(storyController.getUpdateStory)
    .post(uploads, storyController.updateStory);

module.exports = router;
