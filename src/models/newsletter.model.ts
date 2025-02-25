import { PrismaClient } from "@prisma/client";

export interface Newsletter {
  id: string;
  name: string | null;
  email: string;
}

export class NewsletterModel {
  constructor(private readonly prismaNewsletter: PrismaClient["user"]) {}

  async create(data: { name: string; email: string }): Promise<Newsletter> {
    return this.prismaNewsletter.create({ data });
  }

  async get(): Promise<Newsletter[]> {
    return this.prismaNewsletter.findMany();
  }

  async getByEmail(email: string): Promise<Newsletter | null> {
    return this.prismaNewsletter.findUnique({ where: { email } });
  }
}
