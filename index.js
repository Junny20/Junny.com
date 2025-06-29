import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const app = express();
const port = 3000;
const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

db.connect()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("DB connection error", err));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  try {
    res.render("index.ejs", {
      blogpage: "Blog",
      about: "About",
      contact: "Contact",
    });
  } catch (err) {
    console.error("Error rendering main page:", err);
    res.status(500).send("Internal server error.");
  }
});

app.get("/blog", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM posts");
    res.render("blog.ejs", {
      blogpage: "Home",
      about: "About",
      contact: "Contact",
      posts: result.rows,
    });
  } catch (err) {
    console.error("Error rendering blog page:", err);
    res.status(500).send("Internal server error.");
  }
});

app.get("/suggest", (req, res) => {
  try {
    res.render("form.ejs");
  } catch (err) {
    console.error("Error rendering suggest page:", err);
    res.status(500).send("Internal server error.");
  }
});

app.post("/suggest", async (req, res) => {
  const day = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const date = `${day}/${month}/${year}`;
  try {
    await db.query(
      "INSERT INTO suggestions (title, content, date) VALUES ($1, $2, $3)",
      [req.body.title, req.body.content, date]
    );
  } catch (err) {
    console.error("Error posting into suggest:", err);
    res.status(500).send("Internal server error.");
  }
});

app.get("/subscribe", (req, res) => {
  try {
    res.render("subscribe.ejs");
  } catch (err) {
    console.error("Error rendering subscribe page:", err);
    res.status(500).send("Internal server error.");
  }
});

app.post("/subscribe", async (req, res) => {
  const email = req.body.email;
  const isEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (email.length > 10 && isEmail(email)) {
    try {
      await db.query("INSERT INTO subscribers (email) VALUES ($1)", [email]);
    } catch (err) {
      console.error("Error rendering subscribe page:", err);
      res.status(500).send("Internal server error.");
    }
  }
});

app.post("/content", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT content FROM posts WHERE title = $1",
      [req.body.title]
    );
    const content = result.rows[0].content;
    res.render("content.ejs", {
      title: req.body.title,
      content: content,
      blogpage: "Blog",
      about: "About",
      contact: "Contact",
    });
  } catch (err) {
    console.error("Error rendering content page:", err);
    res.status(500).send("Internal server error");
  }
});

app.get("/other-projects", (req, res) => {
  try {
    res.render("other-projects.ejs", {
      blogpage: "Blog",
      about: "About",
      contact: "Contact",
    });
  } catch (err) {
    console.error("Error rendering other-projects page:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/about", (req, res) => {
  try {
    res.render("about.ejs", {
      blogpage: "Blog",
      about: "Home",
      contact: "Contact",
    });
  } catch (err) {
    console.error("Error rendering about page:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/contact", (req, res) => {
  try {
    res.render("contact.ejs", {
      blogpage: "Blog",
      about: "About",
      contact: "Home",
    });
  } catch (err) {
    console.error("Error rendering contact page:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/contact", async (req, res) => {
  const { subject, message, contact } = req.body;
  if (subject.length > 0 && message.length > 0) {
    try {
      await db.query(
        "INSERT INTO contact (subject, message, contact) VALUES ($1, $2, $3)",
        [subject, message, contact]
      );
    } catch (err) {
      console.error(err);
      res.status(500).send("Error saving contact");
    }
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
