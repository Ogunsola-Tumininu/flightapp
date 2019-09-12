const express = require('express');
const path = require('path');

var port = process.env.PORT || 8080;

const app = express();

//Set static folder
app.use(express.static( 'dist/flightapp'));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/flightapp/index.html'))
})

app.listen(port, () => console.log('Express server running on port ' + port));
