module.exports = {
  attributes: {
    type: {
      type: 'string',
      required: 'true',
      unique: true
    },
    users:{
      model:'users'
    }
  }
};
