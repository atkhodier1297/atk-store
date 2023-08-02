import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth"
import { authOptions } from "./auth/[...nextauth]";

const prisma = new PrismaClient()

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if(req.method === "GET"){
        try{
            const user = await getServerSession(req,res, authOptions)
            if(!user){
                res.status(403).json({message: "Not logged in"})
            }
            const orders = await prisma.order.findMany({
                where: {
                    userId: user?.user?.id
                },
                include: {
                    products: true
                }
            })
        }
    }
}