import Complaint from "../model/complaint.model.js"

export const complaint = async (req,res)=>{
    try {
      const com = new Complaint({
            name: req.body.name,
            dept: req.body.dept,
            id: req.body.id,
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