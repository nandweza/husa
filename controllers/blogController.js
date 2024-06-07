const multer = require("multer");
const filename = require("../middleware/imageUpload");
const Post = require("../models/Blog");

exports.getBlogPage = async (req, res) => {
    try {
        res.render("blog");
    } catch (error) {
        console.log(error);
    }
}

exports.getPost = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
    }
}

exports.createPost = async (req, res) => {
    try {
        const { title, content, category, author } = req.body;
        const img = req.file.filename;

        if (!title || !content ) {
            res.status(500).json({ message: "Something went wrong" });
        }

        const post = new Post({ title, content, category, author, img });
        await post.save()
        res.status(201).json({ post });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}