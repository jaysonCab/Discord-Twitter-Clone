//Routes related to Users
//bycrpyt npm install allows encryption to be stored in the table not ASCII
//jsonwebtoken allows tokens for sessions

const {validateToken} = require("../middlewares/AuthenticationMiddleware")
const express = require('express');
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const {sign} = require("jsonwebtoken"); //Sign creates token


router.post("/", async (req, res) => {
  const {username, password } = req.body
  bcrypt.hash(password, 10).then((hash) => { //scrambles password 10 times and stores it into variable hash
    Users.create({
      username: username,
      password: hash,
    });
    res.json("Completed !")
  }); 
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne( { where: { username: username }});

  if (user) {
    bcrypt.compare(password, user.password).then((same) => {
    if (!same) {
      return res.json({ erorr: "Wrong username or password" });
    }
    
    const accessToken = sign({username: user.username, id: user.id}, "personalSecretIncludeInHash"); //Payload that wants to be secured placed in brackets
    return res.json({token: accessToken, username: username, id: user.id}); //Sends hash value to front end

  });
  } else {
    return res.json({ error: "User does not exist" });
  }
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});



module.exports = router;
