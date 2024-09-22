import mongoose from 'mongoose'

const ComplaintSchema = mongoose.Schema({
      name: {type: String, default:'Anonymous'},
      dept:{type: String, default:'Anonymous'},
      id: {type: String, default:'Anonymous'},
      cdept: {type: String, required: true},
      complaint: {type: String, required: true},
      date: { type: Date, default: Date.now },
      status: {type: String, default:'submitted'}
});

const Complaint = mongoose.model("Complaint",ComplaintSchema);

export default Complaint;