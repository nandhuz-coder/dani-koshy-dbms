var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var adminRouter = require("./routes/admin");
var devRouter = require("./routes/dev");
var productRouter = require("./routes/product");
const Db = require("./database/sql");

var app = express();

//database connection
Db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("database connected");
  }
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "memoi355",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 60000 * 60 * 24 * 1, // 1 day
    },
    name: "dani",
  })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/admin", adminRouter);
app.use("/dev", devRouter);
app.use("/product", productRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
