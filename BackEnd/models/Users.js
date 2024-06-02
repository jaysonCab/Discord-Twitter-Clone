//Creation of table for users, name password and role//Create tables ANONOMOUS FUNCTION exports it to other files for use () => function

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", { //Users is name of database
    username: {
      type: DataTypes.STRING,
      allowNull: false, //Makes it so you have to insert something for this portion
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
  });

  // Users.associate = (models) => {
  //   Users.hasMany(models.Posts, {
  //     onDelete: "cascade",
  //   });
  // };

  return Users;
}

