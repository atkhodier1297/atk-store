import Image from "next/image"
import priceFormat from "@/util/PriceFormat"

export default function Product({name, image, price}){
    return(
        <div>
            <h1>{name}</h1>
            <Image src={image} alt={name} width={400} height={400}/>
            <h3>{priceFormat(price)}</h3>
        </div>
       
    )
}