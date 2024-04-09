const express = require("express");
const app = express();
// const cors = require('cors')

//Parses so Insomnia can run
app.use(express.json());
// app.use(cors());

//models\posts.js Set up table parameters, then here we create the table
const db = require('./models');

//Routers !
const postRouter = require('./routes/posts');
app.use("/posts", postRouter);

db.sequelize.sync().then( () => {     //When start, go through models folder if they exist in db, if not create table

  app.listen(1111, () => {    //Start API
  console.log("Server is running on port 1111!");
  });

});


