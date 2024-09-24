import mongoose from 'mongoose'

const DonationSchema = mongoose.Schema({
      amount: Number,
      date: { type: Date, default: Date.now },
      status: {type: String, default:'successful'}
});

const Donation = mongoose.model("Donation",DonationSchema);

export default Donation;