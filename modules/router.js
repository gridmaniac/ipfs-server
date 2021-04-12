const Router = require("koa-router");
const router = new Router({ prefix: "/api" });
const { isJWTAuthenticated } = require("./auth");

const User = require("../controllers/user");
router.post("/verify-email", User.VerifyEmail);
router.post("/investors/register", User.RegisterAsInvestor);
router.post("/inventors/register", User.RegisterAsInventor);
router.post("/auth", User.Auth);
router.get("/profile", isJWTAuthenticated, User.GetProfile);

const File = require("../controllers/file");
router.post("/files/upload", File.UploadFile);

const Idea = require("../controllers/idea");
router.get("/ideas", isJWTAuthenticated, Idea.GetIdeas);

module.exports = router;
