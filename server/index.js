const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const tasksRoute = require('./routes/tasks');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI );

app.use('/tasks', tasksRoute);

app.listen(4000, () => console.log('Server running '));
