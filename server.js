const express = require('express');
const cors_proxy = require('cors-anywhere');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

const url = 'https://us-central1-mobile-assignment-server.cloudfunctions.net/weather';

//enables cors
app.use(bodyParser.json());
cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
    })

    //general weather - get all data
app.get('/api/weather', async (req, res) => {
   await axios
        .get(`${url}`)
        .then(function (response) {
            // console.log(response);
            var body = response.data;
            res.json(body);
            // console.log(body)
        })
        .catch(err => console.log(err));
});


app.listen(process.env.PORT || 5000, function() {
    console.log("Server started on port 5000 :)");
  });
  
  
  module.exports = app;