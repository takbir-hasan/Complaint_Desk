import Teacher from "../model/teacher.model.js";
import bcrypt from 'bcrypt';
import Token from "../model/token.model.js";
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'
import dotenv from 'dotenv';
dotenv.config();

// Import Teacher model, jwt, and other necessary dependencies


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
    const { name, department, email, designation, phone, password, profilePhoto } = req.body;

    // Input validation
    if (!email || !password || !name || !department || !designation || !phone || !profilePhoto) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if email already exists
    const existingUser = await Teacher.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'You have already an account. Please, login to that account.' });
    }

    // Validate base64 format for profilePhoto (optional, if necessary)
    const base64Regex = /^data:image\/(png|jpg|jpeg);base64,/;
    if (!base64Regex.test(profilePhoto)) {
      return res.status(400).json({ message: 'Invalid profile photo format. Please upload a valid image.' });
    }

    // Create a new user
    const user = new Teacher({
      name,
      dept: department,
      email,
      designation,
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
        const checkMail = await Teacher.findOne({ email });
        
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

                return res.status(201).json({"access_token": token,
                        
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

    const checkUser = await Teacher.findOne({ email });

    if (!checkUser) {
      return res.status(400).send({ message: "User not found." });
    }

    const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });

     // Send reset email with token
     const resetUrl = `${process.env.CLIENT_URL}/resetPass/${token}`;

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
    const user = await Teacher.findOne({ email: decoded.email });
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
    const teacher = await Teacher.findOneAndUpdate({ email }, { status: 'pending' }, { new: true }); // { new: true } returns the updated document

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    return res.status(200).json({ 
      message: 'Verification Complete!',
      email: teacher.email,
    });

  } catch (error) {
    console.error('Error during verification:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


//Get Teachers Info
export const getTeacherByEmail = async (req,res) =>
{
    try{
      const {email} = req.params;
      const teacher = await Teacher.findOne({email});


      if(!teacher)
      {
        return res.status(404).json({message: 'Teacher not found'});
      }
      return res.status(200).json({teacher});
    } catch (error)
    {
      console.error('Error during getTeacherByEmail:', error);
      res.status(500).json({message: 'Internal Server Error', error: error.message});
    }
};


//Update Tacher Profile Info
export const updateTeacherProfile = async (req, res) =>
{
  try{
    const {email} = req.params;
    const {dept, designation, phone, profilePhoto} = req.body;

    const updateTeacher = await Teacher.findOneAndUpdate(
      { email },
      { $set: { dept, designation, phone, profilePhoto} },
      { new: true }
    );

    if(!updateTeacher)
    {
      return res.status(404).json({message: 'Teacher not Found'});
    }
    return res.status(200).json({message: 'Teacher Profile Updated Successfully', updateTeacher});
  } catch (error)
  {
    console.error('Error during updateTeacherByEmail:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }

};


// Get Teacher by Dept
export const getTeacherByDepartment = async (req, res) => {
  const { dept } = req.params;
  // console.log(`Requested department: ${dept}`);
    try {
      const teachers = await Teacher.find({ dept, assignedPosition: { $ne: "Chairman" } });
        // console.log(`Found teachers:`, teachers);

        // if (!teachers.length) {
        //     return res.status(200).json({ message: 'No teachers found for this department' });
        // }

        res.status(200).json(teachers);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};



// Delete Teacher by ID
export const deleteTeacherById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Teacher ID is required' });
  }

  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(id);

    if (!deletedTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    res.json({ message: 'Teacher deleted successfully', teacher: deletedTeacher });
  } catch (error) {
    console.error('Error deleting teacher:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Update Teacher's assignedPosition and assignedDept by ID
export const updateAssignedCommitteeTeacherById = async (req, res) => {
  const { id } = req.params;
  const { assignedPosition, assignedDept } = req.body; // Get the new values from the request body

  if (!id) {
    return res.status(400).json({ error: 'Teacher ID is required' });
  }

  try {
    // Find the teacher by ID
    const teacher = await Teacher.findById(id);

    // Check if the teacher exists
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Update the teacher's assignedPosition and assignedDept
    teacher.assignedPosition = assignedPosition;
    teacher.assignedDept = assignedDept;

    // Save the updated teacher
    const updatedTeacher = await teacher.save();

    res.json({ message: 'Teacher updated successfully', teacher: updatedTeacher });
  } catch (error) {
    console.error('Error updating teacher:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};





//Function to handle the update of assigned position and department
export const updatePosition = async (req, res) => {

  const { chairman, teachers } = req.body;
  try{
    if (chairman) {
      const updatedChairman = await Teacher.findOneAndUpdate(
          { name: chairman.name }, // Search by the chairman's name
          { assignedPosition: chairman.assignedPosition, assignedDept: chairman.assignedDept },
          { new: true } // Return the updated document
      );

      if (!updatedChairman) {
          return res.status(404).json({ message: "Chairman not found" });
      }
  }

  
  return res.status(200).json({ message: "Successfully Added Committe" });
   
  }
  catch (error) {
    console.error("Error updating teachers:", error);
    return res.status(500).json({ message: "Internal server error" });
}

};


// Function to get Teachers with Specified Positions
export const getAssignedTeachersByPosition = async (req, res) => {
  try {
      const positions = req.query.positions ? req.query.positions.split(',') : ["Chairman", "Committee"]; // Allow dynamic positions

      const assignedTeachers = await Teacher.find({
          assignedPosition: { $in: positions }
      }).select('name assignedDept assignedPosition');

      if (assignedTeachers.length === 0) {
          return res.status(404).json({ success: false, message: "No teachers found with the specified positions." });
      }

      console.log(`Retrieved ${assignedTeachers.length} assigned teachers.`);
      return res.status(200).json({ success: true, assignedTeachers });
  } catch (error) {
      console.error("Error retrieving assigned teachers:", error);
      return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


// Function to handle updating teacher's assignDept and assignPosition to "NotAssigned" by departmentName
export const updatePositionByDepartment = async (req, res) => {
  const { dept } = req.body;

  try {
    const updatedTeacher = await Teacher.updateMany(
      { assignedDept: dept }, // Search by the department name
      { 
        assignedDept: 'NotAssigned', 
        assignedPosition: 'NotAssigned' 
      },
      { new: true } // Return the updated document
    );

    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found for this department" });
    }

    return res.status(200).json({ message: "Position and Department updated to NotAssigned" });
  } catch (error) {
    console.error("Error updating teacher:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


//Function to verify a teacher

export const  verifyTeacherById = async (req, res) => {
  const { teacherId } = req.params;

  try {
    const UpdatedTeacher = await Teacher.findOneAndUpdate(
      { _id: teacherId },
      { status: 'verified' },
      { new: true } 
    );
    if (!UpdatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    return res.status(200).json({ message: "Teacher verified" });
  } catch (error) {
    console.error("Error verifying teacher:", error);
    return res.status(500).json({ message: 'Server error', error });
  }

};


// Get Teacher Names by Department
export const getTeacherNamesByDepartment = async (req, res) => {
  const { dept } = req.params; // Extract department from request parameters
  try {
      // Find teachers by department and only select the 'name' field
      const teachers = await Teacher.find({ dept }, 'name');
      
      if (!teachers.length) {
          return res.status(404).json({ message: 'No teachers found for this department' });
      }

      // Return the list of teacher names
      res.status(200).json(teachers);
  } catch (error) {
      console.error('Error fetching teacher names:', error);
      res.status(500).json({ message: 'An error occurred while fetching teacher names', error: error.message });
  }
};

// Get All Teacher Names
// export const getAllTeacherNames = async (req, res) => {
//   try {
//     // Find all teachers and only select the 'name' field
//     const teachers = await Teacher.find({}, 'name');

//     if (!teachers.length) {
//       return res.status(404).json({ message: 'No teachers found' });
//     }

//     // Return the list of teacher names
//     res.status(200).json(teachers);
//   } catch (error) {
//     console.error('Error fetching teacher names:', error);
//     res.status(500).json({ message: 'An error occurred while fetching teacher names', error: error.message });
//   }
// };
