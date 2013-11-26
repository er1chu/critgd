module.exports = {

  /* e.g.
  sayHello: function (req, res) {
    res.send('hello world!');
  }
  */

  // This loads the sign-up page --> new.ejs
        // render the profile view (e.g. /views/show.ejs)
  show: function (req, res, next) {
    Messages.findOne(req.param('id'), function foundMessages (err, messages) {
      if (err) return next(err);
      if (!messages) return next();
      res.view({
        messages: messages
      });
    });
  }

};