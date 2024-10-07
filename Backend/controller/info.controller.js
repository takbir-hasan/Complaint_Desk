import Complaint from "../model/complaint.model.js";


export const info = async (req, res) => {
  try {
    const result = await Complaint.aggregate([
      {
        $facet: {
          totalProblems: [{ $count: "count" }],
          solvedProblems: [
            { $match: { status: "Solved" } },
            { $count: "count" }
          ]
        }
      }
    ]);

    const totalProblems = result[0].totalProblems[0]?.count || 0;
    const solvedProblems = result[0].solvedProblems[0]?.count || 0;

    res.json({
      totalProblems,
      solvedProblems,
    });
    
  } catch (error) {
    console.error('Error retrieving complaint counts:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
