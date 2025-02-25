import { FastifyRequest, FastifyReply } from "fastify";
import { NewsletterService } from "../services/newsletter.service";
import { registerSchema, getAllSubsSchema } from "../zod/newsletterSchema";
import { z } from "zod";

export class NewsletterController {
  private readonly service: NewsletterService;

  constructor() {
    this.service = new NewsletterService();
  }

  async register(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { name, email } = registerSchema.parse(request.body);
      const user = await this.service.register({ name, email });
      reply.code(201).send(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        reply
          .code(400)
          .send({ error: "Validation failed", details: error.errors });
      } else {
        reply.code(400).send({ error: (error as Error).message });
      }
    }
  }

  async getAllSubs(
    _request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const subscribers = await this.service.getAllSubs();
      const validatedSubscribers = getAllSubsSchema.parse(subscribers);
      reply.code(200).send(validatedSubscribers);
    } catch (error) {
      if (error instanceof z.ZodError) {
        reply
          .code(500)
          .send({ error: "Response validation failed", details: error.errors });
      } else {
        reply.code(500).send({ error: (error as Error).message });
      }
    }
  }
}
