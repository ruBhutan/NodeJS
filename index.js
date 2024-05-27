const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// it will take json data as input from requests/frontend
app.use(express.json());
app.use(cors());

const categoryRoute = require('./modules/category/router');

app.use(categoryRoute);

app.get('/', (request, response)=>{
    response.send('API is running');
}); 

app.listen(8000, (req, res)=>{
    console.log('Server is running on port 8000');
});
