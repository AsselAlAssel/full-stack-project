module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define('Posts', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        postText: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },

    }, { timestamps: false });

    Posts.associate = (models) => {// this for the relation between the tables
        Posts.hasMany(models.Comments, {// this for the relation between the tables posts and comments
            onDelete: "cascade"// i use it for if  i delete post i delete all comments
        })

        Posts.hasMany(models.Likes, {// this for the relation between the tables posts and comments
            onDelete: "cascade"// i use it for if  i delete post i delete all comments
        })
    }



    return Posts;
}