const express = require('express')
const app = express();
const http = require('http');
const morgan = require('morgan');
const cors = require('cors');
const router = require("./src/Routes/index")
require("dotenv").config();


// Request routes


// Env
const port = process.env.PORT

// Running Express Server
const server = http.createServer(app);

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(cors())
app.use('/', router);



// Checking Running
server.listen(port, () => {
    console.log(`Service Running on Port ${port}`)
})
