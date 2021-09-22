import PrivateReport from '../models/privateReportModel.js';

export const createReport = (req, res) => {
  const report = new PrivateReport(req.body);

  report
    .save()
    .then(data => {
      res.status(200).json(
        {
          message: 'Save is succesful for the data: ' + data,
        },
        data
      );
    })
    .catch(err => {
      res.status(500).json({
        message:
          err.message || "Couldn't save the Report for some reason  ¯_(ツ)_/¯",
      });
    });
};

export const findOneReport = (req, res) => {
  PrivateReport.findById(req.query.reportId)
    .then(report => {
      if (!report) {
        return res.status(404).json({
          message: "Couldn't find the report with id: " + req.query.reportId,
        });
      }
      res.status(200).json(
        {
          message: 'Here is the report with id: ' + req.query.reportId,
        },
        report
      );
    })
    .catch(err => {
      return res.status(500).json({
        message:
          err +
          "Found it but couldn't retrieve the report with id: " +
          req.query.reportId +
          ' |',
      });
    });
};

export const findAllReports = (req, res) => {
  PrivateReport.find()
    .sort({ timestaps: -1 })
    .limit(50)
    .then(reports => {
      res.status(200).json(reports);
    })
    .catch(err => {
      res.status(500).json({
        message:
          err.message || "Couldn't get Reports for some reason ¯\\_(ツ)_/¯",
      });
    });
};

export const deleteReport = (req, res) => {
  PrivateReport.findByIdAndRemove(req.query.reportId)
    .then(report => {
      if (!report) {
        return res.status(404).json({
          message: "Couldn't find the report with id: " + req.query.reportId,
        });
      }
      res.status(200).json({
        message: 'Deleted the report with id: ' + req.query.reportId,
      });
    })
    .catch(err => {
      return res.status(500).json({
        message: "Couldn't delete report",
      });
    });
};

export const updateReport = (req, res) => {
  PrivateReport.findByIdAndUpdate(req.query.reportId, req.body, { new: true })
    .then(report => {
      if (!report) {
        return res.status(404).json({
          message: "Couldn't find the report with id: " + req.query.reportId,
        });
      }
      res.status(200).json(report);
    })
    .catch(err => {
      return res.status(200).json({
        message:
          err +
          "\n| Found it but couldn't retrieve the report with id: " +
          req.query.reportId +
          ' |',
      });
    });
};
