import Feedback from "../model/feedback.model.js";

export const feedback = async (req, res) => {
      try {
            const feed = new Feedback({
              complaint: req.body.complaint,
            });
              await feed.save();
            res.json({  });
          } catch (error) {
            console.error('Error saving feedback:', err);
            res.status(500).send(err);
          }
  try {
    const feed = new Feedback({
      complaint: req.body.complaint,
    });
    await feed.save();
    res.json({ message: "Feedback submitted successfully!", data: feed });
  } catch (error) {
    console.error('Error saving complaint:', error);
    res.status(500).json({ message: 'Error saving feedback', error });
  }
};

export const getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find();
    res.json(feedback);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ message: 'Error fetching feedback', error });
  }
};
