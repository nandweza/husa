const express = require("express");
const galleryController = require("../controllers/galleryController");
const { checkAuthentication } = require("../middleware/auth");
const uploads = require("../middleware/imageUpload");

const router = express.Router();

router
    .route("/")
    .get(checkAuthentication, galleryController.getPictures)
    .post(uploads, galleryController.uploadPicture);

router
    .route("/:picId")
    .post(galleryController.deletePicture);

module.exports = router;