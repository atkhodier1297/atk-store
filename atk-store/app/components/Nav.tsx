"use client";

import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Cart from "./Cart";
import { useCartStore } from "@/store";
import { AiFillShopping } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";

export default function Nav({ user }: Session) {
  const cartStore = useCartStore();
  return (
    <nav className="flex justify-between items-center py-12">
      <Link href={"/"}>
        <h1>ATK-STORE</h1>
      </Link>
      <ul className="flex items-center gap-12">
        <li
          onClick={() => cartStore.toggleCart()}
          className="flex items-center text-3xl relative cursor-pointer"
        >
          <AiFillShopping />
          <AnimatePresence>
            {cartStore.cart.length > 0 && (
              <motion.span
                animate={{ scale: 1 }}
                initial={{ scale: 0 }}
                exit={{ scale: 0 }}
                className="flex items-center justify-center text-sm bg-teal-500 text-white font-medium w-5 h-5 rounded-full absolute left-4 bottom-4"
              >
                {cartStore.cart.length}
              </motion.span>
            )}
          </AnimatePresence>
        </li>
        {!user && (
          <li className="bg-teal-600 text-white py-2 px-4 rounded-md">
            <button onClick={() => signIn()}>Sign in</button>
          </li>
        )}
        {user && (
          <Link href={"/dashboard"}>
            <li>
              <Image
                className="rounded-full"
                src={user?.image as string}
                alt={user?.name as string}
                width={48}
                height={48}
              />
            </li>
          </Link>  
        )}
      </ul>
      <AnimatePresence>{cartStore.isOpen && <Cart />}</AnimatePresence>
    </nav>
  );
}
