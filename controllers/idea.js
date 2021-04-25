const Idea = require("../models/idea");
const FollowUp = require("../models/follow-up");
const Message = require("../models/message");
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
    const { id } = ctx.request.params;
    const { search } = ctx.request.body;

    const query = {
      category: id,
      isPublished: true,
    };

    let searchQuery = {};
    if (search)
      searchQuery = {
        $or: [
          { title: { $regex: ".*" + search + ".*", $options: "i" } },
          { profit: { $regex: ".*" + search + ".*", $options: "i" } },
          { details: { $regex: ".*" + search + ".*", $options: "i" } },
        ],
      };

    const ideas = await Idea.find({
      ...query,
      ...searchQuery,
    });
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

    await Idea.updateOne({ _id: id, user: user.id }, ctx.request.body);

    ctx.body = bodyData({});
  } catch (e) {
    ctx.body = bodyError(e.message);
  }
};

module.exports.GetInteractables = async (ctx) => {
  try {
    const { user } = ctx.state;
    const { id } = ctx.request.params;

    const followUp = await FollowUp.findOne({
      investor: user._id,
      idea: id,
    });

    let messagesCount = 0;

    if (followUp)
      messagesCount = await Message.count({ followUp: followUp._id });

    const data = {
      isFollowedUp: !!followUp,
      isDownloadable: messagesCount > 0,
    };

    ctx.body = bodyData(data);
  } catch (e) {
    ctx.body = bodyError(e.message);
  }
};
