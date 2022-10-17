const express = require('express');
const router = express.Router();
const { Comments } = require("../models");
const { validationTocken } = require("../middlewares/AuthMiddleware")

router.get("/:postId", async (req, res) => {
    const postId = req.params.postId;
    const commentsList = await Comments.findAll({
        where: {
            PostId: postId
        }
    })
    res.json(commentsList);
})


router.post("/", validationTocken, async (req, res) => {
    const commnet = req.body;
    const username = req.user.username;
    console.log(username);
    commnet.username = username;
    await Comments.create(commnet);
    res.json(commnet);
});

router.delete("/:commentId", validationTocken, async (req, res) => {
    const commentId = req.params.commentId;
    await Comments.destroy({
        where: {
            PostId: commentId
        }
    })
    return res.sendStatus(200).json("Comment deleted");
})




module.exports = router;