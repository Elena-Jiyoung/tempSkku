var home = require("./home_model");
var router = require("express").Router();


//Homepage 최근게시물 Announcement용 3개, project용 2개)
function homepage(req, res){
    home.annRecentPosts((err, result1) => {
        if (err) {
            console.log(err);
            res.json({ errMsg: "Error: Failed to delete the post"})
        } else {
            home.projRecentPosts((error, result2) => {
                if (error) {
                    console.log(error);
                    res.json({ errMsg: "Error: Failed to delete the post"})
                } else {
                    res.json({
                        announcement : result1,
                        project : result2
                    })
                }
            })
        }
    })
}

router.get("/", homepage)
module.exports = router;