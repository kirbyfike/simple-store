import logo from '../assets/images/logo.svg';
import '../App.css';
import '../Main.css';
import Header from '../components/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { useEffect, useState, useContext, version } from 'react';
import { getCart, addToCart, updateCart } from '../util/cart-util';
import { faBagShopping, faHeart, faHouse, faUser, faSearch, faBars } from '@fortawesome/free-solid-svg-icons'
library.add(faHouse, faUser, faBagShopping, faHeart, faSearch, faBars)

function Cart() {
    let [cart, setCart] = useState(null);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        let cart = await getCart();

        setCart(cart);
    }

    if(!cart) {
        return null
      }


    return (
      <div className="App">
        <Header />

        <div className="container grid grid-cols-12 items-start pb-16 pt-4 gap-6">
        
        <div className="col-span-12 border border-gray-200 p-4 rounded">
            <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">
            order summary
            </h4>
            <div className="space-y-2">

            {cart.lineItems.map((row, index) => (
                <div key={index}>
                <div className="flex justify-between">
                    <div>
                    <h3 className="text-gray-800 font-medium">{row.name.en}</h3>
                    <p className="text-sm text-gray-600">{row.variant.sku}</p>
                    </div>
                    <p className="text-gray-600">{row.quantity}</p>
                    <p className="text-gray-800 font-medium">${row.price.value.centAmount / 100}</p>
                    
                </div>
                <br></br>
                <div>
                <p><b>Add Ons</b></p>
                <ul>
                    {row.custom.fields.varArray.map((item1, index) => { 
                           return (<li>{index + 1}. {item1}</li>); 
                        }
                    )}  
                </ul>
                </div>
                </div>

            ))}
            
            </div>
            <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
            <p>subtotal</p>
            <p>${cart.totalPrice.centAmount / 100}</p>
            </div>
            <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
            <p>shipping</p>
            <p>Free</p>
            </div>
            <div className="flex justify-between text-gray-800 font-medium py-3 uppercas">
            <p className="font-semibold">Total</p>
            <p>${cart.totalPrice.centAmount / 100}</p>
            </div>
            
            <a
            href="#"
            className="block w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium"
            >
            Place order
            </a>
        </div>
        </div>
    </div>
  );
}

export default Cart;
