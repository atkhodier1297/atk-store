import Stripe from "stripe";
import {NextApiRequest, NextApiResponse } from "next"
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth"
import { AddCartType } from "@/types/AddCartType";
import { Prisma, PrismaClient } from "@prisma/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2022-11-15",
})

const prisma = new PrismaClient()

const calculateOrderAmount = (items: AddCartType[]) => {
    const totalPrice = items.reduce((acc, item) => {
        return acc + item.unit_amount! * item.quantity!
    }, 0)
    return totalPrice
}

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    //Get user
    const userSession = await getServerSession(req,res,authOptions)
    if(!userSession?.user){
        res.status(403).json({message: "Not logged in!"})
    }
    //extract data from the body
    const {items, payment_intent_id } = req.body

    //data for the order
    const orderData = {
        user: { connect: { id: userSession.user?.id } },
        amount: calculateOrderAmount(items),
        currency: 'usd',
        status: 'pending',
        paymentIntentID: payment_intent_id,
        products: {
            create: items.map((item) => ({
                name: item.name,
                description: item.description,
                unit_amount: item.unit_amount,
                image: item.image,
                quantity: item.quantity,
            })),
        },
    }

    //check if payment intent exists just update the order else create new prisma order

    if(payment_intent_id){
        const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id)
    }else{
        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateOrderAmount(items),
            currency: "usd",
            automatic_payment_methods: { enabled: true },
        })
        
        orderData.paymentIntentID = paymentIntent.id
        const newOrder = await prisma.order.create({
            data: orderData  
        })
    }
    res.status(200).json({ message: 'done' })
    return
    
}