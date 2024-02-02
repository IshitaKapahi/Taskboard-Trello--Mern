const express = require('express');
const app = express();
const connectDB = require('./db/dbConnection');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const port = process.env.PORT || 8080;
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')



//middleware for parsing json
app.use(express.json());

//Enabling cors
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));


//session & cookie
app.use(cookieParser());
app.use(bodyParser.json());

app.use(session({
    secret: 'secret', // a secret key to encrypt the session cookie
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 26,
        httpOnly: true

    } //set the session cookie properties
}))

//routes
app.use('/', authRoutes);
app.use('/tasks', taskRoutes);



//configure env
dotenv.config();


//database connect
connectDB();


app.listen(port, () => {
    console.log('Server is listening on Post 8080')
});