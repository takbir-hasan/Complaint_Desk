import mongoose from 'mongoose'

const ComplaintSchema = mongoose.Schema({
      name: String,
      dept: String,
      id: Number,
      cdept: String,
      complaint: String
});

const Complaint = mongoose.model("Complaint",ComplaintSchema);

export default Complaint;