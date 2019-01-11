const multer = require('multer');

const upload = multer({
  dest: './uploads',
  limits: {
    fieldSize: '1MB',
    fields: 1,
    fileSize: 1048576,
    files: 1,
    parts: 2
  }
});

module.exports = {
  upload: upload,
  validate: () => {
    return (req, res, next) => {
      // only allow files with more than 0 bytes that don't match existing uploaded files for this assignment
      if (req.file &&
          req.file.size > 0 &&
          req.resource.previousFile !== req.file.originalname) {
        req.resource = {
          filename: req.file.originalname,
          success: true
        };
      } else {
        req.errors = {
          error: 'Invalid file'
        };
      }

      next();
    };
  }
};