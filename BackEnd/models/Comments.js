//Creates comments table
module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define("Comments", {
    commentBody: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    }

  });

  return Comments;
}

//associations to point from comments table to post ID in posts.js