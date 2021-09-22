const GridFsStorage = require('multer-gridfs-storage');
const multer = require('multer');

const storage = new GridFsStorage({
  url:
    process.env.NODE_ENV.trim() === 'dev'
      ? process.env.LOCAL_MONGO_URI
      : process.env.MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads',
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });

export default upload;
