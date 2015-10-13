module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: 'true',
      unique: true
    },
    users:{
      collection:'users',
      via:'roles'
    }
  }
};
