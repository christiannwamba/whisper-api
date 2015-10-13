var _ = require('lodash');
module.exports = function(req, res, next) {
  //Token defaults to body,quer,param
  var token = req.param.token || req.query.token;

  //If it exists in the header, use it
  if (req.headers && req.headers.authorization) {
    var parts = req.headers.authorization.split(' ');
    if (parts.length == 2) {
      var scheme = parts[0],
        credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    } else {
      return res.json(401, {
        err: 'Format is Authorization: Bearer [token]'
      });
    }
  }

  if (req.body && req.body.token) {
    token = req.body.token;
  }

  if (token) {
    jwt.verify(token, function(err, token) {
      if (err) return res.json(401, {
        err: 'Invalid Token!'
      });
      Users.find({
        id: token.user.id
      }).populate('roles').then(function(user) {
        req.roles = user.roles; req.token = token;
        var isAdmin = _.result(_.find(user[0].roles, { 'name': 'Admin'}), 'name') === 'Admin';
        if (isAdmin) {
          next();
        } else {
          res.json(401, {
            err: 'Unauthorized: You are not an Administrator'
          });
        }

      });
    });
  } else {
    return res.json(401, {
      err: 'No token found'
    });
  }
};
