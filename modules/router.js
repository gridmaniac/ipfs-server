const Router = require("koa-router");
const router = new Router({ prefix: "/api" });
const { isJWTAuthenticated } = require("./auth");

const User = require("../controllers/user");
router.post("/verify-email", User.VerifyEmail);
router.post("/investors/register", User.RegisterAsInvestor);
router.post("/inventors/register", User.RegisterAsInventor);
router.post("/auth", User.Auth);
router.get("/profile", isJWTAuthenticated, User.GetProfile);
router.get("/investors/:id", isJWTAuthenticated, User.GetInvestorById);

const File = require("../controllers/file");
router.post("/files/upload", File.UploadFile);

const Idea = require("../controllers/idea");
router.get("/user/ideas", isJWTAuthenticated, Idea.GetUserIdeas);
router.get("/ideas", isJWTAuthenticated, Idea.GetAllIdeas);
router.get("/ideas/:id", isJWTAuthenticated, Idea.GetById);
router.post("/category/:id/ideas", isJWTAuthenticated, Idea.GetByCategory);
router.post("/ideas", isJWTAuthenticated, Idea.CreateIdea);
router.post("/ideas/:id", isJWTAuthenticated, Idea.UpdateIdea);

const Category = require("../controllers/category");
router.get("/categories", isJWTAuthenticated, Category.GetCategories);

module.exports = router;
