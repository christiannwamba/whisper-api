/**
 * isAuthorized
 *
 * @description :: Policy to check if user is authorized with JSON web token
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

module.exports = function(req, res, next) {
  //Token defaults to body,quer,param
  var token = req.body.token || req.param.token || req.query.token;

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

  if (token) {
    jwToken.verify(token, function(err, token) {
      if (err) return res.json(401, {
        err: 'Invalid Token!'
      });
      req.token = token; // This is the decrypted token or the payload you provided
      next();
    });
  } else {
    return res.json(401, {
      err: 'No Authorization header was found'
    });
  }

};
