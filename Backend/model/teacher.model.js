import mongoose from 'mongoose'

const TeacherSchema = mongoose.Schema({
      name: {type: String},
      dept: {type: String},
      email: {type: String},
      designation: {type: String},
      phone: {type: String},
      password:{type: String,},
      profilePhoto:{type: String},
      assignedPosition: {type: String, default: "NotAssigned"},
      assignedDept: {type: String, default: "NotAssigned"},
      status: {type: String, default: "pending"},
});

const Teacher = mongoose.model("Teacher",TeacherSchema);

export default Teacher;


