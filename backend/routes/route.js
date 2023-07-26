const { check, validationResult, body } = require('express-validator');
const express = require('express');
const router = express.Router();
const { createRegister, login, changeUserPassword, forgotPassword, checkmail, deleteUser, modifyUserData, editUser, updateUser } = require('../controllers/AuthenticationController')
const { isAuthenticated, roleCheck } = require('../middleware/auth')
const { updateUserTable, countActiveInactiveUsers, getAllUsers, filterUserStatus, uploadFile } = require('../controllers/DashboardController')
const {createRole, getAllRoleName,editRoleName, updateRole, deleteRole, createPermission, getAllPermissionName, updatePermission, deletePermission, editPermissionName, createRoleHasPermission, getAllRoleHasPermission}= require('../controllers/RolePermissionController');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage: storage });

// router.post('/register',  [
//     check('name').notEmpty().withMessage('Name is required'),
//     check('email').isEmail().withMessage('Email is not valid'),
//     check('password').isLength({ min:4 }).withMessage('Password must be at least 4 characters'),
//   ],createRegister)

router.post('/register', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email').notEmpty().withMessage('Email is required'),
], createRegister);

router.post('/login', [
  body('email').notEmpty().withMessage("Email is required"), body('password').notEmpty().withMessage("Password is required")
], login)
router.put('/change-password/:userId', isAuthenticated, changeUserPassword)
router.post('/forgot-password', forgotPassword)
router.post('/check-mail', checkmail)

router.post('/modify-users-table', updateUserTable)
router.get('/count-active-inactive-users', countActiveInactiveUsers)
// router.get('/all-users', isAuthenticated, roleCheck(['Admin']), getAllUsers)
router.get('/all-users', getAllUsers)
router.get('/filter-user-status/:status', filterUserStatus)
router.delete('/delete-user/:userId', deleteUser)
router.get('/modify-user-data', modifyUserData)
router.post('/upload-file', upload.single('image'), uploadFile)
router.get('/edit-user/:id', editUser)
router.put('/update-user/:id', updateUser)

//role permission 
router.post('/create-role',createRole,[body('name').notEmpty().withMessage("Role name is required")])
router.get('/all-roles',getAllRoleName)
router.get('/edit-role/:id',editRoleName)
router.put('/update-role/:id',updateRole)
router.delete('/delete-role/:id',deleteRole)

router.post('/create-permission',createPermission,[body('name').notEmpty().withMessage("Permission name is required")])
router.get('/all-permissions',getAllPermissionName)
router.get('/edit-permission/:id',editPermissionName)
router.put('/update-permission/:id',updatePermission)
router.delete('/delete-permission/:id',deletePermission)


router.post('/create-role-has-permission',createRoleHasPermission)
router.get('/role-has-permission',getAllRoleHasPermission)




module.exports = router;