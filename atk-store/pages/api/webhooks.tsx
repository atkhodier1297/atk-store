import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";
import { buffer } from "micro";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2022-11-15",
  });
  
  const prisma = new PrismaClient();