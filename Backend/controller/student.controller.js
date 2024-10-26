import Student from "../model/student.model.js";
import bcrypt from 'bcrypt';
import Token from "../model/token.model.js";
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'
import dotenv from 'dotenv';
dotenv.config();

// Import Student model, jwt, and other necessary dependencies


export const register = async (req, res) => {

  function generateFourDigitCode() {
    const digits = '0123456789';
    let code = '';
  
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      code += digits[randomIndex];
    }
  
    return code;
  }

  try {
    const { name, department, id, session, email, phone, password, profilePhoto } = req.body;

    // Input validation
    if (!email || !password || !name || !id || !session || !department || !phone || !profilePhoto) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if email already exists
    const existingUser = await Student.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'You have already an account. Please, login to that account.' });
    }

    // Validate base64 format for profilePhoto (optional, if necessary)
    const base64Regex = /^data:image\/(png|jpg|jpeg);base64,/;
    if (!base64Regex.test(profilePhoto)) {
      return res.status(400).json({ message: 'Invalid profile photo format. Please upload a valid image.' });
    }

    // Create a new user
    const user = new Student({
      name,
      dept: department,
      id,
      session,
      email,
      phone,
      password, 
      profilePhoto,  // The base64 encoded string is saved here
    });

    // Hash the password before saving
    user.password = await bcrypt.hash(user.password, 10);

    // Save user to the database
    await user.save();

    const tok = generateFourDigitCode();
    const token = new Token({
      email: user.email,
      token: tok,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes from now
    });
    // Save the verification token  
    await token.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.EMAIL_USERNAME, // Use environment variable
        pass: process.env.EMAIL_PASSWORD, // Use environment variable
      },
    });

    const receiver = {
      from: "verification@complaintdesk.com",
      to: email,
      subject: "Account Verification",
      html: `<h1>Account Verification</h1>
      <p> Hello ${name}, It is mandatory to verify your mail. Your verification code is: <b> ${tok} </b> </p>
      <p> If you didn't request this, please ignore this email. </p>`,
    };

    // Sending email
    await transporter.sendMail(receiver);

    // Responding after successful email send
    return res.status(201).json({
      message: 'Please verify your email address to complete the signup process. Check your mailbox for verification code.',
      email: user.email,
    });

  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


export const login = async (req, res) => {
      try {

        const { email, password } = req.body;
        const checkMail = await Student.findOne({ email });


        if (!checkMail) {
          return res.status(401).json({ message: 'Incorrect email or password.' });
        }

        if (checkMail) {
            if (await bcrypt.compare(password, checkMail.password)) {
              if (checkMail.status === 'verified') {
                //Generate JWT Token
                const token = jwt.sign(
                  { id: checkMail.id, email: checkMail.email }, // Payload
                  process.env.SECRET_KEY, // Secret key
                  { expiresIn: '1y' } // Token expiration time
                );

                  return res.status(201).json({name: checkMail.name, department: checkMail.dept, session: checkMail.session, id: checkMail.id, "access_token": token,
                        
                  });
            } else {
                return res.status(401).json({ message: 'Your Account is not verified completely. Please contact with the chairman of the department.'});
            }
            } else {
                return res.status(401).json({ message: 'Incorrect email or password.' });
            }
        } else {
            return res.status(401).json({ message: 'User not found.' });
        }
       
      } catch (error) {
        console.error('Error login:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
      }
};


export const forgetPass = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).send({ message: "Please provide your email address." });
    }

    const checkUser = await Student.findOne({ email });

    if (!checkUser) {
      return res.status(400).send({ message: "User not found." });
    }

    const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });

     // Send reset email with token
     const resetUrl = `${process.env.CLIENT_URL}/sresetPass/${token}`;

     const message = `
           <h1>You requested a password reset</h1>
           <p>Please click the following link to reset your password:</p>
           <a href="${resetUrl}">Reset Password</a> 
       `;
 

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.EMAIL_USERNAME, // Use environment variable
        pass: process.env.EMAIL_PASSWORD, // Use environment variable
      },
    });

    const 
 receiver = {
      from: "passwordreset@complaintdesk.com",
      to: email,
      subject: "Password Reset Request",
      html: message,
    };

    // Sending email
    await transporter.sendMail(receiver);

    // Responding after successful email send
    return res.status(200).send({
      message: "Password reset link is sent successfully to your email.",
      status: 'success',
    });

  } catch (error) {
    console.error("Error during password reset:", error);
    return res.status(500).json({
      message: 'Something went wrong.',
      error: 'An unexpected error occurred.', 
    });
  }
};

