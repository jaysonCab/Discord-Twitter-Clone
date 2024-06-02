//middlewares are functions that run before a request and checks to see if want to continue with request or not
const {verify} = require("jsonwebtoken")

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.json({error: "User Not Logged In !"});

  try {
    const validToken = verify(accessToken, "personalSecretIncludeInHash"); //validToken is unhashed first, contains user + id
    req.user = validToken;

    if (validToken) {
      return next();
    }

  } catch (err) {
      return res.json({error: err});
  };
};

module.exports = {validateToken};