const jwt = require("jsonwebtoken")

const validationTocken = (req, res, next) => {
    console.log("validationTocken", req.headers);
    const accessToken = req.headers?.token;
    console.log("accessToken", typeof (accessToken));
    console.log("--------------------", accessToken);
    if (accessToken == "null") {
        return res.json({
            error: "Login First For comment"
        })
    }
    try {
        // varify the accessToken
        jwt.verify(accessToken, 'importantsecret', (err, authData) => {
            console.log("authData", authData);
            if (err) {
                res.sendStatus(403);
            } else {
                console.log(1);
                req.user = authData;
                console.log(2);
                next()
            }
        })

    } catch (err) {
        console.log(err);

        return res.json({ error: "please login first" })

    }
}

module.exports = { validationTocken };