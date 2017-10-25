const User = require('../models/user');

//Function that renders the registration form
function registrationNew(req, res) {
  return res.render('registrations/new');
}

//Function that creates the new user
function registrationCreate(req, res, next){
  User
    .create(req.body)
    .then(() => res.redirect('/login'))
    .catch((err) => {
      console.log(err);
      console.log(err.name);
      if(err.name === 'ValidationError')
        return res.badRequest('/register', err.toString());
      next(err);
    });
}

/*

function registrationShow(req, res) {
  // return res.render('registrations/show'); //the folder does not exist yet, create one.
}

function registrationEdit(req, res) {
  // return res.render('registrations/edit');  //create an action
}

function registrationUpdate(req, res, next) {
  for(const field in req.body) {
    req.user[field] = req.body[field];
  }

  req.user.save()
    .then(() => res.redirect('/profile')) //create an action /profile
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest('/profile/edit', err.toString()); //create an action or a folder?
      next(err);
    });
}

function registrationDelete(req, res, next) {
  return req.user.remove()
    .then(() => {
      req.session.regenerate(() => res.redirect('/'));
    })
    .catch(next);
}

*/

//export it
module.exports = {
  new: registrationNew,
  create: registrationCreate
  // show: registrationShow,
  // edit: registrationEdit,
  // update: registrationUpdate,
  // delete: registrationDelete
};
