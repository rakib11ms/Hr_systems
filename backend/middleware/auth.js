const jwt = require('jsonwebtoken');

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Extract the token from the Authorization header
  
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET);

    console.log('decoded',decoded)

    // Pass the authenticated user ID to the next middleware or route handler
    // req.userId = decoded.userId;
    req.user = decoded.user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle token verification error
    return res.status(401).json({status:401, error: 'Unauthenicated' });
  }
}

module.exports = isAuthenticated;
