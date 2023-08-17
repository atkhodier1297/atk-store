"use client";

import { useCartStore } from "@/store";
import { AddCartType } from "@/types/AddCartType";
import { useState } from "react";

export default function AddCart({
  name,
  id,
  image,
  unit_amount,
}: AddCartType) {

  const cartStore = useCartStore();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    cartStore.addProduct({ name, id, image, unit_amount })
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
    }, 500)
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
