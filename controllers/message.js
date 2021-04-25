const Message = require("../models/message");
const FollowUp = require("../models/follow-up");
const { bodyData, bodyError } = require("../types");

module.exports.GetByFollowUpId = async (ctx) => {
  try {
    const { id } = ctx.request.params;
    const messages = await Message.find({ followUp: id }, null, {
      sort: {
        date: 1,
      },
    }).populate("author");

    ctx.body = bodyData(messages);
  } catch (e) {
    ctx.body = bodyError(e.message);
  }
};

module.exports.AddMessage = async (ctx) => {
  try {
    const { user } = ctx.state;
    const { id, text } = ctx.request.body;

    const message = new Message({
      followUp: id,
      author: user._id,
      text,
    });

    await message.save();

    await FollowUp.updateOne({ _id: id }, { isStarted: true });
    const messages = await Message.find({ followUp: id }, null, {
      sort: {
        date: 1,
      },
    }).populate("author");

    ctx.body = bodyData(messages);
  } catch (e) {
    ctx.body = bodyError(e.message);
  }
};
