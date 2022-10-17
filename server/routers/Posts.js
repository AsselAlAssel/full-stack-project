const express = require('express');
const { validationTocken } = require("../middlewares/AuthMiddleware")
const router = express.Router();
const { Posts, Likes } = require("../models");

router.get("/", async (req, res) => {
    const listOfPosts = await Posts.findAll({
        include: Likes
    });

    res.json(listOfPosts);
});

router.get("/byId/:id", async (req, res) => {
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


module.exports = router;