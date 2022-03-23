require('dotenv').config();

const express=require('express');
const app=express();
const mongoose = require('mongoose');

const routes = require('./app/routes/banner.routes'); 


app.use(express.json());

app.use('/', routes);

app.use('/uploads', express.static('./uploads'));



app.listen(3000, () =>
  console.log('app listening on port 3000!'),
);

mongoose.connect('mongodb+srv://dk:dk123@cluster0.hg9p0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    (err) => {
        if (err) return console.log("Error: ", err);
        console.log("MongoDB Connected")
    }
);