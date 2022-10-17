const express = require('express');
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { validationTocken } = require("../middlewares/AuthMiddleware")

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10)
        .then((hash) => {
            Users.create(
                {
                    username: username,
                    password: hash
                }
            )
        })
    res.json('User created');
});


router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username: username } });

    if (!user) {
        return res.status(404).send({ error: "User Doesn't Exist" });
    }

    bcrypt.compare(password, user.password).then(async (match) => {
        if (!match) {
            return res.status(200).send({ error: "Wrong Username And Password Combination" });
        }

        const accessToken = sign(
            { username: user.username, id: user.id },
            "importantsecret"
        );
        res.status(200).json({ token: accessToken, username: user.username, id: user.id });
    });
});


router.get("/auth", validationTocken, (req, res) => {
    res.json(req.user);
});

module.exports = router;