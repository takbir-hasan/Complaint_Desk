import mongoose from 'mongoose'

const ComplaintSchema = mongoose.Schema({
      name: String,
      dept: String,
      id: Number,
      cdept: String,
      complaint: String,
      date: { type: Date, default: Date.now },
      status: {type: String, default:'submitted'}
});

const Complaint = mongoose.model("Complaint",ComplaintSchema);

export default Complaint;