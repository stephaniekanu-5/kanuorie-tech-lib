const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token;

  // Check for token in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
  // token = token.split(" ")[1]; // remove "Bearer"
  try {
    const decoded = jwt.verify(token, "secretkey");
    req.user = decoded; // attach user info
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = protect;