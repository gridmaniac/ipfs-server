const IPFS = require("ipfs-core");
const { createReadStream } = require("fs");

module.exports = class {
  constructor() {
    this.init();
  }

  async init() {
    try {
      this.ipfs = await IPFS.create();
    } catch (e) {
      console.error(e.message);
    }
  }

  async addFile(pathToFile) {
    try {
      const stream = createReadStream(pathToFile);

      const { path } = await this.ipfs.add({
        content: stream,
      });

      return path;
    } catch (e) {
      console.error(e.message);
    }
  }

  async getFiles(cid) {
    try {
      const files = await this.ipfs.get(cid);
      return files;
    } catch (e) {
      return [];
    }
  }

  async getFileLink(cid) {
    return `https://ipfs.io/ipfs/${cid}`;
  }
};
