import Log from '../models/AdminLog.model.js';

// Fetch all logs (Admin only) with latest logs first
export const fetchLogs = async (req, res) => {
  try {
    // Ensure the user is an admin
    if (!req.user.isAdmin) {
      return res.status(403).send('Forbidden: You do not have access to this resource');
    }

    // Fetch logs sorted by timestamp in descending order (latest first)
    const logs = await Log.findAll({
      order: [['timestamp', 'DESC']],  // Order by 'timestamp' field in descending order
    });

    res.json(logs);
  } catch (error) {
    console.log('Error fetching logs:', error);
    res.status(500).send('Internal Server Error');
  }
};
