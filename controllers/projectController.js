exports.getProject = async (req, res) => {
    try {
        res.render("projects");
    } catch (error) {
        console.log(error);
    }
};
