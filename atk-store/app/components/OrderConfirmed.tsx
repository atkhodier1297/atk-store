'use client'
import { motion } from "framer-motion"
import Image from "next/image"
import dancing from '@/public/dancing.gif'
import Link from "next/link"
import { useCartStore } from "@/store"

export default function OrderConfirmed(){

    const cartStore = useCartStore()

    return(
        <motion.div
        className="flex items-center justify-center my-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        >
            <div className="p-12 rounded-md text-center">
                <h1 className="text-xl font-medium">Your order has been placed. 🚀</h1>
                <h2 className="text-sm my-4">Check your email for your receipt.</h2>
                <Image src={dancing} className="py-8" alt="dancing monkey"/>
                <div>
                <Link href={"/dashboard"}>
                    <button className="font-medium">
                        Check your Order
                    </button>
                </Link>
                <button onClick={() => {
                    cartStore.setCheckout("cart")
                    cartStore.toggleCart()
                }} className="font-medium"
                >
                    Create a new Order
                </button>
            </div>
            </div>
        
        </motion.div>
    )
}