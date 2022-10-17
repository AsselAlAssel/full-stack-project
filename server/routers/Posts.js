const express = require('express');
const { validationTocken } = require("../middlewares/AuthMiddleware")
const router = express.Router();
const { Posts, Likes } = require("../models");

router.get("/", validationTocken, async (req, res) => {
    const listOfPosts = await Posts.findAll({
        include: Likes
    });

    res.json(listOfPosts);
});

router.get("/byId/:id", validationTocken, async (req, res) => {
    const id = req.params.id;
    let post = await Posts.findAll({
        include: Likes
    });
    post = post.filter((post) => {
        return post.id == id
    })
    res.json(post);
});




router.post("/", validationTocken, async (req, res) => {
    const post = req.body;
    await Posts.create(post);
    res.json(post);
});

router.delete("/:PostId", validationTocken, async (req, res) => {
    console.log(3)
    const id = req.params.PostId;
    const UserId = req.user.id;
    await Posts.destroy({
        where: {
            id: id,
            UserId: UserId
        }
    });
    res.json("deleted");

});



module.exports = router;