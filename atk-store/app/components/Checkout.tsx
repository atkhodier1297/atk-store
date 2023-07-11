'use client'
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { useCartStore } from "@/store"
import { useState, useEffect } from 'react'
import { useRouter } from "next/navigation"

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

export default function Checkout(){
    const cartStore = useCartStore()
    const router = useRouter()
    const [clientSecret, setClientSecret] = useState("")

    useEffect(() => {
        //create payment intent when page loads up create only one payment intent
        fetch("/api/create-payment-intent", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                items: cartStore.cart,
                payment_intent_id: cartStore.paymentIntent,
            }),
        }).then((res) => {
            // set client secret and intent
            if(res.status === 400) {
                return router.push('/api/auth/signin')
            }
            return res.json()
        }).then((data) => {
            console.log(data)
        })

    }, [])

    return(
        <h1>Checkout screen!</h1>
    )
}