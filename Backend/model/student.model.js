import mongoose from 'mongoose'

const StudentSchema = mongoose.Schema({
      name: {type: String},
      dept: {type: String},
      id: {type: String},
      session: {type: String},
      email: {type: String},
      phone: {type: String},
      password:{type: String,},
      profilePhoto:{type: String},
      assignedPosition: {type: String, default: "NotAssigned"},
      assignedDept: {type: String, default: "NotAssigned"},
      status: {type: String, default: "Email is not verified"},
});

const Student = mongoose.model("Student",StudentSchema);

export default Student;


