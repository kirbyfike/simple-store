import logo from '../assets/images/logo.svg';
import '../App.css';
import '../Main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBagShopping, faHeart, faHouse, faUser, faSearch, faBars } from '@fortawesome/free-solid-svg-icons'
library.add(faHouse, faUser, faBagShopping, faHeart, faSearch, faBars)

function Header() {
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
                    style={{ border: '1px solid black' }}
                    placeholder="search" />
                <button
                    style={{ border: '1px solid black' }}
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
    </div>
  );
}

export default Header;
