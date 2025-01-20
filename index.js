const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config({ path: "config.env" });
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddleware");
const dbConniction = require("./config/database");
const parentReviewRoutes = require('./routes/parentReviewRoute');
const announcementRoutes = require("./routes/announcementRoute");
const authRoutes = require("./routes/authRoute");
const postRoute = require("./routes/postRoute")
const commentRoute = require("./routes/commentRoute")
const userRoute = require("./routes/userRoute")
const cros = require("cors")


// Connect to DB
dbConniction();

// Express app
const app = express();

// Middlewares
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
app.use(cros())

app.use('/api/v1/parent-reviews', parentReviewRoutes);
app.use("/api/v1/announcements", announcementRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/posts/", postRoute )
app.use("/api/v1/comments/", commentRoute )
app.use("/api/v1/user/", userRoute)


// Handle all other requests with 404 error
app.all("*", (req, res, next) => {
  // Create  error and send it to error handleing middelware
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handling meddleware for express
app.use(globalError);

const PORT = process.env.PORT || 9000;
const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

// Handle rejections outside express
process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down... `);
    process.exit(1);
  });
});
