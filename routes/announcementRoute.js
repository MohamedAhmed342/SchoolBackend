const express = require("express");
const {
    getAnnouncementValidator,
    createAnnouncementValidator,
    updateAnnouncementValidator,
    deleteAnnouncementValidator,
} = require("../utils/validators/announcementValidator");

const {
  getAnnouncements,
  createAnnouncement,
  getAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} = require("../services/announcementService");

const router = express.Router();

router
  .route("/")
  .get(getAnnouncements)
  .post(createAnnouncementValidator, createAnnouncement);

router
  .route("/:id")
  .get(getAnnouncementValidator, getAnnouncement)
  .put(updateAnnouncementValidator, updateAnnouncement)
  .delete(deleteAnnouncementValidator, deleteAnnouncement);

module.exports = router;
