const FollowUp = require("../models/follow-up");
const Idea = require("../models/idea");
const Message = require("../models/message");
const { sendMail } = require("../modules/mail");
const { bodyData, bodyError } = require("../types");

module.exports.Start = async (ctx) => {
  try {
    const { user } = ctx.state;
    const { id } = ctx.request.body;

    const idea = await Idea.findOne({ _id: id }).populate("user");

    const count = await FollowUp.count({
      inventor: idea.user._id,
      investor: user._id,
      idea: id,
    });

    if (count > 0) throw new Error("Follow-up already exists");

    const followUp = new FollowUp({
      inventor: idea.user._id,
      investor: user._id,
      idea: id,
    });

    await followUp.save();
    await sendMail(
      idea.user.email,
      "Investor expressed interest in your idea",
      `<p>Congratulations!</p><p>Investor wants to know more about your idea. You can send follow-up message <a href="${process.env.SENDGRID_DOMAIN}/follow-up/${followUp._id}" target="_blank">here</a></p>`
    );

    ctx.body = bodyData({});
  } catch (e) {
    ctx.body = bodyError(e.message);
  }
};

module.exports.GetById = async (ctx) => {
  try {
    const { id } = ctx.request.params;
    const followUp = await FollowUp.findOne({ _id: id })
      .populate("idea")
      .populate("investor");

    const messagesCount = await Message.count({ followUp: id });

    ctx.body = bodyData({
      followUp,
      hasMessages: messagesCount > 0,
    });
  } catch (e) {
    ctx.body = bodyError(e.message);
  }
};

module.exports.GetByUser = async (ctx) => {
  try {
    const { user } = ctx.state;
    const followUps = await FollowUp.find(
      {
        $or: [{ inventor: user._id }, { investor: user._id }],
        isStarted: true,
      },
      null,
      { sort: { date: -1 } }
    ).populate("idea");

    ctx.body = bodyData(followUps);
  } catch (e) {
    ctx.body = bodyError(e.message);
  }
};
