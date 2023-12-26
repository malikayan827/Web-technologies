const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const ejs = require('ejs');

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



// Serve static files from the 'static' directory
app.use(express.static(path.join(__dirname, 'static')));
app.use('/',require(path.join(__dirname, 'routes/blog.js')));

app.listen(port, () => {
    console.log(`blogapp is running at http://localhost:${port}`);
});