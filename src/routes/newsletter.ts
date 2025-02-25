import { FastifyPluginAsync } from "fastify";
import { NewsletterController } from "../controllers/newsletter.controller";

const newsletterRoutes: FastifyPluginAsync = async (fastify, _opts) => {
  const controller = new NewsletterController();

  fastify.post("/newsletter", controller.register.bind(controller));
  fastify.get("/newsletter", controller.getAllSubs.bind(controller));
};

export default newsletterRoutes;
