import Complaint from "../model/complaint.model.js"
import Discard from "../model/discard.model.js"

export const complaint = async (req,res)=>{
    try {
      const com = new Complaint({
            name: req.body.name || 'Anonymous',
            dept: req.body.dept || 'Anonymous',
            id: req.body.id || 'Anonymous',
            cdept: req.body.cdept,
            complaint: req.body.complaint
      });
      const saving =  await com.save();
      const token = saving._id;
      res.json({ token });
    } catch (error) {
      console.error('Error saving complaint:', err);
      res.status(500).send(err);
    }
}

export const getComplaintsByDept = async (req, res) => {
  try {
    const cdept = req.params.cdept;
    const complaints = await Complaint.find({ cdept });

    if (complaints.length === 0) {
      return res.status(404).json({ message: 'No complaints found for this department.' });
    }

    res.json(complaints);
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).send(error);
  }
};


// Delete and discard complaint
export const deleteAndDiscardComplaint = async (req, res) => {
  try {
    const complaintId = req.params.id;

    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
      console.log(`Complaint with ID ${complaintId} not found.`);
      return res.status(404).json({ message: 'Complaint not found.' });
    }

    // Save to Discard model
    const discard = new Discard({
      name: complaint.name,
      dept: complaint.dept,
      id: complaint.id,
      cdept: complaint.cdept,
      complaint: complaint.complaint,
      date: new Date(),
      status: 'discarded'
    });

    await discard.save(); 
    await Complaint.findByIdAndDelete(complaintId);

    res.json({ message: 'Complaint deleted and saved to discard.' });
  } catch (error) {
    console.error('Error deleting and discarding complaint:', error);
    res.status(500).json({ error: 'Server error while discarding complaint.' });
  }
};

// Get discarded complaints by cdept
export const getDiscardedComplaintsByDept = async (req, res) => {
  try {
    const cdept = req.params.cdept;
    const discardedComplaints = await Discard.find({ cdept });

    if (discardedComplaints.length === 0) {
      return res.status(404).json({ message: 'No discarded complaints found for this department.' });
    }

    res.json(discardedComplaints);
  } catch (error) {
    console.error('Error fetching discarded complaints:', error);
    res.status(500).send(error);
  }
};

