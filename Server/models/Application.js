const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
    default: 'Applied'
  },
  dateApplied: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    default: ''
  }
}, { timestamps: true })

module.exports = mongoose.model('Application', applicationSchema)