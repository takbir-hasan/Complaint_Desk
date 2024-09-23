import Complaint from "../model/complaint.model.js"

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
    const complaints = await Complaint.find({ cdept, status: 'submitted' || 'pending' });

    if (complaints.length === 0) {
      return res.status(404).json({ message: 'No complaints found for this department.' });
    }

    res.json(complaints);
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).send(error);
  }
};

export const discardComplaint = async (req, res) => {
  try {
    const complaintId = req.params.id;

    // Update the complaint's status to 'discarded'
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      complaintId,
      { status: 'discarded' || 'solved' },
      { new: true } // Return the updated complaint after the update
    );

    if (!updatedComplaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.json(updatedComplaint);
  } catch (error) {
    console.error('Error discarding the complaint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const getDiscardedComplaintsByDept = async (req, res) => {
  try {
    const cdept = req.params.cdept;
    // Fetch complaints where cdept matches and status is 'discarded'
    const complaints = await Complaint.find({ cdept, status: 'discarded' });

    if (complaints.length === 0) {
      return res.status(404).json({ message: 'No discarded complaints found for this department.' });
    }

    res.json(complaints);
  } catch (error) {
    console.error('Error fetching discarded complaints:', error);
    res.status(500).send(error);
  }
};
