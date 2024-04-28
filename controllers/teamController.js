exports.getOurTeam = async (req, res) => {
    try {
        res.render("team");
    } catch (error) {
        console.log(error);
    }
};
