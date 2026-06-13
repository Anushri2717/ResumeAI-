const upload = require('../config/multer');
 
const uploadSingle = (fieldName) => (req, res, next) => {
  upload.single(fieldName)(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    next();
  });
};
 
module.exports = { uploadSingle };
 