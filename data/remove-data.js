require('dotenv').config({ path: __dirname + '/../variables.env' });
const fs = require('fs');

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

// import all of our models - they need to be imported only once
const User = require('../models/User');
const Game = require('../models/Game');
const Solution = require('../models/Solution');


async function deleteData() {
  console.log('Goodbye Data...');
  await User.deleteMany();
  await Solution.deleteMany();
  await Game.deleteMany();
  console.log('Data Deleted.');
  process.exit();
}

deleteData();
