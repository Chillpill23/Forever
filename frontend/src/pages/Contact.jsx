import { assets } from "../assets/assets"
import NewsLetterBox from "../components/NewsLetterBox"
import Title from "../components/Title"


const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t border-gray-300">
        <Title text1='CONTACT' text2='US'/>
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img src={assets.contactImg} className="w-full md:max-w-[350px] lg:max-w-[480px]" alt='Contact Us' />
        <div className="flex flex-col justify-center items-start gap-6 ">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-base text-gray-500">54709 Willms Station <br/>Suite 350, Washington, USA</p>
          <p className="text-base text-gray-500">Tel: (415) 555-0132<br/>Email: admin@forever.com</p>
          <b className="font-semibold text-xl text-gray-600">Careers at Forever</b>
          <p className="text-base text-gray-500">Learn more about our teams and job openings.</p>

          <button className="px-8 py-4 border border-gray-400 text-sm hover:bg-gray-900 hover:text-white transition-all duration-300 ease-in-out cursor-pointer">Explore jobs</button>

        </div>
      </div>  

      <NewsLetterBox />
    </div>
  )
}

export default Contact