const express = require('express');
const app = express();


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
// Define a route for /api/:date?
// Define a route for /api/:date?
app.get('/api/:date?', (req, res) => {
  // Get the date parameter from the request
  const dateString = req.params.date;
  let date;

  // If date parameter is empty, use current time
  if (!dateString) {
      date = new Date();
  } else {
      // Check if the date string is a valid Unix timestamp
      if (/^\d+$/.test(dateString)) {
          date = new Date(parseInt(dateString));
      } else {
          // Attempt to parse the date
          date = new Date(dateString);
          
          // Check if the date is invalid
          if (isNaN(date.getTime())) {
              return res.json({ error: "Invalid Date" });
          }
      }
  }

  // Return JSON object with unix and utc keys
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});
// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
