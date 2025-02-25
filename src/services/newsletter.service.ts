import { PrismaClient } from "@prisma/client";
import { NewsletterModel, Newsletter } from "../models/newsletter.model";

const prisma = new PrismaClient();

export class NewsletterService {
  private readonly model: NewsletterModel;

  constructor() {
    this.model = new NewsletterModel(prisma.user);
  }

  async register(data: { name: string; email: string }): Promise<Newsletter> {
    const { name, email } = data;

    if (!name?.trim() || !email?.trim()) {
      throw new Error("Name and email must be provided");
    }
    if (!this.isValidEmail(email)) {
      throw new Error("Invalid email format");
    }

    const alreadyExists = await this.model.getByEmail(email);
    if (alreadyExists) {
      throw new Error("Email already exists");
    }

    return this.model.create({ name, email });
  }

  async getAllSubs(): Promise<Newsletter[]> {
    return this.model.get();
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
