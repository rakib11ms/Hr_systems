const jwt = require('jsonwebtoken');
const Role = require('../models/RoleModel');
const Permission = require('../models/PermissionModel');
const RoleHasPermission = require('../models/RoleHasPermissionModel');

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
    return res.status(401).json({ status: 401, error: 'Unauthenicated' });
  }
}

function roleCheck(roles, permission) {
  return async (req, res, next) => {
    const userRole = req.user.role; 
    const permissions = await RoleHasPermission.find({ role_id: userRole }).populate('permission_id');
    const permissionNames = permissions.map((permission) => permission.permission_id.name);
    const role = await Role.findOne({ _id: userRole }).select('name');

    if (roles.includes(role.name) && permissionNames.includes(permission)) {
      next();
    } else {
      res.status(403).json({ error: `You don't have access this` });
    }
  };
}


module.exports = { isAuthenticated, roleCheck };
