const { bodyData, bodyError } = require("../types");
const IPFS = require("../modules/ipfs");
const ipfs = new IPFS();

module.exports.UploadFile = async (ctx) => {
  try {
    const { file } = ctx.request.files;
    const cid = await ipfs.addFile(file.path);

    ctx.body = bodyData({
      name: file.name,
      cid,
    });
  } catch (e) {
    ctx.body = bodyError(e.message);
  }
};
