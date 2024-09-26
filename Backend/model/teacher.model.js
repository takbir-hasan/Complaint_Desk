import mongoose from 'mongoose'

const TeacherSchema = mongoose.Schema({
      name: {type: String},
      dept: {type: String},
      email: {type: String},
      designation: {type: String},
      phone: {type: String},
      password:{type: String,},
      image:{type: String},
      assignedPosition: {type: String},
      assignedDept: {type: String},
      status: {type: String},
});

const Teacher = mongoose.model("Teacher",TeacherSchema);

export default Teacher;




const crypto = require('crypto');

const randomBytes = crypto.randomBytes(16);
const uniqueToken = randomBytes.toString('hex');
console.log(uniqueToken); 

