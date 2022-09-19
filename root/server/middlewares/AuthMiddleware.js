const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");
  if (!accessToken) {
    return res.json({ error: "user not logged in!" });
  }
  try {
    const decoded = verify(accessToken, "ljskffgoSAFKBISDHF", {
      maxAge: "2 days",
    });
    req.user = decoded;
    if (decoded) {
      return next();
    }
  } catch (err) {
    return res.status(401).json({ error: err });
  }
};

module.exports = { validateToken };
