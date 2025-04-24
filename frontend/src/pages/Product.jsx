import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { FaRegStar, FaStar } from "react-icons/fa";
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const {productId} = useParams();
  const {products, currency, addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');

  const [size, setSize] = useState('')

  useEffect(() => {
    const fetchProductData = async () => {
      products.map(product => {
        if (product._id === productId) {
          setProductData(product)
          setImage(product.image[0])
          return null
        }
      })
    }

    fetchProductData();
  }, [productId, products])
  

  return productData ? (
    <div className='border-t-1 border-gray-200 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 sm:-gap-12 flex-col sm:flex-row'>
        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col gap-2 sm:gap-1 sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((product,index) => (
                  <img onClick={() => setImage(product)} src={product} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'/>
              ))
            }
          </div>
          <div className='w-full sm:w-[80%] '>
            <img className='w-full h-auto' src={image} />
          </div>
        </div>

        {/* Product Information */}
        <div className='flex-1'>
          <h1 className='font-semibold text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <FaStar className='w-4 h-4 fill-yellow-500'/>
            <FaStar className='w-4 h-4 fill-yellow-500'/>
            <FaStar className='w-4 h-4 fill-yellow-500'/>
            <FaStar className='w-4 h-4 fill-yellow-500'/>
            <FaRegStar className='w-4 h-4 fill-slate-400'/>
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map(productSize => (
                <button 
                  onClick={() => {setSize(productSize)}} 
                  className={`cursor-pointer border border-gray-300 py-2 px-4 bg-gray-100 ${productSize === size ? 'border-orange-500' : ''}`} 
                  key={productSize}
                >
                  {productSize}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={() => {
                addToCart(productData._id, size);
                if(size) setSize('');  
            }} 
            className='uppercase bg-black text-white px-8 py-3 text-sm active:bg-gray-700'
          >
            Add to Cart
          </button>
          
          <hr className='mt-8 sm:w-4/5 text-gray-400'/>
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
              <p>100% Original product.</p>
              <p>Cash on Delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description & Review section */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border border-gray-300 px-5 py-3 text-sm'>Description</b>
          <p className='border border-gray-300 px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border p-6 text-base text-gray-500'>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
          </p> 
          <p> 
            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      </div>

      {/* Display related products */}
      <RelatedProducts 
        category={productData.category} 
        subCategory={productData.subCategory}
        productId = {productId}
      />

    </div>
  ) : <div className='opacity-0'></div>
}

export default Product