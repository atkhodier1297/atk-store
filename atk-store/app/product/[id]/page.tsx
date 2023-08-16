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
        className=""
        priority
      />
      <h1 className="text-2xl py-2 font-medium">{searchParams.name}</h1>
      <p className="py-2">{searchParams.description}</p>
      <p className="font-bold text-primary ">
        {searchParams.unit_amount !== null
          ? priceFormat(searchParams.unit_amount)
          : "N/A"}
      </p>
      <AddCart {...searchParams} />
    </div>
  );
}
