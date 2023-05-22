import { useState, useEffect } from "react";

export function Fetch() {
    const [products, setProducts] = useState([])
    useEffect(() => {
        async function fetchProducts() {
            let res = await fetch(`https://fakestoreapi.com/products`)
            let json = await res.json()
            setProducts(json)
            console.log(products);
        }
        fetchProducts()
    }, [])

    return (
        <>
            <h1>fetch</h1>
            {products.map((el) => (

                <div key={el.id}>
                    {el.title}
                    <img src={el.image} />
                </div>

            )


            )}

        </>


    )
}