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
      status: {type: String, default: "Email is not verified"},
      date: { type: Date, default: Date.now },
});

const Student = mongoose.model("Student",StudentSchema);

export default Student;


