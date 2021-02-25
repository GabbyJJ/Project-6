//Variable to require dependencies
const { request, response } = require("express");
const express = require("express");
const data = require("./data.json");
const app = express();

//This is used to set up middlewear
app.set("view engine", "pug");
app.use("/static", express.static("public"));

//This will set up the routes
app.get("/", (req, res) => {
  res.locals.projects = data.projects;
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/projects/:id", (req, res, next) => {
  let id = req.params.id;
  let project = null;
  data.projects.map((item) => {
    if (item.id == id) {
      project = item;
    }
  });
  if (project) {
    res.locals.project = project;
    res.render("project");
  } else {
    // Send to 404 page
    next();
  }
});
// 404 Error Handler
app.use((req, res, next) => {
  const error = new Error("Page not found.");
  error.status = 404;
  //next(error);
  console.log(`${error.message} status code: ${error.status}`);
  res.locals.error = error;
  res.render("error");
});
//Global Error Handler
app.use((err, req, res, next) => {
  if (!err.status) {
    err.status = 500;
  }
  console.log(`${err.message} status code: ${err.status}`);
  res.locals.error = err;
  res.render("error");
});

app.listen(3000, () => {
  console.log("now listening on localhost:3000");
});
