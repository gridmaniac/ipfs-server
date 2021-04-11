module.exports.bodyData = (data) => data;
module.exports.bodyError = (msg) => {
  return { err: msg };
};
