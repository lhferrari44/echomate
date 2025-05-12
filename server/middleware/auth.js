
const jwt = require('jsonwebtoken');
// const User = require('../models/User');

exports.auth = async (req, res, next) => {
  try {
    let token;
    
    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }
    
    try {
      // Verify token
      // In a real implementation, this would use the JWT_SECRET from process.env
      const decoded = jwt.verify(token, 'your_jwt_secret');
      
      // Get user from token
      // const user = await User.findById(decoded.id);
      
      // If no user, send error
      // if (!user) {
      //   return res.status(401).json({
      //     success: false,
      //     message: 'User no longer exists'
      //   });
      // }
      
      // Set req.user to the authenticated user
      // req.user = user;
      req.user = { id: 'user-id' }; // Mock user for demonstration
      
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }
  } catch (error) {
    next(error);
  }
};
