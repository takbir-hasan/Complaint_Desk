import Complaint from "../model/complaint.model.js"

export const complaint = async (req,res)=>{
    try {
      const com = new Complaint({
            name: req.body.name,
            dept: req.body.dept ,
            id: req.body.id ,
            session: req.body.session,
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
    const complaints = await Complaint.find({ cdept, status: { $in: ['submitted', 'Pending','Solved'] } });

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
      { status: 'Discarded' || 'solved' },
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
    const complaints = await Complaint.find({ cdept, status: 'Discarded' });

    if (complaints.length === 0) {
      return res.status(404).json({ message: 'No discarded complaints found for this department.' });
    }

    res.json(complaints);
  } catch (error) {
    console.error('Error fetching discarded complaints:', error);
    res.status(500).send(error);
  }
};


export const markComplaintAsPending = async (req, res) => {
  try {
    const complaintId = req.params.id;

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      complaintId,
      { status: 'Solved' }, // Changed from Pending to Solved
      { new: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.json(updatedComplaint);
  } catch (error) {
    console.error('Error marking the complaint as pending:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getPendingComplaints = async (req, res) => {
  try {
    const pendingComplaints = await Complaint.find({ status: 'Pending' });

    if (pendingComplaints.length === 0) {
      return res.status(404).json({ message: 'No pending complaints found' });
    }

    res.json(pendingComplaints);
  } catch (error) {
    console.error('Error fetching pending complaints:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getPendingComplaintBycdept = async (req, res) => {
  const { cdept } = req.params; // Extract cdept from request parameters

  try {
    const pendingComplaints = await Complaint.find({ 
      status:  { $in: ['Pending', 'Solved'] }, 
      cdept: cdept // Filter by cdept
    });

    if (pendingComplaints.length === 0) {
      return res.status(404).json({ message: 'No pending complaints found for this department' });
    }

    res.json(pendingComplaints);
  } catch (error) {
    console.error('Error fetching pending complaints:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const markComplaintAsSolved = async (req, res) => {
  try {
    const complaintId = req.params.id;

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      complaintId,
      { status: 'Solved' },
      { new: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.json(updatedComplaint);
  } catch (error) {
    console.error('Error marking the complaint as pending:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


//Get Complaint By Student ID
export const getComplaintByStudentId = async (req, res) => {
  const { id } = req.params; 

  try {
     
      const complaint = await Complaint.find({ id }, '_id status');

     
      if (complaint.length === 0) {
        return res.status(404).json({ message: 'No complaints found' });
      }
      
      res.status(200).json(complaint);
  } catch (error) {
      console.error('Error fetching complaint:', error);
      res.status(500).json({ message: 'Server error' });
  }
};