import { PrismaClient } from "../lib/generated/prisma";

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });
export default prisma;
