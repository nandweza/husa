const fs = require("fs");
const path = require("path");
const filename = require("../middleware/imageUpload");
const videoname = require('../middleware/videoUpload');
const Story = require("../models/Story");
const User = require("../models/User");

const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
// const sanitizer = require('sanitize-html');

// Function to sanitize HTML content
function sanitizeHTML(content) {
    const window = (new JSDOM('')).window;
    const DOMPurify = createDOMPurify(window);
    return DOMPurify.sanitize(content);
}

// get all success stories
exports.getStory = async (req, res) => {
    try {
        const allStories = await Story.find().sort({ createdAt: -1 });
        const latestStories = allStories.slice(0, 3);

        if (req.user.isAuthenticated) {
            res.render("account-stories", { allStories, latestStories });
        } else {
            res.render("success-stories", { allStories, latestStories });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

// return one sector by id
exports.getStoryById = async (req, res) => {
    try {
        const { storyId } = req.params;
        const story = await Story.findOne({ _id: storyId });
        

        const stories = await Story.find().limit(3);

        // res.status(200).json({ sector });
        if (req.user.isAuthenticated) {
            res.render("account-story", { story });
        } else {
            res.render("success-story-single", { story, stories });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong"});
    }
}


// post a sector
exports.postStory = async (req, res) => {
    try {
        const { title, content, name } = req.body;
        const img = req.file && req.file.filename ? req.file.filename : '';
        // const video = req.file && req.file.videoname ? req.file.videoname : '';

        if (!title || !content) {
            res.status(403);
        }

        const sanitizedContent = sanitizeHTML(content);
        const newStory = new Story({ title, content: sanitizedContent, name, img });
        await newStory.save();
        res.redirect("/success-stories");
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

// get update page
exports.getUpdateStory = async (req, res) => {
    try {
        const { setoryId } = req.params;
        const getData = await Story.findOne({ _id: storyId });
        res.render('updateStory', { story: getData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

exports.updateStory = async (req, res) => {
    try {
        const { storyId } = req.params;
        const { title, content, name } = req.body;
        const newImg = req.file ? req.file.filename : undefined;
        const newVideo = req.file ? req.file.filename : undefined;

        // Fetch the current story data to get the existing image file name
        const story = await Story.findById(storyId);
        if (!story) {
            return res.status(404).json({ message: "Story not found" });
        }

        const oldImg = story.img;

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

        const oldVideo = story.video;

        // If a new video is provided, delete the old video
        if (newVideo && oldVideo) {
            const oldVideoPath = path.join(__dirname, '../uploads', oldVideo);
            fs.unlink(oldVideoPath, (err) => {
                if (err) {
                    console.log('Failed to delete old video:', err);
                } else {
                    console.log('Old video deleted successfully');
                }
            });
        }

        // Update the sector data
        story.title = title;
        story.content = content;
        if (newImg) {
            story.img = newImg;
        }

        if (newVideo) {
            story.video = newVideo;
        }

        await story.save();
        res.redirect("/account-stories");
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

// delete sector
exports.deleteStory = async (req, res) => {
    try {
        const storyId = req.body.deleteBtn;
  
        // Find the sector by Id
        const story = await Story.findById(storyId);
  
        if (!story) {
            return res.status(404).json({ message: 'Sector not found' });
        }
  
        // Delete associated images in the uploads dir
        if (story.img) {
            const imgPath = path.join(__dirname, '../public/uploads', story.img);
            fs.unlinkSync(imgPath);
        }
  
        // Remove the sector from the database
        await Story.findByIdAndDelete(storyId);
  
        res.redirect("/success-stories");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
