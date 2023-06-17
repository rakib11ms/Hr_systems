const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const path = require('path');
const Queue = require('bull');

const updateUserTable = async (req, res) => {

  await User.find({}).updateMany(
    {}, // Empty filter to match all documents
    { $set: { isVerified: false } } // $set operator to add the new field
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
  // const all_users = await User.find().lean().exec();
  // res.json({
  //   status: 200,
  //   all_users: all_users
  // })
  try {
    const page = parseInt(req.query.page) || 1; // Current page number
    const limit = 1000; // Number of users per page (set to 50)

    const startIndex = (page - 1) * limit;

    // Fetch a chunk of users based on the startIndex and limit
    const users = await User.find()
      .skip(startIndex)
      .limit(limit)
      .lean()
      .exec();

    res.json({
      status: 200,
      all_users: users,
      page,
      limit,
    });
  } catch (error) {
    console.error('Error occurred while fetching users:', error);
    res.status(500).json({
      status: 500,
      message: 'An error occurred while fetching users.',
    });
  }
}

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
    else{
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
module.exports = {
  updateUserTable, countActiveInactiveUsers, getAllUsers, filterUserStatus
}