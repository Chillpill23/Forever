import React, { useRef, useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({token}) => {
  
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Men')
  const [subCategory, setSubCategory] = useState('Topwear')
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])

  const image1Ref = useRef();
  const image2Ref = useRef();
  const image3Ref = useRef();
  const image4Ref = useRef();
     

  const onSubmitHandler = async (e) =>{
    e.preventDefault();
    try { 
      const formData = new FormData();
      
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller ? "true" : "false");
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const response = await toast.promise(
        axios.post(backendUrl + "/api/product/add", formData, {headers:{token}, withCredentials: true}),
        {
          pending: 'Adding Product',
          success: 'Product has been added',
          error: 'Failed to add product'
        }
      )

      if (response.data.success) {
        setName('')
        setDescription('')
        setPrice('')
        setSizes([])
        setCategory('Men')
        setSubCategory('Topwear')
        setBestseller(false)

        setImage1(false)    
        setImage2(false)    
        setImage3(false)    
        setImage4(false)
        image1Ref.current.value = null;
        image2Ref.current.value = null;
        image3Ref.current.value = null;
        image4Ref.current.value = null;


      } else {
        toast.error(response.data.message);
      }
      
      console.log(response.data)

    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-2'>
          <label 
            className='overflow-hidden cursor-pointer border rounded-md border-transparent
             hover:border-gray-400 transition-all ease-in-out duration-200 flex items-center justify-center'
            htmlFor='image1'
          >
            <img className='w-30' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="Upload an Image" />
            <input ref={image1Ref} onChange={(e) => setImage1(e.target.files[0])} type='file' id='image1' hidden/>
          </label>

          <label 
            className='overflow-hidden cursor-pointer border rounded-md border-transparent
             hover:border-gray-400 transition-all ease-in-out duration-200 flex items-center justify-center' 
             htmlFor='image2'
          >
            <img className='w-30' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="Upload an Image" />
            <input ref={image2Ref} onChange={(e) => setImage2(e.target.files[0])} type='file' id='image2' hidden/>
          </label>

          <label 
            className='overflow-hidden cursor-pointer border rounded-md border-transparent
             hover:border-gray-400 transition-all ease-in-out duration-200 flex items-center justify-center' 
             htmlFor='image3'
          >
            <img className='w-30' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="Upload an Image" />
            <input ref={image3Ref} onChange={(e) => setImage3(e.target.files[0])} type='file' id='image3' hidden/>
          </label>

          <label 
            className='overflow-hidden cursor-pointer border rounded-md border-transparent
             hover:border-gray-400 transition-all ease-in-out duration-200 flex items-center justify-center' 
             htmlFor='image4'
          >
            <img className='w-30' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="Upload an Image" />
            <input ref={image4Ref} onChange={(e) => setImage4(e.target.files[0])} type='file' id='image4' hidden/>
          </label>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input value={name} onChange={(e)=>setName(e.target.value)} className='w-full max-w-[500px] py-2 px-3 border border-gray-300' type='text' placeholder='Type here' required/>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea value={description} onChange={(e)=>setDescription(e.target.value)} className='w-full max-w-[500px] py-2 px-3 border border-gray-300' type='text' placeholder='Write description here' required/>
      </div>

      <div className='flex flex-col gap-2 sm:flex-row w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product category</p>
          <select value={category} onChange={(e)=>setCategory(e.target.value)} className='w-full px-3 py-2'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Product Subcategory</p>
          <select value={subCategory} onChange={(e)=>setSubCategory(e.target.value)} className='w-full px-3 py-2'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Product Price</p>
          <input value={price} onChange={(e)=>setPrice(e.target.value)} className='w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='25'/>
        </div>
      </div>

      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex flex-col sm:flex-row gap-3'>
          <div
            onClick={()=> {setSizes(prevSizes => prevSizes.includes("S") 
              ? prevSizes.filter(productSize => productSize !== "S") 
              : [...prevSizes, "S"]
            )}}
            className='cursor-pointer'
           >
            <p className={`text-base  px-3 py-1 border border-gray-300 rounded-xs transition-all duration-100 ease-in-out ${sizes.includes('S') ? 'bg-slate-600 text-white' : 'bg-slate-200'}`}>S</p>
          </div>

          <div
            onClick={()=> {setSizes(prevSizes => prevSizes.includes("M") 
              ? prevSizes.filter(productSize => productSize !== "M") 
              : [...prevSizes, "M"]
            )}}
            className='cursor-pointer'
           >
<p className={`text-base  px-3 py-1 border border-gray-300 rounded-xs transition-all duration-100 ease-in-out ${sizes.includes('M') ? 'bg-slate-600 text-white' : 'bg-slate-200'}`}>M</p>
          </div>

          <div
            onClick={()=> {setSizes(prevSizes => prevSizes.includes("L") 
              ? prevSizes.filter(productSize => productSize !== "L") 
              : [...prevSizes, "L"]
            )}}
            className='cursor-pointer'
           >
<p className={`text-base  px-3 py-1 border border-gray-300 rounded-xs transition-all duration-100 ease-in-out ${sizes.includes('L') ? 'bg-slate-600 text-white' : 'bg-slate-200'}`}>L</p>
          </div>

          <div
            onClick={()=> {setSizes(prevSizes => prevSizes.includes("XL") 
              ? prevSizes.filter(productSize => productSize !== "XL") 
              : [...prevSizes, "XL"]
            )}}
            className='cursor-pointer'
           >
<p className={`text-base  px-3 py-1 border border-gray-300 rounded-xs transition-all duration-100 ease-in-out ${sizes.includes('XL') ? 'bg-slate-600 text-white' : 'bg-slate-200'}`}>XL</p>
          </div>

          <div
            onClick={()=> {setSizes(prevSizes => prevSizes.includes("XXL") 
              ? prevSizes.filter(productSize => productSize !== "XXL") 
              : [...prevSizes, "XXL"]
            )}}
            className='cursor-pointer'
           >
<p className={`text-base  px-3 py-1 border border-gray-300 rounded-xs transition-all duration-100 ease-in-out ${sizes.includes('XXL') ? 'bg-slate-600 text-white' : 'bg-slate-200'}`}>XXL</p>
          </div>
        </div>
      </div>

      <div className='flex gap-2 mt-2 items-center'>
        <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} className='w-4 h-4 cursor-pointer' type='checkbox' id='bestseller'/>
        <label className='cursor-pointer' htmlFor='bestseller'>Add to bestseller</label>
      </div>

      <button type='submit' className='w-28 py-3 mt-4 bg-slate-800 text-gray-200 rounded-sm'>ADD</button>
    </form>
  )
}

export default Add