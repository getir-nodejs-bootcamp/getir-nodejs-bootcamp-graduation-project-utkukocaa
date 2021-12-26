const Record = require("../models/Record");

const listRecords = async (req, res) => {
  const { minCount, maxCount, startDate, endDate } = req.body;

  const records = await Record.aggregate([
    //adding totalCount field
    { $addFields: { totalCount: { $sum: "$counts" } } },
    //match criterias
    {
      $match: {
        createdAt: { $lte: new Date(endDate), $gte: new Date(startDate) },
        totalCount: { $gte: minCount, $lte: maxCount },
      },
    },
    //adjust which properties should be shown
    {
      $project: {
        _id: 0, 
        key: 1,
        createdAt: 1,
        totalCount: 1,
      },
    },
  ]);

  res.status(200).json({ code: 0, msg: "Success", records });
  //if error accour it automatically passes error handler thanks to express-async-error package
};

module.exports = listRecords;
