const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = require('./models');


const postRouter = require("./routers/Posts");
app.use("/posts", postRouter);


db.sequelize.sync().then(() => {
    app.listen(3300, () => {
        console.log('Server is running on port 3300');
    });
});

