const { check, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();
const { createRegister, login, changeUserPassword, forgotPassword, checkmail, deleteUser } = require('../controllers/UserRegisterController')
const isAuthenticated = require('../middleware/auth')
const { updateUserTable, countActiveInactiveUsers, getAllUsers, filterUserStatus } = require('../controllers/DashboardController')


// router.post('/register',  [
//     check('name').notEmpty().withMessage('Name is required'),
//     check('email').isEmail().withMessage('Email is not valid'),
//     check('password').isLength({ min:4 }).withMessage('Password must be at least 4 characters'),
//   ],createRegister)

router.post('/register', createRegister);

router.post('/login', login)
router.put('/change-password/:userId', isAuthenticated, changeUserPassword)
router.post('/forgot-password', forgotPassword)
router.post('/check-mail', checkmail)

router.post('/modify-users-table', updateUserTable)
router.get('/count-active-inactive-users', countActiveInactiveUsers)
router.get('/all-users', getAllUsers)
router.get('/filter-user-status/:status', filterUserStatus)
router.delete('/delete-user/:userId', deleteUser)



module.exports = router;