module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

    }, { timestamps: false })


    Users.associate = (models) => {
        Users.hasMany(models.Posts, {
            onDelete: "cascade"
        })
        Users.hasMany(models.Likes, {
            onDelete: "cascade"
        })
    }


    return Users;
}
