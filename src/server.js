const express = require("express");
const devpun = require("devpun");
const cors = require('cors');
const objOfJokes = require("devpun/jokes.json");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://greatest-dev-jokes.netlify.app'],
  })
);

app.get('/', (_req, res) => {
  res.json(devpun.list());
});

app.get("/random", (_req, res) => {
  const randomJoke = devpun.random();
  res.json(randomJoke); // Returns a random joke
});

app.get("/by-category", (req, res) => {
  const categoryName = req.query.name;
  
  if (!categoryName) {
    res.sendStatus(400);
  }

  const jokesByCategory = devpun.list(categoryName);
  res.json(jokesByCategory); // Returns all jokes of a specific category
});

app.get("/by-search", (req, res) => {
  const searchTerm = req.query.text;

  if (!searchTerm) {
    res.sendStatus(400);
  }

  const allJokes = devpun
    .list()
    .filter((joke) =>
      joke.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
    );

  res.json(allJokes); // Returns all jokes which contain the given search term in the text (it's case-insensitive)
});

app.get("/categories", (_req, res) => {
  const categories = objOfJokes
    .map((joke) => joke.tags)
    .reduce((acc, tags) => [...acc, ...tags], []);

  const unduplicatedCategories = Array.from(new Set(categories));

  res.json(unduplicatedCategories); // Returns all joke categories
});

app.get("/popular", (_req, res) => {
  const popularJokes = objOfJokes
    .filter((joke) => joke.rating == 1)
    .map((joke) => joke.text);
  res.json(popularJokes); // Returns the most popular jokes (the jokes with a rating of 1)
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});


