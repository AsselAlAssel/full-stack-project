const jwt = require("jsonwebtoken")

const validationTocken = (req, res, next) => {
    console.log("validationTocken", req.headers);
    const accessToken = req.headers?.accesstoken;
    console.log("--------------------", accessToken);
    if (!accessToken) {
        return res.json({
            error: "Login First For comment"
        })
    }
    try {
        // varify the accessToken
        jwt.verify(accessToken, 'importantsecret', (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                next()
            }
        })

    } catch (err) {
        console.log(err);

        return res.json({ error: "please login first" })

    }
}

module.exports = { validationTocken };