const jwt = require('jsonwebtoken');
const Role = require('../models/RoleModel');

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

function roleCheck(roles){
  return (req, res, next) => {
    // Check if the authenticated user's role matches any of the specified roles
    const userRole = req.user.role; // Assuming the user role is stored in the 'role' property

    console.log('role name',userRole)
    if (roles.includes(userRole)) {
      // User has the required role, proceed to the next middleware or route handler
      next();
    } else {
      // User does not have the required role, return an error response
      res.status(403).json({ error: `You don't have access this` });
    }
  };
}
// function roleCheck(role, permission) {
//   return (req, res, next) => {
//     // Check if the authenticated user's role and permission match the required role and permission
//     const userRole = req.user.role; // Assuming the user role is stored in the 'role' property
//     const userPermissions = req.user.permissions; // Assuming user permissions are stored in the 'permissions' property

//     if (userRole === role && userPermissions.includes(permission)) {
//       // User has the required role and permission, proceed to the next middleware or route handler
//       next();
//     } else {
//       // User does not have the required role and permission, return an error response
//       res.status(403).json({ error: `You don't have access to ${permission} as ${role}` });
//     }
//   };
// }


module.exports = {isAuthenticated,roleCheck};
