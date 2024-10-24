import mongoose from 'mongoose'

const ComplaintSchema = mongoose.Schema({
      name: {type: String,},
      dept:{type: String, },
      id: {type: String, },
      session: {type: String},
      cdept: {type: String, required: true},
      complaint: {type: String, required: true},
      date: { type: Date, default: Date.now },
      status: {type: String, default:'Pending'}
});

const Complaint = mongoose.model("Complaint",ComplaintSchema);

export default Complaint;