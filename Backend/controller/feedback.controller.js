import Feedback from "../model/feedback.model.js";

export const feedback = async (req, res) => {
      try {
            const feed = new Feedback({
              complaint: req.body.complaint,
            });
              await feed.save();
            res.json({  });
          } catch (error) {
            console.error('Error saving complaint:', err);
            res.status(500).send(err);
          }
};