export const resetPass = async (req, res) => {
  try {
    const { token, password } = req.body;

    // Validate password
    if (!password || password.length < 8) {
      return res.status(400).send({
        message: "Please provide a password with at least 8 characters.",
      });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      return res.status(401).send({ message: "Invalid or expired token." });
    }

    // Find user by email from decoded token
    const user = await Student.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).send({ message: "User not found."});
    }

    // Hash password securely
    const hashedPassword = await bcrypt.hash(password, 10); // Adjust salt rounds as needed

    // Update user password
    user.password = hashedPassword;
    await user.save();

    // Send success response
    return res.status(200).send({
      message: "Password reset successful. Login to your account.",
      status: 'success',
      email:user.email,
    });

  } catch (error) {
    console.error("Error during password reset:", error);
    return res.status(500).send({ message: 'Something went wrong.' }); // Avoid exposing details in production
  }
};



export const verification = async (req, res) => {
  try {
    const { token, email } = req.body;

    // Find and delete the token in one atomic operation
    const userToken = await Token.findOneAndDelete({ email, token });

    if (!userToken || userToken.expiresAt < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Mark the user as verified (consider using findOneAndUpdate for atomicity)
    const student = await Student.findOneAndUpdate({ email }, { status: 'pending' }, { new: true }); // { new: true } returns the updated document

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    return res.status(200).json({ 
      message: 'Email Verification Complete!',
      email: student.email,
    });

  } catch (error) {
    console.error('Error during verification:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};



//Method to get student by ID
export const getStudentById = async (req, res) => {
  const { id } = req.params; // Extract the ID from the request parameters

  try {
      const student = await Student.findOne({ id }); // Search for the student by ID
      if (!student) {
          return res.status(404).json({ message: 'Student not found' });
      }
      res.json(student); // Return the student information
  } catch (error) {
      console.error('Error fetching student:', error);
      res.status(500).json({ message: 'Server error' });
  }
};

// Method to update student by ID
export const updateStudentById = async (req, res) => {
  const { id } = req.params;
  const { phone, profilePhoto } = req.body;

  try {
      const student = await Student.findOne({ id });

      if (!student) {
          return res.status(404).json({ message: 'Student not found' });
      }

      student.phone = phone;
      student.profilePhoto = profilePhoto;

      const updatedStudent = await student.save();

      res.status(200).json(updatedStudent);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
  }
};


//getStudentsBy Dept
export const getStudentsByDept = async (req, res) => {
  const { dept } = req.params; // Extract the department name from the request parameters

  try {
    const students = await Student.find({ dept: dept }); // Search for students by department
    if (!students.length) {
      return res.status(404).json({ message: 'No students found for this department' });
    }
    res.json(students); // Return the list of students
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



// Function to update status by ID
export const updateStudentStatus = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { id: id }, 
      { status: "verified" }, // Update the status field
      { new: true } 
    );

    if (updatedStudent) {
      // console.log("Student status updated successfully:", updatedStudent);
      return res.status(200).json({
        message: "Student status updated successfully",
        student: updatedStudent
      });
    } else {
      console.log("Student not found with the given ID.");
    }
  } catch (error) {
    console.error("Error updating student status:", error);
  }
};

// Method to delete student by ID
export const deleteStudentById = async (req, res) => {
  const { id } = req.params; // Extract the ID from the request parameters

  try {
      const student = await Student.findOneAndDelete({ id }); // Delete the student by ID
      if (!student) {
          return res.status(404).json({ message: 'Student not found' });
      }
      res.json({ message: 'Student deleted successfully' }); // Return success message
  } catch (error) {
      console.error('Error deleting student:', error);
      res.status(500).json({ message: 'Server error' });
  }
};
