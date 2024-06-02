//Routes related to posts

const express = require('express');
const router = express.Router();
const { Posts, sequelize } = require("../models");


router.get('/', async (req, res) => { //When make request, always takes 2 variables from express request and response
  const allPosts = await Posts.findAll();
  res.json(allPosts);
});

router.get('/byId/:id', async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id); //Find by primary key
  res.json(post);
})

router.post("/", async (req, res) => {
  const post = req.body;
  await Posts.create(post);    //This appends the post into SQL workbench table
  res.json(post);
});

module.exports = router;
