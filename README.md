# Fullstack project

**Focus on implementing the full stack (backend and frontend). It's not important to have all the functionality in place.**

Write a web server, which delivers jokes as json data. The React frontend displays the jokes.

Create one folder for the backend and one folder for the frontend. Track the changes for each of them in a separate GitHub repository. When creating the repositories with GitHub, add the MIT License, as the library you will be using has the same licence: https://github.com/elijahmanor/devpun/blob/master/LICENSE

<img src="./MIT-licence.png" alt="drawing" width="500"/>

## Backend with Node.js + Express

Write an [express](https://expressjs.com/) web server with the following routes:

```bash
GET /random # returns a random joke

GET /by-category?name=<category-name> # returns all jokes of a specific category
# Example:
GET /by-category?name=react # returns all react jokes

GET /search?text=<search-term> # returns all jokes which contain the given search term in the text (should be case-insensitive)
# Example:
GET /search?text=component # returns all jokes which contain "component" in the text

(optional)
GET /categories # returns all joke categories

(optional)
GET /popular # returns the most popular jokes (the jokes with a rating of 1)
```

The question mark in the urls are [query parameters](https://branch.io/glossary/query-parameters/). See this article about [Query Parameters in Express](https://masteringjs.io/tutorials/express/query-parameters) how you can read them when handling the request.

Use the [devpun](https://www.npmjs.com/package/devpun) library to get the jokes. This library will not provide all the functionality you need. For example, it does not provide you with a method to get the most popular jokes. However, you can import `jokes.json` in your project and implement the logic by yourself:

```js
const jokesDB = require('devpun/jokes.json');
```

In order to have the backend application on one domain and the frontend application on another, [allow CORS requests](https://expressjs.com/en/resources/middleware/cors.html) for localhost and your frontend domain when published on Netlify.<br />
[More about CORS](https://www.youtube.com/watch?v=4KHiSt0oLJ0)

```js
app.use(
  cors({
    origin: ['http://localhost:3000', '<deployed URL>'],
  })
);
```

Deploy the server on [Heroku](https://www.heroku.com/). In order to make the deployment work, add the following code to your `package.json` file:

```json
"engines": {
    "node": "16.13.0" // Enter your Node.js version here (run "node -v" in your terminal)
}
```

_Hint: How to remove duplicate values (for /categories)_

```js
const numbers = Array.from(new Set([1, 1, 2, 3, 3]));
// numbers is [1, 2, 3]
```

## Frontend with React

Create a react application with the following pages:

- Random joke
- Jokes by category
- Joke search
- Popular jokes (optional)
- 404 / not found (optional)

Create the GitHub repository first (see licence information above), clone the repository and create the react application directly within the cloned folder:

```
npx create-react-app .
```

Use your backend to get the jokes. Some of them arrive in the following format:

```json
"q. <question text> a. <answer text>"
```

You can display it directly like that or split it into question and answer. If you want to split it, here's the code to do that:

```js
const questionChars = 'q. ';
const answerChars = 'a. ';

const splitQuestionAndAnswer = (jokeString) => {
  if (jokeString.includes(questionChars) && jokeString.includes(answerChars)) {
    const question = jokeString.substring(questionChars.length, jokeString.indexOf(answerChars) - 1);
    const answer = jokeString.substring(jokeString.indexOf(answerChars) + answerChars.length);

    return {
      question,
      answer,
      text: null,
    };
  }

  return {
    question: null,
    answer: null,
    text: jokeString,
  };
};
```

### Randome joke page

- Route: `/random`
- This is the homepage. When the user opens the page with route `/`, redirect the user to this page.
- Display a random joke on the page.

### Jokes by category page

- Route: `/by-category`
- Display a button for each category. Either hardcode the categories as array in your frontend application (see [list of all the tags](https://github.com/elijahmanor/devpun#tags)) or load the categories from your backend with `GET /categories`.
- After clicking a category button, load the jokes of this category and display them on the page.

### Joke search page

- Route: `/search`
- Display a search field and a submit button. After submitting, load the jokes which contain the search term and display them on the page.
- Inform the user when no joke was found.

### Popular jokes page (optional)

- Route: `/popular`
- Load the most popular jokes and display them on the page.

### 404 / not found page (optional)

- Route: any route, which does not lead to a page.
- Display a nice message to the user that the requested page does not exist.

Deploy your site on [Netlify](https://www.netlify.com/).

- To make the page reloads work, check out [this article about redirects on Netlify](https://ridbay.medium.com/react-routing-and-netlify-redirects-fd1f00eeee95).
