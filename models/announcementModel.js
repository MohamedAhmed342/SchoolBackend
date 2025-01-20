const mongoose = require("mongoose");
// formatDate 
const formatDate = (date) => {
    const options = { weekday: "short", month: "short", day: "2-digit", year: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Announcement title is required"],
      minlength: [3, "Title is too short"],
      maxlength: [100, "Title is too long"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description is too short"],
      maxlength: [2000, "Description is too long"],
    },
    date: {
        type: String, 
        default: function () {
          return formatDate(new Date()); 
        },
      },
    },
    
  { timestamps: true }
);

module.exports = mongoose.model("Announcement", announcementSchema);
