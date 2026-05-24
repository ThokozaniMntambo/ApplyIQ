const Application = require('../models/Application')

// GET all applications for logged in user
const getApplications = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user._id })
    res.status(200).json(applications)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// POST create new application
const createApplication = async (req, res) => {
  try {
    const application = await Application.create({
      ...req.body,
      user: req.user._id
    })
    res.status(201).json(application)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// PUT update application
const updateApplication = async (req, res) => {
  try {
    const application = await Application.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    )
    if (!application) {
      return res.status(404).json({ message: 'Application not found' })
    }
    res.status(200).json(application)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// DELETE application
const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    })
    if (!application) {
      return res.status(404).json({ message: 'Application not found' })
    }
    res.status(200).json({ message: 'Application deleted' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication
}