exports.getWhatWeDo = async(req, res) => {
    try {
        res.render("what-we-do");
    } catch (error) {
        console.log(error);
    }
};
