const adminService = require('../services/adminService');

const getAllAdmin = async (req, res) => {
    try {
      const admins = await adminService.getAllAdmin();
      res.status(200).json(admins);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

const updateAdmin = async (req, res) => {
    try {
        const { adminId } = req.params;
        const newData = req.body;

        const result = await adminService.updateAdmin(adminId, newData);

        if (!result.status) {
            return res.status(404).json({ error: result.message });
        }

        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
 
  module.exports = {
    getAllAdmin,
    updateAdmin,
   
  };
  