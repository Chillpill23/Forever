import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { CiTrash } from "react-icons/ci";
import CartTotal from '../components/CartTotal';

const Cart = () => {

  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {

    if (products.length > 0) {
      const TempData = [];
      for (const product in cartItems) {
        for (const property in cartItems[product]) {
          if (cartItems[product][property] > 0) {
            TempData.push({
              _id: product,
              size: property,
              quantity: cartItems[product][property],
            })
          }
        }
      }
      setCartData(TempData);
    }
  }, [cartItems, products])

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1='YOUR' text2='CART' />
      </div>

      <div>
        {cartData.map(item => {
          const productData = products.find(product => product._id === item._id)
          return (
            <div key={`${productData._id}-${item.size}`}
              className='py-4 border-t border-b border-gray-400 text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'
            >
              <div className='flex items-start gap-6'>
                <img className='w-16 sm:w-20' src={productData.image[0]} alt={productData.name} />
                <div>
                  <p className='text-xs sm:text-lg font-medium'>{[productData.name]}</p>
                  <div className='flex items-center gap-5 mt-2'>
                    <p>{currency}{productData.price}</p>
                    <p className='px-2 sm:px-3 sm:py-1 border border-gray-300 bg-slate-50'>{item.size}</p>
                  </div>
                </div>
              </div>
              <input onChange={(e) => { e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value)) }} className='border border-gray-300 max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type='number' min={1} defaultValue={item.quantity} />
              <CiTrash onClick={() => updateQuantity(item._id, item.size, 0)} className='w-7 h-7 cursor-pointer fill-gray-500 hover:fill-gray-900 transition-all duration-200 ease-in-out' />
            </div>
          )
        })}
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button onClick={() => navigate('/place-order')} className='cursor-pointer uppercase bg-slate-800 text-white text-sm my-8 px-8 py-3'>Proceed checkout</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Cart