const Startup = require('../models/startup');

function indexRoute(req, res, next) {
  Startup
    .find()
    .populate('createdBy')
    .exec()
    .then((startups) => res.render('startups/index', { startups }))
    .catch(next);
}

function newRoute(req, res) {
  return res.render('startups/new');
}

function createRoute(req, res, next) {
  req.body.createdBy = req.user && req.user._id;

  Startup
    .create(req.body)
    .then(() => {
      console.log(req.body);
      res.redirect('/startups');
    })
    .catch((err) => {
      console.log(err);
      if(err.name === 'ValidationError') return res.badRequest('/startups/new', err.toString());
      next(err);
    });
}

function showRoute(req, res, next) {
  Startup
    .findById(req.params.id)
    .populate('createdBy comments.createdBy')
    .exec()
    .then((startup) => {
      if(!startup) return res.notFound();
      return res.render('startups/show', { startup });
    })
    .catch(next);
}

function editRoute(req, res, next) {
  Startup
    .findById(req.params.id)
    .exec()
    .then((startup) => {
      if(!startup) return res.redirect();
      if(!startup.belongsTo(req.user)) return res.unauthorized(`/startups/${startup.id}`, 'You do not have permission to edit that resource');
      return res.render('startups/edit', { startup });
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  Startup
    .findById(req.params.id)
    .exec()
    .then((startup) => {
      if(!startup) return res.notFound();
      if(!startup.belongsTo(req.user)) return res.unauthorized('You do not have permission to edit that resource');

      for(const field in req.body) {
        startup[field] = req.body[field];
      }

      return startup.save();
    })
    .then(() => res.redirect(`/startups/${req.params.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/startups/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function deleteRoute(req, res, next) {
  Startup
    .findById(req.params.id)
    .exec()
    .then((startup) => {
      if(!startup) return res.notFound();
      if(!startup.belongsTo(req.user)) return res.unauthorized('You do not have permission to delete that resource');
      return startup.remove();
    })
    .then(() => res.redirect('/startups'))
    .catch(next);
}

function createCommentRoute(req, res, next) {
  Startup
    .findById(req.params.id)
    .exec()
    .then(startup => {
      if (!startup) return res.notFound();

      req.body.createdBy = req.user;
      startup.comments.push(req.body);

      return startup.save();
    })
    .then(() => res.redirect(`/startups/${req.params.id}`))
    .catch((err) => {
      if (err.name === 'ValidationError') res.badRequest(`/startups/${req.params.id}`, err.toString());
      next(err);
    });
}

function deleteCommentRoute(req, res, next) {
  Startup
    .findById(req.params.id)
    .exec()
    .then((startup) => {
      if(!startup) return res.notFound();
      // get the embedded record by its id
      const comment = startup.comments.id(req.params.commentId);
      comment.remove();

      return startup.save();
    })
    .then((startup) => res.redirect(`/startups/${startup.id}`))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute
};
