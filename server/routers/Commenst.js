const express = require('express');
const router = express.Router();
const { Comments } = require("../models");

router.get("/:postId", async (req, res) => {
    const postId = req.params.postId;
    const commentsList = await Comments.findAll({
        where: {
            PostId: postId
        }
    })
    res.json(commentsList);
})


router.post("/", async (req, res) => {
    const commnet = req.body;
    await Comments.create(commnet);
    res.json(commnet);
});



module.exports = router;