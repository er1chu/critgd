module.exports = {

  /* e.g.
  sayHello: function (req, res) {
    res.send('hello world!');
  }
  */

  // This loads the sign-up page --> new.ejs
  'new': function (req, res) {
          res.view();
  },

  create: function (req, res) {
    var username = req.param('username');
    var password = req.param('password');
    // Users.findByUsername(username)...
    // In v0.9.0 the find method returns an empty array when no results are found
    // when only one result is needed use findOne.
    Users.findOneByUsername(username)
    .done(function signupfindUser(err, usr){
      if (err) {
        // We set an error header here,
        // which we access in the views an display in the alert call.
        res.set('error', 'DB Error');
        // The error object sent below is converted to JSON
        res.send(500, { error: "DB Error" });
      } else if (usr) {
        // Set the error header
        res.set('error', 'Username already Taken');
        res.send(400, { error: "Username already Taken"});
      } else {
        var hasher = require("password-hash");
        password = hasher.generate(password);

        Users.create({ username: username, password: password })
        .done(function signupCreatUser(error, user) {
          if (error) {
            // Set the error header
            res.set('error', 'DB Error');
            res.send(500, { error: "DB Error" });
          } else {
            req.session.user = user;
            res.send(user);
            res.redirect('/chat');
          }
        });
      }
    });
  },

        // render the profile view (e.g. /views/show.ejs)
  show: function (req, res, next) {
    Users.findOne(req.param('id'), function foundUsers (err, users) {
      if (err) return next(err);
      if (!users) return next();
      res.view({
        users: users
      });
    });
  }

};