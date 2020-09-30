const mongoose = require('mongoose');

const { Schema } = mongoose;

const LogEntrySchema = new Schema(
  {
    title: { type: String, requied: true },
    description: String,
    comments: String,
    rating: {
      type: Number, min: 0, max: 10, default: 0
    },
    image: String,
    latitude: {
      type: Number, min: -90, max: 90, required: true
    },
    longitutde: {
      type: Number, min: -180, max: 180, required: true
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    visitDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const LogEntry = mongoose.model('LogEntry', LogEntrySchema);

module.exports = LogEntry;
