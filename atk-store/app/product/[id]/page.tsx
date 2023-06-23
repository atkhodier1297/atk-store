import Image from "next/image"
import { SearchParamType } from "@/types/SearchParamType"
import priceFormat from "@/util/PriceFormat"
import AddCart from "../AddCart"

export default async function Product({searchParams}: SearchParamType) {
    return(
    <div className="flex-justify-between gap-24 p-12 text-gray-700">
        <h1 className="text-2xl py-2 font-medium">{searchParams.name}</h1>
            <Image 
            src={searchParams.image}
            alt={searchParams.name}
            width={600}
            height={600}
            />
        <p className="py-2">{searchParams.description}</p>   
        <p className="font-bold text-teal-500">{searchParams.unit_amount !== null ? priceFormat(searchParams.unit_amount) : "N/A"}</p>
        <AddCart {...searchParams}/>
    </div>
    )
}