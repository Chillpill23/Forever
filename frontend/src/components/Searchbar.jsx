import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"
import { CiSearch } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

const Searchbar = () => {

  const {search, setSearch, showSearch, setShowSearch,} = useContext(ShopContext);
  
  return showSearch ? (
    <div className="border-t border-b border-gray-300 bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input value={search} onChange={(e) => setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm' type='text' placeholder="Search"/>
        <CiSearch className="w-7 h-7 cursor-pointer"/>
      </div>
      <IoClose onClick={() => setShowSearch(!showSearch)} className="inline w-7 h-7 cursor-pointer"/>
    </div>
  ) : null;
}

export default Searchbar