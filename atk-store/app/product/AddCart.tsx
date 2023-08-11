"use client";

import { useCartStore } from "@/store";
import { AddCartType } from "@/types/AddCartType";
import { useState } from "react";

export default function AddCart({
  name,
  id,
  image,
  unit_amount,
  quantity,
}: AddCartType) {

  const cartStore = useCartStore();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    cartStore.addProduct({ name, id, image, unit_amount, quantity })
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
    }, 2000)
  }

  return (
    <>
      <button
        onClick={handleAddToCart}
        disabled={added}
        className="my-4 btn btn-primary w-full"
      >
        {!added && <span>Add to Cart</span>}
        {added && <span>Adding to Cart ✅</span>}
      </button>
    </>
  );
}
