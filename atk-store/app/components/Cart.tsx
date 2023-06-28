"use client";
import Image from "next/image";
import { useCartStore } from "@/store";
import priceFormat from "@/util/PriceFormat";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";

export default function Cart() {
  const cartStore = useCartStore();
  console.log(cartStore.isOpen);
  return (
    <div
      onClick={() => cartStore.toggleCart()}
      className="fixed w-full h-screen left-0 top-0 bg-black/25"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white absolute right-0 top-0 w-1/2 h-screen p-12 overflow-x-scroll text-gray"
      >
        { cartStore.cart.length < 1 ? <h1>Your shopping cart is empty...😔</h1> :
        <h1>Here's your shopping list! 📃</h1> }
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
                <button onClick={() =>
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
          <button className="mt-4 w-full text-white py-2 px-6 font-medium rounded-md bg-teal-500">
            Checkout
          </button>
        ) : null}
      </div>
    </div>
  );
}
