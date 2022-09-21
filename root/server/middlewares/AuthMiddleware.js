const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");
  if (!accessToken) {
    return res.status(401).send({
      message: "user not logged in!",
    });
  }
  try {
    const decoded = verify(accessToken, "ljskffgoSAFKBISDHF", {
      maxAge: "2 days",
    });
    if (decoded) {
      req.user = decoded;
      return next();
    }
  } catch (err) {
    return res.status(401).send({
      message: "You are not authorized",
    });
  }
};

module.exports = { validateToken };
