const express = require('express');
const router = express.Router();
const { Comments } = require("../models");
const {validateToken} = require("../middlewares/AuthenticationMiddleware")

//Grab ID of post so it can associate it with a comment
router.get('/:postId', async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({ where: {PostId: postId }});
  res.json(comments);
});

//Route that creates comments ~ requires sending comment body and PostId
router.post("/", validateToken, async (req, res) => {
  const comment = req.body;
  const username = req.user.username;
  comment.username = username; //Comment now has username field equal to middleware user.username

  await Comments.create(comment);
  res.json(comment);
});

router.delete("/:commentId", validateToken, async (req,res) => {
  const commentId = req.params.commentId
  
  await Comments.destroy({where: {
    id: commentId,
  }});

  res.json("deleted success!");
});


module.exports = router; //Make sure at end of file?