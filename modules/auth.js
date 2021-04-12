const passport = require("koa-passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const User = require("../models/user");

const fetchUser = async (id) => {
  const user = await User.findById(id);
  return user;
};

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  "jwt",
  new Strategy(options, async (payload, done) => {
    const user = await fetchUser(payload.id);
    if (user) return done(null, user);
    return done(null, false);
  })
);

module.exports.isJWTAuthenticated = async (ctx, next) => {
  return passport.authenticate("jwt", async (err, user) => {
    if (user) {
      ctx.state.user = user;
      return next();
    }

    ctx.status = 403;
  })(ctx, next);
};
