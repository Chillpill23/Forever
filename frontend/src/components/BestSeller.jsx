import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem';
import Title from './Title';

const BestSeller = () => {

  const {products} = useContext(ShopContext)

  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    const bestProducts = products.filter(product => (product.bestseller))
    setBestSellers(bestProducts.slice(0,5));
  },[products])

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
          <Title text1='BEST' text2='SELLERS' />
          <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Lorem Ipsum sit dolor amet color Lorem Ipsum sit dolor
          </p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {bestSellers.map(product => (
          <ProductItem key={product._id} name={product.name} price={product.price} image={product.image} id={product._id}/>
        ))}
      </div>

    </div>
  )
}

export default BestSeller