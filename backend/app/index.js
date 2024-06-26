const express = require("express");
const app = express();
const cors = require("cors");
const ExpressError = require("./errors/ExpressError");
const path = require("path");
const fs = require("fs");

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use("/api/admin", require("./routes/admin.router"));
app.use("/api/agent", require("./routes/agent.router"));
app.use("/api/auth", require("./routes/auth.router"));
app.use("/api/buy", require("./routes/buy.router"));
app.use("/api/home", require("./routes/home.router"));
app.use("/api/profile", require("./routes/profile.router"));

app.use((error, req, res, next) => {
    if (req.file) {
        fs.unlink(req.file.path, (err) => {
            console.log(err);
        });
    }
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "An unknown error occurred!" });
});

app.get("/", (req, res) => {
    res.send("Hello world");
});

// Error Handling
app.all("*", (req, res, next) => {
    next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) {
        err.message =
            "Something went wrong, inform media team on the bug you experienced";
    }
    res.status(statusCode);
});
// app.use(require("./errors/*"));

module.exports = app;
