const crypto = require("crypto");

module.exports.generateSalt = async function () {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(32, function (err, salt) {
      if (err) return reject(err);
      resolve(salt);
    });
  });
};
