import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  password: "UstedTiene34!",
  database: "blog",
  port: 5432,
});

db.connect();

const adjectives = [
  "Equanimous",
  "Magnanimous",
  "Benevolent",
  "Sagacious",
  "Venerable",
];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", {
    blogpage: "Blog",
    about: "About",
    contact: "Contact",
  });
});

app.get("/blog", async (req, res) => {
  const result = await db.query("SELECT * FROM posts");
  var randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  res.render("blog.ejs", {
    adjective: randomAdjective,
    blogpage: "Home",
    about: "About",
    contact: "Contact",
    posts: result.rows,
  });
});

app.get("/suggest", async (req, res) => {
  res.render("form.ejs");
});

app.post("/suggest", async (req, res) => {
  const day = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const date = `${day}/${month}/${year}`;
  await db.query(
    "INSERT INTO suggestions (title, content, date) VALUES ($1, $2, $3)",
    [req.body.title, req.body.content, date]
  );
});

app.post("/content", async (req, res) => {
  var randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const result = await db.query("SELECT content FROM posts WHERE title = $1", [
    req.body.title,
  ]);
  const content = result.rows[0].content;
  res.render("content.ejs", {
    title: req.body.title,
    content: content,
    adjective: randomAdjective,
    blogpage: "Blog",
    about: "About",
    contact: "Contact",
  });
});

app.get("/other-projects", (req, res) => {
  var randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  res.render("other-projects.ejs", {
    adjective: randomAdjective,
    blogpage: "Blog",
    about: "About",
    contact: "Contact",
  });
});

app.get("/about", (req, res) => {
  res.render("about.ejs", {
    blogpage: "Blog",
    about: "Home",
    contact: "Contact",
  });
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs", {
    blogpage: "Blog",
    about: "About",
    contact: "Home",
  });
});

app.post("/contact", (req, res) => {
  console.log(req.body);
})

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
