import logo from '../assets/images/logo.svg';
import '../App.css';
import '../Main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBagShopping, faHeart, faHouse, faUser, faSearch, faBars } from '@fortawesome/free-solid-svg-icons'
library.add(faHouse, faUser, faBagShopping, faHeart, faSearch, faBars)

function Checkout() {
    return (
      <div className="App">
          <header className="py-4 shadow-sm bg-white">
            <div className="container flex items-center justify-between">
            <a href="index.html">
                <img src={logo} className="w-32" alt="logo" />
            </a>
    
            <div className="w-full max-w-xl relative flex">
                <span className="absolute left-4 top-3 text-lg text-gray-400">
                    <FontAwesomeIcon icon="fas fa-search" />
                </span>
                <input type="text" name="search" id="search"
                    className="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none"
                    placeholder="search" />
                <button
                    className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition">Search</button>
            </div>
    
            <div className="flex items-center space-x-4">
                <a href="#" className="text-center text-gray-700 hover:text-primary transition relative">
                    <div className="text-2xl">
                        <FontAwesomeIcon icon="fas fa-heart" />
                    </div>
                    <div className="text-xs leading-3">Wishlist</div>
                    <div
                        className="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                        8</div>
                </a>
                <a href="#" className="text-center text-gray-700 hover:text-primary transition relative">
                    <div className="text-2xl">
                        <FontAwesomeIcon icon="fas fa-bag-shopping" />
                    </div>
                    <div className="text-xs leading-3">Cart</div>
                    <div
                        className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                        2</div>
                </a>
                <a href="#" className="text-center text-gray-700 hover:text-primary transition relative">
                    <div className="text-2xl">
                        <FontAwesomeIcon icon="fas fa-user" />
                    </div>
                    <div className="text-xs leading-3">Account</div>
                </a>
            </div>
            </div>
            <nav className="bg-gray-800">
            <div className="container flex">
                <div className="px-8 py-4 bg-primary md:flex items-center cursor-pointer relative group hidden">
                <span className="text-white">
                    <FontAwesomeIcon icon="fas fa-bars" />
                </span>
                <span className="capitalize ml-2 text-white hidden">All Categories</span>
                <div className="absolute w-full left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible">
                    <a
                    href="#"
                    className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                    >
                    <img
                        src="assets/images/icons/sofa.svg"
                        alt="sofa"
                        className="w-5 h-5 object-contain"
                    />
                    <span className="ml-6 text-gray-600 text-sm">Sofa</span>
                    </a>
                    <a
                    href="#"
                    className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                    >
                    <img
                        src="assets/images/icons/terrace.svg"
                        alt="terrace"
                        className="w-5 h-5 object-contain"
                    />
                    <span className="ml-6 text-gray-600 text-sm">Terarce</span>
                    </a>
                    <a
                    href="#"
                    className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                    >
                    <img
                        src="assets/images/icons/bed.svg"
                        alt="bed"
                        className="w-5 h-5 object-contain"
                    />
                    <span className="ml-6 text-gray-600 text-sm">Bed</span>
                    </a>
                    <a
                    href="#"
                    className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                    >
                    <img
                        src="assets/images/icons/office.svg"
                        alt="office"
                        className="w-5 h-5 object-contain"
                    />
                    <span className="ml-6 text-gray-600 text-sm">office</span>
                    </a>
                    <a
                    href="#"
                    className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                    >
                    <img
                        src="assets/images/icons/outdoor-cafe.svg"
                        alt="outdoor"
                        className="w-5 h-5 object-contain"
                    />
                    <span className="ml-6 text-gray-600 text-sm">Outdoor</span>
                    </a>
                    <a
                    href="#"
                    className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                    >
                    <img
                        src="assets/images/icons/bed-2.svg"
                        alt="Mattress"
                        className="w-5 h-5 object-contain"
                    />
                    <span className="ml-6 text-gray-600 text-sm">Mattress</span>
                    </a>
                </div>
                </div>
                <div className="flex items-center justify-between flex-grow md:pl-12 py-5">
                <div className="flex items-center space-x-6 capitalize">
                    <a
                    href="index.html"
                    className="text-gray-200 hover:text-white transition"
                    >
                    Home
                    </a>
                    <a
                    href="pages/shop.html"
                    className="text-gray-200 hover:text-white transition"
                    >
                    Shop
                    </a>
                    <a href="#" className="text-gray-200 hover:text-white transition">
                    About us
                    </a>
                    <a href="#" className="text-gray-200 hover:text-white transition">
                    Contact us
                    </a>
                </div>
                <a
                    href="pages/login.html"
                    className="text-gray-200 hover:text-white transition"
                >
                    Login
                </a>
                </div>
            </div>
          </nav>
  
        </header>

        <div className="container grid grid-cols-12 items-start pb-16 pt-4 gap-6">
        <div className="col-span-8 border border-gray-200 p-4 rounded">
            <h3 className="text-lg font-medium capitalize mb-4">Checkout</h3>
            <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                <label htmlFor="first-name" className="text-gray-600">
                    First Name <span className="text-primary">*</span>
                </label>
                <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    className="input-box"
                />
                </div>
                <div>
                <label htmlFor="last-name" className="text-gray-600">
                    Last Name <span className="text-primary">*</span>
                </label>
                <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    className="input-box"
                />
                </div>
            </div>
            <div>
                <label htmlFor="company" className="text-gray-600">
                Company
                </label>
                <input type="text" name="company" id="company" className="input-box" />
            </div>
            <div>
                <label htmlFor="region" className="text-gray-600">
                Country/Region
                </label>
                <input type="text" name="region" id="region" className="input-box" />
            </div>
            <div>
                <label htmlFor="address" className="text-gray-600">
                Street address
                </label>
                <input type="text" name="address" id="address" className="input-box" />
            </div>
            <div>
                <label htmlFor="city" className="text-gray-600">
                City
                </label>
                <input type="text" name="city" id="city" className="input-box" />
            </div>
            <div>
                <label htmlFor="phone" className="text-gray-600">
                Phone number
                </label>
                <input type="text" name="phone" id="phone" className="input-box" />
            </div>
            <div>
                <label htmlFor="email" className="text-gray-600">
                Email address
                </label>
                <input type="email" name="email" id="email" className="input-box" />
            </div>
            <div>
                <label htmlFor="company" className="text-gray-600">
                Company
                </label>
                <input type="text" name="company" id="company" className="input-box" />
            </div>
            </div>
        </div>
        <div className="col-span-4 border border-gray-200 p-4 rounded">
            <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">
            order summary
            </h4>
            <div className="space-y-2">
            <div className="flex justify-between">
                <div>
                <h5 className="text-gray-800 font-medium">Italian shape sofa</h5>
                <p className="text-sm text-gray-600">Size: M</p>
                </div>
                <p className="text-gray-600">x3</p>
                <p className="text-gray-800 font-medium">$320</p>
            </div>
            <div className="flex justify-between">
                <div>
                <h5 className="text-gray-800 font-medium">Italian shape sofa</h5>
                <p className="text-sm text-gray-600">Size: M</p>
                </div>
                <p className="text-gray-600">x3</p>
                <p className="text-gray-800 font-medium">$320</p>
            </div>
            <div className="flex justify-between">
                <div>
                <h5 className="text-gray-800 font-medium">Italian shape sofa</h5>
                <p className="text-sm text-gray-600">Size: M</p>
                </div>
                <p className="text-gray-600">x3</p>
                <p className="text-gray-800 font-medium">$320</p>
            </div>
            <div className="flex justify-between">
                <div>
                <h5 className="text-gray-800 font-medium">Italian shape sofa</h5>
                <p className="text-sm text-gray-600">Size: M</p>
                </div>
                <p className="text-gray-600">x3</p>
                <p className="text-gray-800 font-medium">$320</p>
            </div>
            </div>
            <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
            <p>subtotal</p>
            <p>$1280</p>
            </div>
            <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
            <p>shipping</p>
            <p>Free</p>
            </div>
            <div className="flex justify-between text-gray-800 font-medium py-3 uppercas">
            <p className="font-semibold">Total</p>
            <p>$1280</p>
            </div>
            <div className="flex items-center mb-4 mt-2">
            <input
                type="checkbox"
                name="aggrement"
                id="aggrement"
                className="text-primary focus:ring-0 rounded-sm cursor-pointer w-3 h-3"
            />
            <label
                htmlFor="aggrement"
                className="text-gray-600 ml-3 cursor-pointer text-sm"
            >
                I agree to the{" "}
                <a href="#" className="text-primary">
                terms &amp; conditions
                </a>
            </label>
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

export default Checkout;
