//Create tables ANONOMOUS FUNCTION exports it to other files for use () => function

module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    title: {
      type: DataTypes.STRING,
      allowNull: false, //Makes it so you have to insert something for title
    },
    postText: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
  });

  Posts.associate = (models) => {  //Creates association with comments table
    Posts.hasMany(models.Comments, {
      onDelete: "cascade", //If post is deleted, comments related or 'cascaded' from will be deleted
    });
  };

  return Posts;
};

