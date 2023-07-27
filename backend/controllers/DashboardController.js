const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const Queue = require('bull');

const path = require('path');
const multer = require('multer')



const updateUserTable = async (req, res) => {

  await User.find({}).updateMany(
    {}, // Empty filter to match all documents
    { $set: { isVerified: false, role: 'User' } } // $set operator to add the new field
  )
  res.json({
    status: 200,
    message: 'field added successfully'
  })
}

const countActiveInactiveUsers = async (req, res) => {
  const active_users = await User.countDocuments({ 'isVerified': true });
  const InActive_users = await User.countDocuments({ 'isVerified': false });
  res.json({
    status: 200,
    active_users: active_users,
    inactive_users: InActive_users
  })

}


const getAllUsers = async (req, res) => {
  try {
    const users = await User.aggregate([
      // Step 1: Lookup to get role information

      {
        $lookup: {
          from: 'roles',
          localField: 'role',
          foreignField: '_id',
          as: 'user_role'
        }
      },
      // Step 2: Unwind the user_role array (since lookup returns an array)
      {
        $unwind: '$user_role'
      },


      // Step 3: Lookup to get role-wise permissions from RoleHasPermission collection
      {
        $lookup: {
          from: 'rolehaspermissions',
          localField: 'user_role._id', // Remove the space after '_id'
          foreignField: 'role_id', // Remove the space after 'role_id'
          as: 'role_permissions'
        }
      },
      // Step 4: Lookup to get permission names based on permission_ids
      {
        $lookup: {
          from: 'permissions',
          localField: 'role_permissions.permission_id',
          foreignField: '_id',
          as: 'permissions'
        }
      },
      // Step 5: Project only the necessary fields for the final output
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          role: '$user_role.name',
          permissions: '$permissions.name'
        }
      }


    ]);


    return res.json({
      status: 200,
      users: users,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};



const filterUserStatus = async (req, res) => {
  const status = req.params.status;
  try {
    if (status == 'all') {
      const users = await User.find();
      res.json({
        status: 200,
        users: users
      });
    }
    else {
      const users = await User.find({ isVerified: status });

      res.json({
        status: 200,
        users: users
      });
    }

  }
  catch (error) {
    res.json({
      status: 400,
      message: 'error'
    });
  }

}


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
const uploadFile = async (req, res) => {

  try {
    // Check if a file was uploaded
    if (!req.file) {
      throw new Error('No file uploaded');
    }

    // Process the uploaded file here if needed

    res.json({
      status: 200,
      message: "File uploaded successfully"
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      error: error.message
    });
  }
}


module.exports = {
  updateUserTable, countActiveInactiveUsers, getAllUsers, filterUserStatus, uploadFile,upload
}