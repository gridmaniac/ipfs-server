const Category = require("../../models/category");
const categories = require("./categories.json");

module.exports = async function () {
  for (let x of categories) {
    const category = new Category({ title: x });
    await category.save();
  }
};
