import Image from "next/image";
import { SearchParamType } from "@/types/SearchParamType";
import priceFormat from "@/util/PriceFormat";
import AddCart from "../AddCart";

export default async function Product({ searchParams }: SearchParamType) {
  return (
    <div className="flex-col lg:flex-row items-center justify-between gap-16">
      <Image
        src={searchParams.image}
        alt={searchParams.name}
        width={600}
        height={600}
        className="w-full rounded-lg"
        priority={true}
      />
      <h1 className="font-lobster text-2xl py-2 font-medium">{searchParams.name}</h1>
      <p className="py-2">{searchParams.description}</p>
      <p className="font-bold text-primary ">
        {searchParams.unit_amount !== null
          ? priceFormat(searchParams.unit_amount)
          : "N/A"}
      </p>
      <AddCart
        name={searchParams.name}
        image={searchParams.image}
        id={searchParams.queryId!}
        unit_amount={searchParams.unit_amount}
      />
    </div>
  );
}
