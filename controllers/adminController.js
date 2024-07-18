const Sector = require("../models/Sector");
const Post = require("../models/Blog");
const Story = require("../models/Story");

exports.getAdminPage = async (req, res) => {
    try {
        const sectorCount = await Sector.countDocuments();
        const postCount = await Post.countDocuments();
        const storyCount = await Story.countDocuments();

        if (req.user.isAuthenticated) {
            res.render("admin", { sectorCount, postCount, storyCount });
        } else {
            res.redirect("/");
        }
    } catch (error) {
        console.log(error);
    }
}
