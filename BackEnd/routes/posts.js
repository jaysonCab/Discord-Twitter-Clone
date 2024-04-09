//Routes related to posts

const express = require('express');
const router = express.Router();
const { Posts, sequelize } = require("../models");


router.get('/', async (req, res) => { //When make request, always takes 2 variables from express request and response
  const allPosts = await Posts.findAll();
  res.json(allPosts);
});

router.post("/", async (req, res) => {
  const post = req.body;
  await Posts.create(post);
  res.json(post);
});

module.exports = router;
