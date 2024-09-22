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