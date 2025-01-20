const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const Announcement = require("../models/announcementModel");

// @desc Get all announcements
// @route GET /api/v1/announcements
// @access Public
exports.getAnnouncements = asyncHandler(async (req, res) => {
    const announcements = await Announcement.find().sort({ createdAt: -1 }); 
    res.status(200).json({ results: announcements.length, data: announcements });
  });
  
// @desc Create an announcement
// @route POST /api/v1/announcements
// @access Private
exports.createAnnouncement = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const announcement = await Announcement.create({ title, description });
  res.status(201).json({ data: announcement });
});

// @desc Get a specific announcement by id
// @route GET /api/v1/announcements/:id
// @access Public
exports.getAnnouncement = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const announcement = await Announcement.findById(id);
  if (!announcement) {
    return next(new ApiError(`No announcement found for this ID: ${id}`, 404));
  }
  res.status(200).json({ data: announcement });
});

// @desc Update an announcement
// @route PUT /api/v1/announcements/:id
// @access Private
exports.updateAnnouncement = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const announcement = await Announcement.findByIdAndUpdate(
    id,
    { title, description },
    { new: true }
  );

  if (!announcement) {
    return next(new ApiError(`No announcement found for this ID: ${id}`, 404));
  }
  res.status(200).json({ data: announcement });
});

// @desc Delete an announcement
// @route DELETE /api/v1/announcements/:id
// @access Private
exports.deleteAnnouncement = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const announcement = await Announcement.findByIdAndDelete(id);
  if (!announcement) {
    return next(new ApiError(`No announcement found for this ID: ${id}`, 404));
  }
  res.status(204).send();
});
