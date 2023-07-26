'use client'
import { motion } from "framer-motion"
import Image from "next/image"
import dancing from '@/public/dancing.gif'

export default function OrderConfirmed(){
    return(
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        >
            <div>
                <h1>Your order has been placed! 🚀</h1>
                <h2>Check your email for your receipt</h2>
                <Image src={dancing} className="py-8" alt="dancing monkey"/>
            </div>
        
        </motion.div>
    )
}