exports.getBlogPage = async (req, res) => {
    try {
        res.render("blog-grid");
    } catch (error) {
        console.log(error);
    }
}
