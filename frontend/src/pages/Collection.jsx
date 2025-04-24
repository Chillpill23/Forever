import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from '../context/ShopContext'
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const {products, search, showSearch} = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory,setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant')

  const toggleCategory = (e) =>{
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(product => product !== e.target.value))
    }else{
      setCategory(prev => [...prev, e.target.value]);
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(product => product !== e.target.value))
    }else{
      setSubCategory(prev => [...prev, e.target.value]);
    }
  }

  const applyFilter = () =>{
    let productsCopy = products.slice()

    if (showSearch && search) {
      productsCopy = productsCopy.filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(product => category.includes(product.category))
    }

    if(subCategory.length > 0){
      productsCopy = productsCopy.filter(product => subCategory.includes(product.subCategory))
    }

    setFilterProducts(productsCopy)
  }

  const sortProduct = () => {

    let fpCopy = filterProducts.slice();

    switch (sortType) {

      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b) => (a.price - b.price)))
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b) => (b.price - a.price)))
        break;

      default:
        applyFilter();
        break;
    }
  }

  useEffect(() => {
    sortProduct();
  }, [sortType])
  

  useEffect(()=>{
    applyFilter();
  },[category, subCategory, search, showSearch, products]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gray-300'>
      <div className='min-w-60'>

        <p className='my-2 text-xl flex items-center cursor-pointer gap-2' onClick={() => setShowFilter(!showFilter)}>FILTERS
          {showFilter ? 
            <IoIosArrowDown className='sm:hidden w-5 h-5 text-gray-400 transition-all ease-in-out'/> 
            : 
            <IoIosArrowForward className='sm:hidden w-5 h-5 text-gray-400 transition-all ease-in-out'/>
          }
        </p>

        <div className={`border border-gray-300 pl-5  py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>Categories</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <label className='flex cursor-pointer gap-2'>
                <input type='checkbox' className='w-3' value={'Men'} onChange={toggleCategory}/> Men
              </label>
            </p>
            <p className='flex gap-2'>
              <label className='flex cursor-pointer gap-2'>
                <input type='checkbox' className='w-3' value={'Women'} onChange={toggleCategory}/> Women
              </label>
            </p>
            <p className='flex gap-2'>
              <label className='flex cursor-pointer gap-2'>
                <input type='checkbox' className='w-3' value={'Kids'} onChange={toggleCategory}/> Kids
              </label>
            </p>
            <p className='flex gap-2'>
              <label className='flex cursor-pointer gap-2'>
                <input type='checkbox' className='w-3' value={'Unisex'} onChange={toggleCategory}/> Unisex
              </label>
            </p>
          </div>
        </div>

        <div className={`border border-gray-300 pl-5  py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <label className='flex cursor-pointer gap-2'>
                <input type='checkbox' className='w-3' value={'Topwear'} onChange={toggleSubCategory}/> Topwear
              </label>
            </p>
            <p className='flex gap-2'>
              <label className='flex cursor-pointer gap-2'>
                <input type='checkbox' className='w-3' value={'Bottomwear'} onChange={toggleSubCategory}/> Bottomwear
              </label>
            </p>
            <p className='flex gap-2'>
              <label className='flex cursor-pointer gap-2'>
                <input type='checkbox' className='w-3' value={'Winterwear'} onChange={toggleSubCategory}/> Winterwear
              </label>
            </p>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className='flex-1'>
        <div className='flex flex-wrap justify-between sm:items-center text-base sm:text-2xl mb-4'>
            <Title text1={'ALL'} text2={'COLLECTIONS'}/>
            {/* Product Sort */}
            <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm p-2'>
              <option value="relevant">Sort by Relevant</option>
              <option value="low-high">Sort by Low-High</option>
              <option value="high-low">Sort by High-Low</option>
            </select>
        </div>

        {/* Product Map */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterProducts.map(product => (
            <ProductItem key={product._id}
              id={product._id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Collection