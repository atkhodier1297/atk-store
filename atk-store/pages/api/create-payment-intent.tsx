import Stripe from "stripe";
import {NextApiRequest, NextApiResponse } from "next"
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth"
import { AddCartType } from "@/types/AddCartType";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2022-11-15",
})

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
                quantity: item.quantity,
            }))
        }
    }
    
    res.status(200).json({ userSession })

    return
    
}