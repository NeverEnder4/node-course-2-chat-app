const path = require('path');
const express = require('express');

//Path to index.html
const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;

//Express method for routes
var app = express();

//Serves static assets from specifed path
app.use(express.static(publicPath));

//Specifies port to run server on
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})
