const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('../client/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/htmlRoutes')(app);

app.listen(PORT, () => console.log(`\n\n----------------------------\n\n🆗  You are now listening on port ➡️➡️➡️  http://localhost:${PORT}  🆗\n\n----------------------------\n\n`));
