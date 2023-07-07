"use client";
import Image from "next/image";
import { useCartStore } from "@/store";
import priceFormat from "@/util/PriceFormat";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import { motion, AnimatePresence } from 'framer-motion'
import cart from '@/public/cart.png'

export default function Cart() {
  const cartStore = useCartStore();

  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!;
  }, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => cartStore.toggleCart()}
      className="fixed w-full h-screen left-0 top-0 bg-black/50"
    >
      <motion.div
      
        onClick={(e) => e.stopPropagation()}
        className="bg-white absolute right-0 top-0 w-1/2 h-screen p-12 overflow-x-scroll text-gray"
      >
        <AnimatePresence>
        {cartStore.cart.length < 1 ? (
          <motion.div
          initial={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
          animate={{ scale: 1, rotateZ: 0, opacity: 0.75 }}
          exit={{ scale: 1, rotateZ: 0, opacity: 0.75 }}
          className="flex flex-col items-center gap-12 text-xl font-medium">
          <h1>Your shopping cart is empty...😔</h1>
          <Image src={cart} alt="empty cart"/>
          </motion.div>
          
        ) : (
          <h1>Here's your shopping list! 📃</h1>
        )}
        </AnimatePresence>
        {cartStore.cart.map((item) => (
          <div className="flex py-4 gap-4">
            <Image
              className="rounded-md h-24"
              src={item.image}
              alt={item.name}
              width={120}
              height={120}
            />
            <div>
              <h2>{item.name}</h2>
              <div className="flex gap-2">
                <h2>Quantity: {item.quantity}</h2>
                <button
                  onClick={() =>
                    cartStore.removeProduct({
                      id: item.id,
                      image: item.image,
                      name: item.name,
                      unit_amount: item.unit_amount,
                      quantity: item.quantity,
                    })
                  }
                >
                  <IoRemoveCircle />
                </button>
                <button
                  onClick={() =>
                    cartStore.addProduct({
                      id: item.id,
                      image: item.image,
                      name: item.name,
                      unit_amount: item.unit_amount,
                      quantity: item.quantity,
                    })
                  }
                >
                  <IoAddCircle />
                </button>
              </div>
              <p className="text-sm">
                {item.unit_amount && priceFormat(item.unit_amount)}
              </p>
            </div>
          </div>
        ))}
        {cartStore.cart.length > 0 ? (
          <div>
            <p>Cart Total: {priceFormat(totalPrice)}</p>
            <button className="mt-4 w-full text-white py-2 px-6 font-medium rounded-md bg-teal-500">
              Checkout
            </button>
          </div>
        ) : null}
      </motion.div>
    </motion.div>
  );
}
