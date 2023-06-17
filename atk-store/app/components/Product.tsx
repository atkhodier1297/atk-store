import Image from "next/image"
import priceFormat from "@/util/PriceFormat"
import { ProductType } from "@/types/ProductType"

export default function Product({name, image, price}: ProductType){
    return(
        <div>
            <h1>{name}</h1>
            <Image src={image} alt={name} width={400} height={400}/>
            <h3>{price !== null ? priceFormat(price) : 'N/A'}</h3>
        </div>
    )
}