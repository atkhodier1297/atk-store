import Image from "next/image"

export default function Product({name, image, price}){
    return(
        <div>
            <h1>{name}</h1>
            <Image src={image} alt={name} width={400} height={400}/>
            <h3>{price}</h3>
        </div>
       
    )
}