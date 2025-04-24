const NewsLetterBox = () => {

  const onSubmitHandler = (e) => {
    e.preverntDefault();
  }

  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe now and get 20% off</p>
      <p className="text-gray-400 mt-3">Lorem Ipsum dummy text is a printing dummy text from way back</p>
      <form onSubmit={onSubmitHandler} className="w-full sm:w-3/4 lg:w-1/2 flex flex-col sm:flex-row mx-auto my-6 border border-gray-400">
        <input type="email" className="w-full sm:flex-1 outline-none p-3 sm:px-5 text-center sm:text-left" placeholder="Enter your email" required/>
        <button className="bg-black text-white text-sm px-10 py-4" type="submit">SUBSCRIBE</button>
      </form>
    </div>
  )
}

export default NewsLetterBox