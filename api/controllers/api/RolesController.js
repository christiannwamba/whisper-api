module.exports = {
  create: function(req, res) {
    Roles.create(req.body).exec(function(err, role) {
      if (err)
        res.json(err.status, {
          err: err
        });

      res.json(200, {
        newrole: role
      });

    });
  },
  find: function(req, res){
    Roles.find().populate('users').then(function(roles){
      res.json(200, {
        roles: roles, token:req.token, userroles:req.roles
      });
    });
  }
}
