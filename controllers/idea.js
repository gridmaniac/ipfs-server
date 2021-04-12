const Idea = require("../models/idea");
const { bodyData, bodyError } = require("../types");

module.exports.GetIdeas = async (ctx) => {
  try {
    const { user } = ctx.state;
    const ideas = await Idea.find({ user: user.id });

    ctx.body = bodyData(ideas);
  } catch (e) {
    ctx.body = bodyError(e.message);
  }
};
