const Category = require("../models/category");
const { bodyData, bodyError } = require("../types");

module.exports.GetCategories = async (ctx) => {
  try {
    const categories = await Category.find({});
    ctx.body = bodyData(categories);
  } catch (e) {
    ctx.body = bodyError(e.message);
  }
};
