const Router = require("koa-router");
const router = new Router({ prefix: "/api" });
const { isJWTAutheticated } = require("./auth");

const Investor = require("../controllers/investor");
router.post("/investors/register", Investor.Register);

const User = require("../controllers/user");
router.post("/verify-email", User.VerifyEmail);
router.post("/auth", User.Auth);

module.exports = router;
