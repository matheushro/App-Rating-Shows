const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const api = express();
const porta = 3000;
const router = express.Router();

const home = require('./router/homeRouter');
const shows = require('./router/showsRouter');
const users = require('./router/userRouter');

api.use(cors());
api.use(bodyparser.urlencoded({extended: true}));

api.use("/", router);
api.use("/home", home);
api.use("/shows", shows);
api.use("/users", users);
api.listen(porta);
console.log('Run API Express');