// Require the packages
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// setup the database
const { dbUri } = require('../config/environment');
mongoose.connect(dbUri, { useMongoClient: true });

// Require the model
const User = require('../models/user');
const Startup = require('../models/startup');

// Drop the model
User.collection.drop();
Startup.collection.drop();

// Create the models
User
  .create([{
    firstName: 'Ismail',
    lastName: 'Alami',
    username: 'Isma',
    email: 'ismail@ismail.com',
    password: 'password',
    passwordConfirmation: 'password'
  }])
  .then((users) => {
    console.log(`${users.length} users created`);
    return Startup
      .create([{
        name: 'VConnect',
        description: '"VConnect helps you hire local professionals for all your service needs. From repairing your car to planning your wedding, we’ll connect you with the best service businesses to get things done." - VConnect',
        industry: 'Service marketplace',
        founders: 'Tolaram Group',
        date: 2010,
        country: 'Nigeria',
        vision: 'The leading business discovery and     engagement platform in Africa.',
        mission: 'To simplify engagement between users and consumer service businesses in Africa.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/4/44/VConnect_new_Logo.png',
        createdBy: users[0]
      },{
        name: 'Flutterwave',
        description: '"We provide the underlying technology platform that allows businesses to make and accept payments anywhere in Africa." - Flutterwave',
        industry: 'Fin-tech',
        founders: 'Iyinoluwa Aboyeji',
        date: 2016,
        country: 'Kenya, Ghana, South Africa and Nigeria',
        vision: 'Flutterwave drives growth for banks and businesses across Africa through digital payment technology.',
        mission: 'To power a new wave of prosperity across Africa',
        image: 'https://outrepreneurs.com/wp-content/uploads/2017/08/Flutterwave-Logo.png',
        createdBy: users[0]
      },{
        name: 'LIfeQ',
        description: '"LifeQ wants people from all walks of life to enjoy optimal health. We implement a unique multidisciplinary approach underpinned by in depth knowledge and understanding of human physiology and systems biology to extract and deliver relevant and meaningful person-specific digital biomarkers from various curated data sources." - LifeQ',
        industry: 'Health',
        founders: '##',
        date: 2015,
        country: 'South Africa',
        vision: '"We are a world leading science and technogology company that wants people from all walks of life to enjoy optimal health" - LifeQ',
        mission: 'Maximise people\'s health',
        image: 'http://ventureburn.com/wp-content/uploads/2015/01/clipular-2.png',
        createdBy: users[0]
      }]);
  })
  .then((startups) => console.log(`${startups.length} startups created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
