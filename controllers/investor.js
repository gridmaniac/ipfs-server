const User = require("../models/user");
const { bodyData, bodyError } = require("../types");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

module.exports.Register = async (ctx) => {
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
