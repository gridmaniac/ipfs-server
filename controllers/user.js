const User = require("../models/user");
const { bodyData, bodyError } = require("../types");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

module.exports.VerifyEmail = async (ctx) => {
  try {
    const { email } = ctx.request.body;

    const count = await User.count({ email });
    if (count > 0) throw new Error("Email is already taken");

    ctx.body = bodyData({});
  } catch (e) {
    ctx.body = bodyError(e.message);
  }
};

module.exports.Auth = async (ctx) => {
  try {
    const { email, password } = ctx.request.body;

    const user = await User.findOne({ email });
    if (!user) throw new Error("Incorrect email or password");

    const isOk = await argon2.verify(user.passwordHash, password);
    if (!isOk) throw new Error("Incorrect email or password");

    const payload = {
      id: user.id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    ctx.body = bodyData({ token });
  } catch (e) {
    ctx.body = bodyError(e.message);
  }
};

module.exports.RegisterAsInvestor = async (ctx) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      paymentDetails,
    } = ctx.request.body;

    const count = await User.count({ email });
    if (count > 0) throw new Error("Email is already taken");

    const passwordHash = await argon2.hash(password);

    const user = new User({
      firstName,
      lastName,
      email,
      passwordHash,
      role: "investor",
      paymentDetails,
    });

    await user.save();

    const payload = {
      id: user.id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);
    ctx.body = bodyData({ token });
  } catch (e) {
    ctx.body = bodyError(e.message);
  }
};

module.exports.RegisterAsInventor = async (ctx) => {
  try {
    const { firstName, lastName, email, password } = ctx.request.body;

    const count = await User.count({ email });
    if (count > 0) throw new Error("Email is already taken");

    const passwordHash = await argon2.hash(password);

    const user = new User({
      firstName,
      lastName,
      email,
      passwordHash,
      role: "inventor",
    });

    await user.save();

    const payload = {
      id: user.id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);
    ctx.body = bodyData({ token });
  } catch (e) {
    ctx.body = bodyError(e.message);
  }
};

module.exports.GetProfile = async (ctx) => {
  try {
    const { user } = ctx.state;
    ctx.body = bodyData(user);
  } catch (e) {
    ctx.body = bodyError(e.message);
  }
};
