const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 8080;
//initialize express
const app = express();
const path = require('path');

//enable body parser
app.use(express.json());
//this allows to accept body data. 
app.use(express.urlencoded({extended: false}));

//setup static folder added also path module above to do so. 
app.use(express.static(path.join(__dirname, 'public')));

app.use('/openai', require('./routes/openaiRoutes'));

app.listen(port, () => console.log(`Servers started on port ${port} 😎`));


