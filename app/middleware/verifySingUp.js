const { User } = require('../models/user.model.js');

const checkDuplicateEmail = async (req, res, next) => {
    try {
      const { email } = req.body;
  
      const user = await User.findOne({ where: { email } });
      if (user) {
        return res.status(400).json({ message: 'El correo ya está registrado.' });
      }
  
      next();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  module.exports = checkDuplicateEmail;