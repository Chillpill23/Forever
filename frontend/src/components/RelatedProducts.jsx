import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({category, subCategory, productId}) => {

  const {products} = useContext(ShopContext);

  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy =  products.slice();

      if (category) {
        productsCopy = productsCopy.filter(product => product.category === category && product._id !== productId);
      }
      if (subCategory) {
        productsCopy = productsCopy.filter(product => product.subCategory === subCategory);
      }

      setRelated(productsCopy.slice(0,5));
    }
  }, [products, productId])
  

  return (
    <div className='my-24'>
      <div className='text-center text-3xl py-2'>
        <Title text1='RELATED' text2='PRODUCTS'/>
      </div>
      
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {related.map(product => (
          <ProductItem key={product._id}
            id={product._id}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts