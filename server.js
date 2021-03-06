const express = require('express');
const path = require('path');
var cors = require('cors');

var port = process.env.PORT || 8080;

const app = express();
app.use(cors());


//Set static folder
app.use(express.static(path.join(__dirname, 'dist/flightapp')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/flightapp/index.html'))
})

app.listen(port, () => console.log('Express server running on port ' + port));
