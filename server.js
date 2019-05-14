const express = require('express');
const fs = require('fs');
const https = require('https');
const path = require('path');

// Init App
const app = express();

// Body parse middleware
app.use(express.urlencoded());
app.use(express.json());

// Use Routes
app.use("/api/users", require("./routes/api/users"));
// app.use("/api/login", require("./routes/api/login"));
app.use("/login", require("./routes/login"));

// Static Files
app.use(express.static('client/public'));

const port = process.env.port || 443;
const httpsOptions = {
    cert: fs.readFileSync(path.join(__dirname, 'ssl', 'pokyworld.local.crt')),
    key: fs.readFileSync(path.join(__dirname, 'ssl', 'pokyworld.local.key')),
};
https.createServer(httpsOptions, app)
    .listen(port, () => console.log(`Server started. Listening on port: ${port}`));