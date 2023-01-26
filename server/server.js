const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('../client/dist'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const router = express.Router();

// As there is only 1 route here, I've moved it to the main file.
// require('./routes/htmlRoutes')(app);

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '../client/dist/index.html'))
);

app.use(`/`, router);

app.listen(
  PORT
  , () => console.log(`\n\n----------------------------\n\n🆗  You are now listening on port ➡️➡️➡️  http://localhost:${PORT}  🆗\n\n----------------------------\n\n`)
  );

  module.exports = app;
