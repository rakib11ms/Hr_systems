const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const path = require('path');
const Queue = require('bull');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

const createRegister = async (req, res) => {
  // const { name, email, password, resetToken, resetTokenExpiration } = req.body;
  // try {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array() });
  //   }

  //   // Check if the user already exists
  //   const existingUser = await User.findOne({ email });
  //   if (existingUser) {
  //     return res.status(400).json({ error: 'Email already registered' });
  //   }

  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   const data = {
  //     name: name,
  //     email: email,
  //     password: hashedPassword,
  //     resetToken: '',
  //     resetTokenExpiration: ''
  //   }

  //   const user = new User(data);
  //   await user.save();
  //   const token = createToken(user._id);
  //   res.json(
  //     {
  //       status: 200,
  //       user: user
  //     }
  //   )
  // }
  // catch (error) {
  //   res.status(400).json({ error: error.message })

  // }
  try {
    const totalUsers = 50000; // Number of users to register
    const users = [];

    // Generate an array of user objects
    for (let i = 0; i < totalUsers; i++) {
      const user = {
        name: `User ${i + 1}`,
        email:`${i+1}gmail.com`,
        password:'12345678',
        confirm_password:'12345678',
        isVerified:false,
      };
      users.push(user);
    }

    // Bulk insert users into the database
    await User.insertMany(users);

    res.json({
      status: 200,
      message: `${totalUsers} users registered successfully.`,
    });
  } catch (error) {
    console.error('Error occurred while registering users:', error);
    res.status(500).json({
      status: 500,
      message: 'An error occurred while registering users.',
    });
  }
}

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.json({ status: 400, errors: errors.array() });
    // }

    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ status: 400, error: 'User doesnot exists' });
    }

    // Validate the password
    // const isMatch = await user.comparePassword(password);
    // if (!isMatch) {
    //   return res.json({ status: 400, error: 'Invalid credentials' });
    // }

    // Create and send the token
    const token = createToken(user._id);
    res.json({ status: 200, user, token });
  } catch (error) {
    res.json({ status: 400, error: error.message });
  }
};

//changed user password function

const changeUserPassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { oldPassword, newPassword } = req.body;

    // console.log('check',oldPassword)

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Password didnot match' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }

}

//delete user functionality

