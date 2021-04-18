const Idea = require("../models/idea");
const { bodyData, bodyError } = require("../types");

module.exports.GetUserIdeas = async (ctx) => {
  try {
    const { user } = ctx.state;
    const ideas = await Idea.find({ user: user.id });

    ctx.body = bodyData(ideas);
  } catch (e) {
    ctx.body = bodyError(e.message);
  }
};

module.exports.GetAllIdeas = async (ctx) => {
  try {
    const ideas = await Idea.find({ isPublished: true }).populate("user");
    ctx.body = bodyData(ideas);
  } catch (e) {
    ctx.body = bodyError(e.message);
  }
};

module.exports.GetByCategory = async (ctx) => {
  try {
    const { category } = ctx.request.params;
    const ideas = await Idea.find({ category });
    ctx.body = bodyData(ideas);
  } catch (e) {
    ctx.body = bodyError(e.message);
  }
};

module.exports.GetById = async (ctx) => {
  try {
    const { id } = ctx.request.params;
    const idea = await Idea.findOne({ _id: id }).populate("category");
    ctx.body = bodyData(idea);
  } catch (e) {
    ctx.body = bodyError(e.message);
  }
};

module.exports.CreateIdea = async (ctx) => {
  try {
    const { user } = ctx.state;

    const x = new Idea({
      user: user.id,
      ...ctx.request.body,
    });

    await x.save();

    ctx.body = bodyData({});
  } catch (e) {
    ctx.body = bodyError(e.message);
  }
};

module.exports.UpdateIdea = async (ctx) => {
  try {
    const { user } = ctx.state;
    const { id } = ctx.request.params;

    await Idea.update({ _id: id, user: user.id }, ctx.request.body);

    ctx.body = bodyData({});
  } catch (e) {
    ctx.body = bodyError(e.message);
  }
};
