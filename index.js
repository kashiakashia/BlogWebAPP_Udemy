import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let jsonData = {};

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { newListItem: jsonData });
});

app.get("/blogpost", (req, res) => {
  // Retrieve the selected key from the query parameter
  const selectedKey = req.query.key;

  // Retrieve the corresponding value from the JSON data
  const selectedValue = jsonData[selectedKey];
  res.render("blogpost", { key: selectedKey, value: selectedValue });
});

app.post("/submit", (req, res) => {
  const title = req.body["post-title"];
  const blogPost = req.body["blog-post"];

  jsonData[title] = blogPost;
  console.log(jsonData);

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