const deleteUser = async (req, res) => {

  try {
    const user = req.params.userId;
    const delete_user = await User.deleteOne({ _id: user });
    if (delete_user.deletedCount == 1) {
      res.json(
        {
          status: 200,
          message: "User deleted successfully"
        })
    }
    else {
      res.json(
        {
          status: 400,
          message: "Error ! user cannot be deleted"
        })
    }
  }
  catch (error) {
    res.json({
      message: error.message
    })
  }


}

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  //     try {
  //         const user = await User.findOne({ email });
  //         if (!user) {
  //             return res.json({status:400, error: 'User not found' });
  //         }

  //         if (user.resetToken && user.resetTokenExpiration > Date.now()) {
  //             // Reset token already exists and is not expired, so we don't send another email
  //             return res.json({status:400,error: 'Password reset email already sent' });
  //         }

  //         // Generate a unique reset token and set its expiration time
  //         const resetToken = crypto.randomBytes(20).toString('hex');
  //         const resetTokenExpiration = Date.now() + 3600; // Token expires in 1 hour

  //         // Store the reset token and its expiration time in the user object
  //         user.resetToken = resetToken;
  //         user.resetTokenExpiration = resetTokenExpiration;
  //         await user.save();
  //         // Compose the reset password email
  //         const resetUrl = `http://your-website.com/reset/${resetToken}`;
  //         // SMTP transporter configuration
  //         const transporter = nodemailer.createTransport({
  //             host: 'smtp.gmail.com',
  //             port: 587,
  //             secure: false,
  //             auth: {
  //                 user: 'rakibhossain18156@gmail.com',
  //                 pass: 'idojhamajvgtkezp'
  //             }
  //         });
  //         // Get the absolute file path to the PDF attachment
  //         const pdfFilePath = path.join(__dirname, '../files/scan.pdf');
  //         // Create a PDF attachment
  //         const pdfAttachment = {
  //             filename: 'example.pdf',
  //             path: pdfFilePath
  //         };
  //         // const emails = ['rakib10ms@gmail.com', 'rakibtech9@gmail.com']
  //         // const recipients = emails.join(',');

  //         // Compose the email
  //         const emailOptions = {
  //             from: 'DEV SKILL',
  //             to: user.email,
  //             subject: 'Email with PDF Attachment',
  //             text: 'Please find the attached PDF document.',
  //             html: `
  //       <html>
  //         <head>
  //           <style>
  //             body {
  //               font-family: Arial, sans-serif;
  //             }
  //             h1 {
  //               color: #333;
  //               text-align: center;
  //             }
  //             p {
  //               color: #555;
  //               margin: 20px;
  //             }
  //                 .container {
  //         border: 1px solid #ccc;
  //         background-color: #f5f5f5;
  //         padding: 20px;
  //       }
  //           </style>
  //         </head>
  //         <body>
  //         <div class="container">

  //           <h1>Welcome to Our Website!</h1>
  //           <p>
  //             Thank you for joining us. We're excited to have you on board.
  //             <br>
  //             <br>
  //             Here are a few things you can expect from our platform:
  //             <ul>
  //               <li>Feature 1</li>
  //               <li>Feature 2</li>
  //               <li>Feature 3</li>
  //             </ul>
  //           </p>
  //           </div>
  //         </body>
  //       </html>
  //       `,

  //             attachments: [pdfAttachment]
  //         };



  // //send email asyncronuslly

  //         return new Promise((resolve, reject) => {
  //           transporter.sendMail(emailOptions, (error, info) => {
  //             if (error) {
  //               res.json({status:400,error:'Error sending email'})
  //               reject(error);
  //             } else {
  //               res.json({status:200,error:'Email sent.Check email'})

  //               resolve(info);
  //             }
  //           });
  //         });


  //     }
  //     catch (error) {
  //         console.error(error)
  //         res.json(error)
  //     }


  // Create a Redis connection for the queue
  const queue = new Queue('emailQueue', {
    redis: {
      host: 'localhost',
      port: 9000,
    },
  });

  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'rakibhossain18156@gmail.com',
      pass: 'idojhamajvgtkezp'
    }
  });

  // Define the email sending task
  queue.process(async (job) => {
    const { to, subject, text } = job.data;

    try {
      // Send the email using nodemailer
      await transporter.sendMail({
        from: 'rakibhossain18156@gmail.com',
        to,
        subject,
        text,
      });

      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  });

  // Enqueue an email sending task
  queue.add({
    to: 'rakibtech9@gmail.com',
    subject: 'Example Email',
    text: 'This is an example email',
  });

  // Start the queue worker
  queue.on('completed', (job) => {
    console.log(`Email job ${job.id} completed`);
  });

  // Handle any errors that occur during processing
  queue.on('failed', (job, error) => {
    console.error(`Email job ${job.id} failed:`, error);
  });

  // Listen for queue events
  queue.on('error', (error) => {
    console.error('Queue error:', error);
  });

  // Start the queue worker
  queue.process((job, done) => {
    done();
  });

}


const checkmail = async (req, res) => {

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'rakibhossain18156@gmail.com',
        pass: 'idojhamajvgtkezp'
      }
    });
    const recipients = [
      // Array of recipient email addresses
      'rakib10ms@gmail.com',
      'rakibtech9@gmail.com',
      'rakib18151@gmail.com',
      'rakib102@gmail.com',
      'rakib1042@gmail.com',
      'rakib1815@gmail.com',
      'rasel@gmail.com',
      'rakibgmail.com',
      'raku@gmail.com',
      'rakib586@gmail.com',
      'shawon1@gmail.com',
      'shawon2@gmail.com',
      'shawon3@gmail.com',
      'shawon4@gmail.com',
      'shawon6@gmail.com',
      'shawon8@gmail.com',
      'shawon9@gmail.com',
      'shawon10@gmail.com',

      // ... add more recipients
    ];

    // Create an array of Promise objects representing each email sending task
    const emailTasks = recipients.map((recipient) => {
      const emailOptions = {
        from: 'sender@example.com',
        to: recipient,
        subject: 'Your Email Subject',
        text: 'Your email content goes here',
      };

      // Return a Promise representing the email sending task
      return transporter.sendMail(emailOptions);
    });

    // Execute all email sending tasks concurrently
    await Promise.all(emailTasks);

    res.json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ error: 'Failed to send emails' });
  }


}






module.exports = {
  createRegister, login, changeUserPassword, forgotPassword, checkmail, deleteUser
}

