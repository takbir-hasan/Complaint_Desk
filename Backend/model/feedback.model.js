import mongoose from 'mongoose'

const FeedbackSchema = mongoose.Schema({
      
      complaint: {type: String, required: true},
      date: { type: Date, default: Date.now },
});

const Feedback = mongoose.model("Feedback",FeedbackSchema);

export default Feedback;