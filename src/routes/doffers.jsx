import logo from '../assets/images/logo.svg';
import '../App.css';
import '../Main.css';
import Header from '../components/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBagShopping, faHeart, faHouse, faUser, faSearch, faBars } from '@fortawesome/free-solid-svg-icons'
import config from '../config'
import { useEffect, useState, useContext, version } from 'react';
import { useParams } from 'react-router-dom';
import { apiRoot } from '../commercetools';
import { setQueryArgs } from '../util/searchUtil';
import { getCart, addToCart, updateCart } from '../util/cart-util';

library.add(faHouse, faUser, faBagShopping, faHeart, faSearch, faBars)


function Doffers() {
  let { productId } = useParams();
  let [cart, setCart] = useState(null);
  let [packageAddons, setPackageAddons] = useState([]);
  let [product, setProduct] = useState(null);
  let [variantName, setVariantName] = useState(null);
  let [selectedVariant, setSelectedVariant] = useState(null);
  let [error, setError] = useState(null);
  let [probeName, setProbeName] = useState(null);
  let [reactionSize, setReactionSize] = useState(null);

  useEffect(() => {
    fetchProduct(productId);
  });

  const fetchProduct = async (productId) => {
    
    if(product || !productId) {
      return;
    }
    
    const queryArgs = setQueryArgs();

    /* Last, but not least, add a couple of reference expansions to include channel and customer group data */
    queryArgs.expand = [
      'masterVariant.prices[*].channel',
      'masterVariant.prices[*].customerGroup',
      'masterVariant.prices[*].discounted.discount',
      'masterVariant.price.discounted.discount',
      'variants[*].prices[*].channel',
      'variants[*].prices[*].customerGroup',
      'variants[*].prices[*].discounted.discount',
      'variants[*].price.discounted.discount',
    ];

    let res =  await apiRoot
      .productProjections()
      .withId({ ID: productId })
      .get({ queryArgs: queryArgs })
      .execute();

    if(res && res.body) {
        
        let products = [];

        products.push({
            main: res.body.masterVariant,
            addOns: await fetchAddons(res.body.masterVariant.attributes)
        })

        for (const [key, value] of Object.entries(res.body.variants)) {
            products.push({
                main: value,
                addOns: await fetchAddons(value.attributes)
            })
        }

        let existingCustomer = "";
        let customerType = "";

        for (const [key, value] of Object.entries(res.body.masterVariant.attributes)) {
          console.log(value);
          if (value.name === "existingCust") {
            existingCustomer = (value.value) ? "Yes" : "No";
          }

          if (value.name === "custType") {
            customerType = value.value[0].label;
          }
        }

        

        let formobj = {
            main: res.body,
            prompt: "Hello",
            existingCustomer: existingCustomer,
            customerType: customerType,
            variants: products
        }

        setProduct(formobj);
    }
  };

  const fetchAPIProduct = async (prodId) => {
    let res1 =  await apiRoot
                .products()
                .withId({ ID: prodId })
                .get()
                .execute()

    return res1.body.masterData.current;
  }

  const fetchAddons = async (attributes) => {

    let includedOffers = [];

    // add the add ons
    for (const [key, value] of Object.entries(attributes)) {
        
        if (value.name === "included_options") {

            for (const [key, newValue] of Object.entries(value.value)) {
                let subProduct =  await fetchAPIProduct(newValue.id);
                includedOffers.push(subProduct);
            }
        }
    }

    return includedOffers;
  }

  const onChangeType1 = (event) => {

    for (const [key, newValue] of Object.entries(product.variants)) {

        if (event.target.value === newValue.main.sku) {
            let prompt = "";

            for (const [key, value] of Object.entries(newValue.main.attributes)) {
          
              if (value.name === "best-prompt") {
                prompt = value.value;
              }
            }

            setSelectedVariant({
              main: newValue.main,
              addOns: newValue.addOns,
              prompt: prompt
            });
            setVariantName(event.target.value);
            break;
        }
    }
  }

  const deleteCart = async() => {
    let cart = await getCart();
    sessionStorage.removeItem('cartId');
    setCart(null);    
    if(cart) {
      await apiRoot
        .carts()
        .withId({ ID: cart.id})
        .delete({
          queryArgs: {
            version: cart.version
          }
        })
        .execute();
    }
  }

  const initCart = async(currentProducts, addOns) => {
    // Add the main products
    const result = await addToCart(1, 1,{}, 1);
  }

  const submitToCart = async() => {
    await deleteCart();

    let custom = {
      "type": {
        "typeId": "type",
        'key': "addOns"
      },
      "fields": {
        "varArray": packageAddons
      }
    }

    const result = await addToCart(product.main.id, selectedVariant.main.id,custom, 1);

    console.log("hello")
  }

  const addPackageAddon = (event) => {

    if (event) {
      console.log(event);
      let newPackageAddons = packageAddons;

      newPackageAddons.push(event.name["en-US"]);

      setPackageAddons(newPackageAddons);
    }
  }

  const onChangeType2 = (event) => {
    
  }

  if(!product) {
    return null
  }


  let typeOptions1 = "";

  let secondNameSelect =variantName ? variantName : '';
  if(product.variants.length) {
    
    typeOptions1 = product.variants.map(c => <option key={c.main.id} value={c.main.sku}>{`${c.main.sku.split('+')[1]} + ${c.main.sku.split('+')[2]}`}</option>);
  }

  var variantInfo;



  if (selectedVariant) {
    console.log(selectedVariant);
    variantInfo = (
        <div className="pt-4">
          <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
              <p>{selectedVariant.prompt}</p>
            </div>
          <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
              <p className="text-xl text-primary font-semibold">${selectedVariant.main.prices[0].value.centAmount / 100}</p>
            </div>
            
            <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
            Included Offers:
            </h3>
            <div className="flex items-center gap-2"></div>
            <div>
            {selectedVariant.addOns.map((row, index) => (
                <div style={{border: '1px solid', margin: '3px', padding: '3px', width: '550px', textAlign: 'center'}} key={index}>
                    <h4 style={{backgroundColor: '#efefef'}}>{row.name['en-US']}</h4>
                    <br />
                    <button
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                        onClick={() => addPackageAddon(row)}
                    >Add</button>
                    <br /><br />
                </div>
                
            ))}
            </div>
            
        </div>

      );
  } else {
    variantInfo = null;
  }


  return (
    <div className="App">
        <Header />

        <div className="container py-4 flex items-center gap-3">
          <a href="../index.html" className="text-primary text-base">
            <FontAwesomeIcon icon="fas fa-house" />
          </a>
          
          <p className="text-gray-600 font-medium">Product</p>
        </div>

        {/* product-detail */}
        <div className="container grid grid-cols-2 gap-6">
          <div>
            <img
              src={product.variants[0].main.images[0].url}
              alt="product"
              className="w-full"
            />
          </div>
          <div>
            <h2 className="text-3xl font-medium uppercase mb-2">
              {product.main.name[config.locale]}
            </h2>

            <div className="pt-4">
                <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Offer For:
                </h3>
                <div className="flex items-center gap-2"></div>
                
                <h4>Existing Customer: {product.existingCustomer}</h4>
                <h4>Customer Type: {product.customerType}</h4>
            </div>

            <div className="pt-4">
                <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Internet Options
                </h3>
                <div className="flex items-center gap-2"></div>
                
                <select onChange={onChangeType2}>
                    <option value="">Internet Tier 1</option>
                </select>
            </div>

            <div className="pt-4">
                <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                TV Options
                </h3>
                <div className="flex items-center gap-2"></div>

                <select value={secondNameSelect} onChange={onChangeType1}>
                    <option value="">(none selected)</option>
                    {typeOptions1}
                </select>
            </div>

            {variantInfo}
            
            <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
              <button
                href="#"
                className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition"
                onClick={() => submitToCart()}
              >
                <FontAwesomeIcon icon="fas fa-shopping-bag" /> Add to cart
              </button>
              
            </div>
            <div className="flex gap-3 mt-4">
              
              
            </div>
          </div>
        </div>
        {/* ./product-detail */}
        {/* description */}
        <div className="container pb-16">
          <h3 className="border-b border-gray-200 font-roboto text-gray-800 pb-3 font-medium">
            Product details
          </h3>
          <div className="w-3/5 pt-6">
            <div className="text-gray-600">
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur
                necessitatibus deleniti natus dolore cum maiores suscipit optio itaque
                voluptatibus veritatis tempora iste facilis non aut sapiente dolor
                quisquam, ex ab.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, quae
                accusantium voluptatem blanditiis sapiente voluptatum. Autem ab,
                dolorum assumenda earum veniam eius illo fugiat possimus illum dolor
                totam, ducimus excepturi.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error quia
                modi ut expedita! Iure molestiae labore cumque nobis quasi fuga,
                quibusdam rem? Temporibus consectetur corrupti rerum veritatis numquam
                labore amet.
              </p>
            </div>
            <table className="table-auto border-collapse w-full text-left text-gray-600 text-sm mt-6">
              <tbody>
                <tr>
                  <th className="py-2 px-4 border border-gray-300 w-40 font-medium">
                    Color
                  </th>
                  <th className="py-2 px-4 border border-gray-300 ">
                    Blank, Brown, Red
                  </th>
                </tr>
                <tr>
                  <th className="py-2 px-4 border border-gray-300 w-40 font-medium">
                    Material
                  </th>
                  <th className="py-2 px-4 border border-gray-300 ">Latex</th>
                </tr>
                <tr>
                  <th className="py-2 px-4 border border-gray-300 w-40 font-medium">
                    Weight
                  </th>
                  <th className="py-2 px-4 border border-gray-300 ">55kg</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* ./description */}
        {/* related product */}
        <div className="container pb-16">
          <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
            Related products
          </h2>
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-white shadow rounded overflow-hidden group">
              <div className="relative">
                <img
                  src="../assets/images/products/product1.jpg"
                  alt="product 1"
                  className="w-full"
                />
                <div
                  className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
                    justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
                >
                  <a
                    href="#"
                    className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                    title="view product"
                  >
                    <i className="fa-solid fa-magnifying-glass" />
                  </a>
                  <a
                    href="#"
                    className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                    title="add to wishlist"
                  >
                    <i className="fa-solid fa-heart" />
                  </a>
                </div>
              </div>
              <div className="pt-4 pb-3 px-4">
                <a href="#">
                  <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                    Guyer Chair
                  </h4>
                </a>
                <div className="flex items-baseline mb-1 space-x-2">
                  <p className="text-xl text-primary font-semibold">$45.00</p>
                  <p className="text-sm text-gray-400 line-through">$55.90</p>
                </div>
                <div className="flex items-center">
                  <div className="flex gap-1 text-sm text-yellow-400">
                    <span>
                      <FontAwesomeIcon icon="fas fa-star" />
                    </span>
                    <span>
                      <FontAwesomeIcon icon="fas fa-star" />
                    </span>
                    <span>
                      <FontAwesomeIcon icon="fas fa-star" />
                    </span>
                    <span>
                      <FontAwesomeIcon icon="fas fa-star" />
                    </span>
                    <span>
                      <FontAwesomeIcon icon="fas fa-star" />
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 ml-3">(150)</div>
                </div>
              </div>
              <a
                href="#"
                className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
              >
                Add to cart
              </a>
            </div>
            <div className="bg-white shadow rounded overflow-hidden group">
              <div className="relative">
                <img
                  src="../assets/images/products/product4.jpg"
                  alt="product 1"
                  className="w-full"
                />
                <div
                  className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
                    justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
                >
                  <a
                    href="#"
                    className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                    title="view product"
                  >
                    <i className="fa-solid fa-magnifying-glass" />
                  </a>
                  <a
                    href="#"
                    className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                    title="add to wishlist"
                  >
                    <i className="fa-solid fa-heart" />
                  </a>
                </div>
              </div>
              <div className="pt-4 pb-3 px-4">
                <a href="#">
                  <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                    Bed King Size
                  </h4>
                </a>
                <div className="flex items-baseline mb-1 space-x-2">
                  <p className="text-xl text-primary font-semibold">$45.00</p>
                  <p className="text-sm text-gray-400 line-through">$55.90</p>
                </div>
                <div className="flex items-center">
                  <div className="flex gap-1 text-sm text-yellow-400">
                    <span>
                      <FontAwesomeIcon icon="fas fa-star" />
                    </span>
                    <span>
                      <FontAwesomeIcon icon="fas fa-star" />
                    </span>
                    <span>
                      <FontAwesomeIcon icon="fas fa-star" />
                    </span>
                    <span>
                      <FontAwesomeIcon icon="fas fa-star" />
                    </span>
                    <span>
                      <FontAwesomeIcon icon="fas fa-star" />
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 ml-3">(150)</div>
                </div>
              </div>
              <a
                href="#"
                className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
              >
                Add to cart
              </a>
            </div>
            <div className="bg-white shadow rounded overflow-hidden group">
              <div className="relative">
                <img
                  src="../assets/images/products/product2.jpg"
                  alt="product 1"
                  className="w-full"
                />
                <div
                  className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
                    justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
                >
                  <a
                    href="#"
                    className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                    title="view product"
                  >
                    <i className="fa-solid fa-magnifying-glass" />
                  </a>
                  <a
                    href="#"
                    className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                    title="add to wishlist"
                  >
                    <i className="fa-solid fa-heart" />
                  </a>
                </div>
              </div>
              <div className="pt-4 pb-3 px-4">
                <a href="#">
                  <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                    Couple Sofa
                  </h4>
                </a>
                <div className="flex items-baseline mb-1 space-x-2">
                  <p className="text-xl text-primary font-semibold">$45.00</p>
                  <p className="text-sm text-gray-400 line-through">$55.90</p>
                </div>
                <div className="flex items-center">
                  <div className="flex gap-1 text-sm text-yellow-400">
                    <span>
                      <FontAwesomeIcon icon="fas fa-star" />
                    </span>
                    <span>
                      <FontAwesomeIcon icon="fas fa-star" />
                    </span>
                    <span>
                      <FontAwesomeIcon icon="fas fa-star" />
                    </span>
                    <span>
                      <FontAwesomeIcon icon="fas fa-star" />
                    </span>
                    <span>
                      <FontAwesomeIcon icon="fas fa-star" />
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 ml-3">(150)</div>
                </div>
              </div>
              <a
                href="#"
                className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
              >
                Add to cart
              </a>
            </div>
            <div className="bg-white shadow rounded overflow-hidden group">
              <div className="relative">
                <img
                  src="../assets/images/products/product3.jpg"
                  alt="product 1"
                  className="w-full"
                />
                <div
                  className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
                    justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
                >
                  <a
                    href="#"
                    className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                    title="view product"
                  >
                    <i className="fa-solid fa-magnifying-glass" />
                  </a>
                  <a
                    href="#"
                    className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                    title="add to wishlist"
                  >
                    <i className="fa-solid fa-heart" />
                  </a>
                </div>
              </div>
              <div className="pt-4 pb-3 px-4">
                <a href="#">
                  <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                    Mattrass X
                  </h4>
                </a>
                <div className="flex items-baseline mb-1 space-x-2">
                  <p className="text-xl text-primary font-semibold">$45.00</p>
                  <p className="text-sm text-gray-400 line-through">$55.90</p>
                </div>
                <div className="flex items-center">
                  <div className="flex gap-1 text-sm text-yellow-400">
                    <span>
                      <FontAwesomeIcon icon="fas fa-star" />
                    </span>
                    <span>
                      <FontAwesomeIcon icon="fas fa-star" />
                    </span>
                    <span>
                      <FontAwesomeIcon icon="fas fa-star" />
                    </span>
                    <span>
                      <FontAwesomeIcon icon="fas fa-star" />
                    </span>
                    <span>
                      <FontAwesomeIcon icon="fas fa-star" />
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 ml-3">(150)</div>
                </div>
              </div>
              <a
                href="#"
                className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
              >
                Add to cart
              </a>
            </div>
          </div>
        </div>
        {/* ./related product */}

        
    </div>
  );
}

export default Doffers;
