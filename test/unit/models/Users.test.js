var expect = require("expect.js");

describe('UsersModel', function() {

  describe('#find()', function() {
    it('expect users to be an array', function(done) {
      Users.find()
        .then(function(users) {
          expect(users).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });
});
