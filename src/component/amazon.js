import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function SearchBar() {
    const [find, setFind] = useState('')
    const [prods, setAllProds] = useState('')
    useEffect(() => {
        async function fetch() {
          let res = await fetch(`https://dummyjson.com/products?limit=5&skip=0&search?q=${find}`);
          let json = await res.json();
          setAllProds(json.products);
        }
    if(find.length>3)fetch();
      }, [find]);
    console.log(prods);
    return (
        <div className="search">
            <input placeholder="non funziono" onChange={(e) => setFind(e.target.value)} />
            {/* {find.length>0 && prods.map((el)=>(
        <p>
            <Link >{el.title}</Link>
            </p>
        ))} */}
        </div>
    )

}

function NavProds({ handleClick }) {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        async function fetchCateg() {
            let res = await fetch(`https://dummyjson.com/products/categories`);
            let json = await res.json();
            setCategories(json);
        }
        fetchCateg();
    }, []);

    return (
        <div className="navProds">
            <h3>Categories</h3>
            <ul>
                {categories.map((el) => (
                    <li key={el}>
                        <Link onClick={() => handleClick(el)}>{el}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function ProdWindow({ currCateg, addToCart }) {
    const [categProd, setCategProds] = useState([]);
    useEffect(() => {
        async function fetchCategProd() {
            let res = await fetch(`https://dummyjson.com/products/category/${currCateg}`);
            let json = await res.json();
            setCategProds(json.products);
        }
        if (currCateg.length > 0) {
            fetchCategProd();
        }
    }, [currCateg]);

    return (
        <div className="prodWindow">
            {categProd.map((el) => (
                <div key={el.id} className="prod">
                    <h4>{el.title}</h4>
                    <img src={el.thumbnail} alt={el.title} />
                    <span>{el.description}</span>
                    <span className="price">{el.price}$</span>
                    <button onClick={() => addToCart(el)}>Add to Cart</button>
                </div>
            ))}
        </div>
    );
}

export function Cart({ cart,removeFromCart }) {
    let items = cart.map((el,i) => (
        <div key={i} className="cartItems">
            <div>
            <button onClick={()=>removeFromCart(i)} className="delete">x</button>
            <span>{el.title}</span>
            </div>
            <span className="price">{el.price}</span>
        </div>
    ))
    let total = 0
    cart.map((el) => {
        console.log(el.price);
        total += el.price
    }
    )
    console.log(total);
    return (
        <div className="cart">
            <h2>Cart</h2>
            {items}
            <hr />
            <div className="cartItems">
                <span>TOTAL</span>
                <span className="price">{total}</span>
            </div>
            <button >Proceed with the order</button>
        </div>
    );
}

export function Amazonn() {
    const [currCateg, setCurrCateg] = useState("smartphones");
    const [cart, setCart] = useState([]);

    function addToCart(product) {
        const newCart = [...cart, product];
        setCart(newCart);
        console.log(cart);
    }

    const removeFromCart = (index) => {
        const updatedCart = cart.filter((el, i) => i !== index);
        setCart(updatedCart);
      };

    return (
        <>
            <SearchBar />
            <div className="amazonn">
                <NavProds className='nav' handleClick={setCurrCateg} />
                <ProdWindow className='prods' currCateg={currCateg} addToCart={addToCart} />
                <Cart cart={cart} removeFromCart={removeFromCart}/>
            </div></>
    );
}