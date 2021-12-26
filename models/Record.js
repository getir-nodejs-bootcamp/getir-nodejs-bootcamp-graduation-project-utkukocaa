const mongoose = require("mongoose");

const RecordSchema = new mongoose.Schema({
  key: String,
  createdAt: Date,
  counts: Array,
});

module.exports = mongoose.model("Record", RecordSchema);
