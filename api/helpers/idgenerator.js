var crypto = require('crypto');
var format = require('biguint-format');

module.exports = {
    generator: function () {
      var id = format(
                crypto.randomBytes(16),
                'hex',
                { prefix: '0x' });
      return id;
    }
};