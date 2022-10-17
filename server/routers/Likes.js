const express = require('express');
const router = express.Router();
const { Likes } = require("../models");
const { validationTocken } = require("../middlewares/AuthMiddleware")

router.post("/", async (req, res) => {
    const { PostId, UserId } = req.body;
    console.log(PostId, UserId);
    console.log("----------------------")
    const isLikes = await Likes.findOne({
        where: {
            PostId,
            UserId
        }
    });
    if (!isLikes) {
        const like = await Likes.create({
            PostId,
            UserId
        });
        res.json({
            isLiked: true,
            message: "liked"
        });
    } else {
        await Likes.destroy({
            where: {
                PostId,
                UserId
            }
        });
        res.json({
            message: "Like deleted",
            isLiked: false
        });
    }
});
module.exports = router;
