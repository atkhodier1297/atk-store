import Image from "next/image"
import priceFormat from "@/util/PriceFormat"
import { ProductType } from "@/types/ProductType"

export default function Product({name, image, price}: ProductType){
    return(
        <div className="text-gray-700">
            <h1 className="font-medium">{name}</h1>
            <Image className="w-full object-cover" 
            src={image} alt={name} 
            width={400} height={400}/>
            <h3 className="text-teal-500 font-medium py-2">{price !== null ? priceFormat(price) : 'N/A'}</h3>
        </div>
    )
}