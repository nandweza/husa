const express = require("express");
const blogController = require("../controllers/blogController");
const { checkAuthentication } = require("../middleware/auth");
const uploads = require("../middleware/imageUpload");

const router = express.Router();

router
    .route("/")
    .get(checkAuthentication, blogController.getBlog)
    .post(uploads, blogController.createPost);

router
    .route("/:postId")
    .get(checkAuthentication, blogController.getBlogById)
    .post(blogController.deletePost);

router
    .route("/update/:postId")
    .get(blogController.getUpdatePage)
    .post(uploads, blogController.updatePost)

module.exports = router;
