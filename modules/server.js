const Koa = require("koa");
const app = new Koa();
const bodyParser = require("koa-bodyparser");
const router = require("./router");
const cors = require("@koa/cors");
const serve = require("koa-static");
const path = require("path");

app
  .use(cors())
  .use(bodyParser({ jsonLimit: "5mb" }))
  .use(serve(path.join(__dirname, "../public")))
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(process.env.PORT);
