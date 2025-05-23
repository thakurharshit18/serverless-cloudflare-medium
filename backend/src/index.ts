import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify, decode } from "hono/jwt";
import { userRouter } from "./routes/userRouter";
import { BlogRouter } from "./routes/blogRouter";
import { cors } from "hono/cors";
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();
app.use("/*", cors());

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", BlogRouter);

export default app;
