import mongoose from 'mongoose';
import Complaint from "../model/complaint.model.js";

export const check = async (req, res) => {
  try {
    const token = req.query.token;

    // Validate if token is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(token)) {
      return res.json({ status: 'wrong' });
    }

    // Attempt to find the complaint
    const info = await Complaint.findOne({ _id: token });

    if (!info) {
      return res.json({ status: 'wrong' });
    }

    const status = info.status;
    res.json({ status });

  } catch (error) {
    // Log the error and send a detailed message for debugging
    console.error('Error retrieving complaint:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message }); // Send error message in the response
  }
};
