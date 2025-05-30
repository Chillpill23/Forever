import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

  const currency = '$';
  const delivery_fee =  10;

  const backendURL = import.meta.env.VITE_BACKEND_URL

  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([])
  const [token, setToken] = useState('')

  const navigate = useNavigate();

  const addToCart = async (productId, size) => {
      if (!size) {
        toast.error("Please select a valid size");
        return;
      }

      let cartData = structuredClone(cartItems);

      if (cartData[productId]) {
        if (cartData[productId][size]) {
          cartData[productId][size] += 1;  
        }else{
          cartData[productId][size] = 1;
        }
      }else{
        cartData[productId] = {};
        cartData[productId][size] = 1;
      }
      setCartItems(cartData);


      if(token){
        try {
            await axios.post(backendURL + '/api/cart/add', {productId, size}, {headers:{token},withCredentials: true})
        } catch (error) {
          console.error(error)
          toast.error(error.message)         
        }
      }
  }

  const updateQuantity = async (productId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[productId][size] = quantity
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(backendURL + '/api/cart/update',{productId, size, quantity},{headers:{token},withCredentials: true})
      } catch (error) {
        console.error(error)
        toast.error(error.message)
      }
    }
  }

  const getCartCount = () =>{
    let totalCount = 0;

    for (let items in cartItems){
      for(let item in cartItems[items]){
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.error(error)
        }
      }
    }
    return totalCount;
  }

  const getCartAmount = () =>{
    let totalAmount = 0;
    for(const items in cartItems){
      let itemInfo = products.find(product => product._id === items);
      for(const item in cartItems[items]){
        try {
          if (cartItems[items][item]) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {
          console.error(error)
        }
      }
    }
    return totalAmount;
  }

  const getProductsData = async () =>{
    try {
      const response = await axios.get(backendURL + '/api/product/list')

      if (response.data.success) {
        setProducts(response.data.products)
      }else{
        toast.error(response.data.message)
      }

    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(backendURL + '/api/cart/get',{},{headers:{token},withCredentials: true});
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }

    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getProductsData();
  }, [])

  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
      getUserCart(localStorage.getItem('token'));
    }
  }, [])
  

  
  const value = {
    products, 
    currency, 
    delivery_fee, 
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendURL,
    setToken,
    token,
    setCartItems,
  }

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider;