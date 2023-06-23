import Image from "next/image"
import priceFormat from "@/util/PriceFormat"
import { ProductType } from "@/types/ProductType"
import Link from "next/link"

export default function Product(
    {name, 
    image, 
    unit_amount, 
    id, 
    description, 
    metadata}:
     ProductType){
        const { features } = metadata
        return(
            <Link href={{pathname: `/product/${id}`, query: {name, image, unit_amount, id, description, features}}}>
                <div className="text-gray-700">
                    <h1 className="font-medium text-center">{name}</h1>
                    <Image className="w-full object-cover" 
                    src={image} alt={name} 
                    width={400} height={400}
                    />
                    <h3 className="text-teal-500 font-medium py-2">{unit_amount !== null ? priceFormat(unit_amount) : 'N/A'}</h3>
                </div>
            </Link>
            )
}