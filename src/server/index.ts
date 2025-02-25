// src/index.ts
import Fastify, { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import newsletterRoutes from "../routes/newsletter";

const prisma = new PrismaClient();

async function startServer(): Promise<FastifyInstance> {
  const fastify = Fastify({
    logger: {
      transport: {
        target: "pino-pretty",
        options: {
          translateTime: "HH:MM:ss Z",
          ignore: "pid,hostname",
        },
      },
    },
  });

  await fastify.register(newsletterRoutes, { prefix: "/api" });

  const port = Number(process.env.PORT) || 3000;
  const host = "0.0.0.0";

  try {
    await fastify.listen({ port, host });
    fastify.log.info(`Server running on http://${host}:${port}`);
    return fastify;
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

async function shutdown(server: FastifyInstance) {
  server.log.info("Shutting down server...");
  await server.close();
  await prisma.$disconnect();
  server.log.info("Server and Prisma disconnected.");
  process.exit(0);
}

const serverPromise = startServer();

process.on("      ", async () => {
  const server = await serverPromise;
  await shutdown(server);
});

process.on("SIGTERM", async () => {
  const server = await serverPromise;
  await shutdown(server);
});
