const express = require('express');
const router  = express.Router();

// const staticsController = require('../controllers/statics');
const registrationsController = require('../controllers/registrations');
const sessionsController = require('../controllers/sessions');
const startupsController = require('../controllers/startups');
const secureRoute = require('../lib/secureRoute');

// RESTful routes
// All URLS should contain the PLURAL... don't chose octopus or people or something silly.

router.route('/')
  .get((req, res) => res.render('statics/home', { className: 'home' }));

// INDEX
router.route('/startups')
  .get(startupsController.index)
  .post(secureRoute, startupsController.create);

// NEW
router.route('/startups/new')
  .get(secureRoute, startupsController.new);

// SHOW
router.route('/startups/:id')
  .get(startupsController.show)
  .put(secureRoute, startupsController.update)
  .delete(secureRoute, startupsController.delete);

// EDIT
router.route('/startups/:id/edit')
  .get(secureRoute, startupsController.edit);

// CREATE
router.route('/startups/:id/comments')
  .post(secureRoute, startupsController.createComment);

// UPDATE

// DELETE
router.route('/startups/:id/comments/:commentId')
  .delete(secureRoute, startupsController.deleteComment);

// REGISTER
router.route('/register')
  .get(registrationsController.new)
  .post(registrationsController.create);

//LOGIN
router.route('/login')
  .get(sessionsController.new)
  .post(sessionsController.create);

//LOGOUT
router.route('/logout')
  .get(sessionsController.delete);

//ELSE
router.all('*', (req, res) => res.notFound());

module.exports = router;
