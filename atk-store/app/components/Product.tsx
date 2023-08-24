import Image from "next/image";
import priceFormat from "@/util/PriceFormat";
import { ProductType } from "@/types/ProductType";
import Link from "next/link";

export default function Product({
  name,
  image,
  unit_amount,
  id,
  description,
  metadata,
}: ProductType) {
  const { features } = metadata;
  const queryId = id

  //if statement below is because I connected this account to a previous stripe store and cannot delete certain items.
  if (name === "Call of Duty Modern Warfare 2 PS5") {
    return (
      null
    )
  }



  return (
    <Link
      href={{
        pathname: `/product/${id}`,
        query: { name, image, unit_amount, queryId, description, features },
      }}
    >
      <div>
        <Image
          className="w-full object-cover rounded-lg"
          src={image}
          alt={name}
          width={400}
          height={400}
          priority={true}
        />
        <h1 className="font-lobster font-medium text-center">{name}</h1>
        <h3 className="text-primary font-medium py-2">
          {unit_amount !== null ? priceFormat(unit_amount) : "N/A"}
        </h3>
      </div>
    </Link>
  );
}
