module.exports = (sequelize, DataTypes) => {
    const Likes = sequelize.define('Likes', {}, { timestamps: false })

    return Likes;
}