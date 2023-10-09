const express= require('express');
const app = express();
const dbConnect= require('./config/database');
const cloudConnect = require('./config/cloudConnect');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('./routes/routes');
const fileUpload = require('express-fileupload');
require('dotenv').config();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.use(routes);


dbConnect();
cloudConnect();

app.listen(process.env.PORT,()=>{console.log("Server started on port " + process.env.PORT)})