const multer = require("multer");
const path = require("path");
const fs = require("fs")
const filename = require("../middleware/imageUpload");
const Post = require("../models/Blog");

//get all blog posts
exports.getBlog = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });

        if (req.user.isAuthenticated) {
            res.render("account-blog", { posts });
        } else {
            res.render("blog", { posts });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong"});
    }
}

//get blog post by id
exports.getBlogById = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await Post.findOne({ _id: postId });

        const posts = await Post.find().sort({ createdAt: -1 }).limit(5);

        // res.status(200).json({ post });
        if (req.user.isAuthenticated) {
            res.render("account-blog-single", { post });
        } else {
            res.render("blog-single", { post, posts });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong"});
    }
}

//create new post
exports.createPost = async (req, res) => {
    try {
        const { title, content, category, author } = req.body;
        const img = req.file.filename;

        if (!title || !content ) {
            res.status(500).json({ message: "Something went wrong" });
        }

        const post = new Post({ title, content, category, author, img });
        await post.save()
        // res.status(201).json({ post });
        res.redirect("/blog");

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

// get update page
exports.getUpdatePage = async (req, res) => {
    try {
        const { postId } = req.params;
        const getData = await Post.findOne({ _id: postId });
        res.render('updateBlog', { post: getData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

//update post
exports.updatePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { title, content, category, author } = req.body;
        const newImg = req.file ? req.file.filename : undefined;

        // Fetch the current post data to get the existing image file name
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Sector not found" });
        }

        const oldImg = post.img;

        // If a new image is provided, delete the old image
        if (newImg && oldImg) {
            const oldImgPath = path.join(__dirname, '../uploads', oldImg);
            fs.unlink(oldImgPath, (err) => {
                if (err) {
                    console.log('Failed to delete old image:', err);
                } else {
                    console.log('Old image deleted successfully');
                }
            });
        }

        // Update the post data
        post.title = title;
        post.content = content;
        post.category = category;
        post.author= author;
        if (newImg) {
            post.img = newImg;
        }

        await post.save();
        res.redirect("/blog");
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

// delete post
exports.deletePost = async (req, res) => {
    try {
        const postId = req.body.deleteBtn;
  
        // Find the post by Id
        const post = await Post.findById(postId);
  
        if (!post) {
            return res.status(404).json({ message: 'blog not found' });
        }
  
        // Delete associated images in the uploads dir
        if (post.img) {
            const imgPath = path.join(__dirname, '../public/uploads', post.img);
            fs.unlinkSync(imgPath);
        }
  
        // Remove the post from the database
        await Post.findByIdAndDelete(postId);
  
        res.redirect("/blog");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
