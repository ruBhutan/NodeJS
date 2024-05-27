const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// it will take json data as input from requests/frontend
app.use(express.json());
app.use(cors());

const categoryRoute = require('./modules/category/router');

app.use('/category',categoryRoute);

app.get('/', (request, response)=>{
    response.send('API is running');
}); 

app.listen(8000, (req, res)=>{
    console.log('Server is running on port 8000');
    mongoose.connect(
        "mongodb+srv://admin:admin@cluster0.po056wz.mongodb.net/expense?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true },).then((_) => {
        console.log('Connected to DB');
    }).catch(err => {
        console.log(err);
    });
});

// mongodb+srv://admin:admin@cluster0.po056wz.mongodb.net/databasename?retryWrites=true&w=majority&appName=Cluster0