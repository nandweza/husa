exports.getWhoWeAre = async (req, res) => {
    try {
        res.render("about");
    } catch (error) {
        console.log(error);
    }
};

exports.getWhatWeDo = async(req, res) => {
    try {
        res.render("services-v2");
    } catch (error) {
        console.log(error);
    }
};
