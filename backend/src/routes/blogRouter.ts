import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify, decode } from "hono/jwt";
import {
  createblogInput,
  updateblogInput,
} from "@thakurharshit18/medium-common";
export const BlogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

BlogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("Authorization") || "";
  try {
    const user = await verify(authHeader, c.env.JWT_SECRET);
    if (user) {
      //@ts-ignore
      c.set("userId", user.id);
      await next();
    } else {
      c.status(403);
      return c.json({
        message: "you are not logged in",
      });
    }
  } catch (error) {
    c.status(403);
    return c.json({
      message: "you have not provided the correct credentials",
    });
  }
});

BlogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const authorId = c.get("userId");
  const body = await c.req.json();

  const { success } = createblogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "the inputs are not valid",
    });
  }
  try {
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: Number(authorId),
      },
    });
    return c.json({
      id: blog.id,
    });
  } catch (error) {}
});
BlogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const { success } = updateblogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "these Inputs are not valid",
    });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({
      id: blog.id,
    });
  } catch (error) {
    c.json({ msg: error });
  }
});

BlogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const blogs = await prisma.blog.findMany();
  return c.json({
    blogs,
  });
});

BlogRouter.get("/:id", async (c) => {
  const id = await c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id: Number(id),
      },
    });
    return c.json({
      blog,
    });
  } catch (error) {
    c.status(411);
    return c.json({
      message: "error while fetching blog post ",
    });
  }
});

//pagination left here
