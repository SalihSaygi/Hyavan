import gfs from '../gfs.js';

const getFiles = asyncHandler(async (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      res.status(404).json({
        err: 'No files exist',
      });
    }

    const f = files.sort((a, b) => {
      return (
        new Date(b['uploadDate']).getTime() -
        new Date(a['uploadDate']).getTime()
      );
    });

    res.json(f);
  });
});

const getOneFile = asyncHandler(async (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      res.status(404).json({
        err: 'No file exists',
      });
    }
    res.json(file);
  });
});

// @route DELETE /files/:id
// @desc  Delete file

const deleteFile = asyncHandler(async (req, res) => {
  gfs.files.remove(
    { _id: req.params.id, root: 'uploads' },
    (err, gridStore) => {
      if (err) {
        return res.status(404).json({ err: err });
      }
      res.status(200).end();
    }
  );
});

const getImage = asyncHandler(async (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      res.status(404).json({
        err: 'No file exists',
      });
    }

    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image',
      });
    }
  });
});

const getVideo = asyncHandler(async (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      res.status(404).json({
        err: 'No file exists',
      });
    }

    if (
      file.contentType === 'video/x-msvideo' ||
      file.contentType === 'video/mp4' ||
      file.contentType === 'video/mpeg' ||
      file.contentType === 'video/ogg'
    ) {
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an video',
      });
    }
  });
});

const getAudio = asyncHandler(async (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      res.status(404).json({
        err: 'No file exists',
      });
    }

    if (
      file.contentType === 'audio/mpeg' ||
      file.contentType === 'audio/aac' ||
      file.contentType === 'audio/ogg'
    ) {
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an video',
      });
    }
  });
});

export {
  getFiles,
  deleteFile,
  getImage,
  getOneFile,
  deleteFile,
  getVideo,
  getAudio,
};
