import React, { FC, SyntheticEvent, useEffect, useState } from 'react'
import Head from 'next/head'
import { TbListSearch, TbCalendar, TbEdit, TbTrash, TbUsers, TbHexagonPlus } from 'react-icons/tb'
import router, { useRouter } from 'next/router'
import { jwtDecode } from 'jwt-decode'
// import Cookies from 'js-cookie'
import { Cookie } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css';
import { Toaster, toast } from 'sonner'
import SideNavDash from '@/components/sideNavDash'
import Cookies from 'js-cookie'

const AddServicePage: FC = () => {

  const [ isOpen, setIsOpen ] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [ isOpen1, setIsOpen1 ] = useState(false);

  const toggleDropdown1 = () => {
    setIsOpen1(!isOpen1);
  };

  const [ serviceStatus, setServiceStatus ] = useState("")
  const serviceAvailability =["Available", "Unavailable"]
  
  const [ userid, setUserId ] = useState("")

  useEffect(() => {
    const cookies = Cookies.get("ecom_token");
    if (cookies) {
      const { userID }: any = jwtDecode(cookies)
      setUserId(userID)
    }
  }, [])

  const [ selectedImage, setSelectedImage ] = useState<any>([])

  const [ services, setServices ] = useState({
    services: "",
    description: "",
    price: "",
    status: "",

  })

  const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));

  const onHandleImageUpload = (e: any) => {
    setSelectedImage(Array.from(e.target.files))
  }

  const AddServicesForm = async (e :any) => {

    e.preventDefault();
    const fd = new FormData();

    for(const image of selectedImage) {
      fd.append("file", image)
    }

    fd.append("services", services.services)
    fd.append("description", services.description);
    fd.append("price",services.price);
    fd.append("status", serviceStatus);
    fd.append("userID", userid);

    const response = await fetch("https://minervasales-23b0919d60c1.herokuapp.com/services/createServices", {
      method: "POST",
      body: fd
    })

    if(!response.ok) {
      throw new Error("There something wrong while updating")
  }

  }

  const handleGoBack = () => {
    // Trigger the router.back() function
    router.back();

    toast.promise(promise, {
      loading: 'Loading...',
      success: (products) => {
        return `Added a new service succesfully`;
      },
      error: 'Error',
    });
  }

  console.log({
    'file': selectedImage, 
    'services': services.services,
    'descriptions': services.description,
    'status': serviceStatus,
    'price': services.price,
  })
  


  return (
    <>
<SideNavDash/>

    <div className="h-screen bg-gray-200">
    <div className="flex w-full h-[1050px] bg-gradient-to-r from-amber-200 to-yellow-500 flex-col bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="pt-10 md:pl-96 md:pt-[46px]">
                    <div className="p-4 md:p-8">
                        <h1 className="text-black text-center font-bold pb-8 text-4xl md:text-5xl lg:text-6xl">Add New Service</h1>
                            <form encType='multipart/form-data' onSubmit={AddServicesForm} className="flex flex-col items-center">
                                    <div className="md:w-3/4 lg:w-2/3 xl:w-1/2">
                                            <div className="flex flex-col md:flex-row">
                                                

                                                <label htmlFor="name" className="text-lg absolute mt-2.5 text-black font-bold px-1 rounded ">
                                                   Service Name
                                                </label>
                                                
                                                <input id="name" type="text" name="name"
                                                    className="mt-10 py-4 px-4 pb-4 rounded-md bg-gray-900 text-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-600"
                                                    placeholder="Input service name"
                                                    onChange={(e) => setServices({...services, services: e.target.value})}
                                                    required/>

                                           
                                            </div>

                                            <div className="flex flex-col md:flex-row">
                                                

                                                <div className='flex flex-col mt-4 lg:ml-[60px] xl:ml-[130px]'> 
    <label className="text-lg absolute mt-2 text-black font-bold px-1 rounded lg:-ml-16" htmlFor="file_input">Upload photo</label>
                    <input name="file" className="mt-12 block -ml-16 w-60 text-sm text-gray-900 border border-gray-300 rounded-sm cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none" id="file_input" type="file" accept='image/*'  multiple onChange={onHandleImageUpload}/>
                    <p className="mt-2 ml-2 text-sm text-gray-900 dark:text-gray-800 lg:-ml-16" id="file_input_help">PNG, JPG, or JPEG</p>
                    </div>
    
                                               
                                                </div>
                                                

                                            <div className="flex flex-col md:flex-row">
                                                

                                                <label htmlFor="price" className="text-lg absolute mt-1.5 text-black font-bold px-1 rounded">
                                                   Service Price
                                                </label>
                                                
                                                <input id="price" type="text" name="price"
                                                    className="mt-10 py-4 px-4 rounded-md bg-gray-900 text-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-600"
                                                    placeholder="ex. 1000"
                                                    onChange={(e) => setServices({...services, price: e.target.value})} required/>

                                           
                                            </div>

                                                                          <div className="my-4 flex flex-row pr-40">
                                                                              

                                                                          <div>
                                                    <label htmlFor="lastName" className="text-lg absolute mt-1.5 text-black font-bold px-1 rounded">Service Status </label>
                                                    <button name="status"type="button" className="inline-flex justify-center w-[215px] rounded-md border border-gray-700 shadow-sm mt-10 px-4 py-2 bg-gray-900 text-md font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                                                      onClick={toggleDropdown}
                                                    >
                                                    {serviceStatus=== "" ? "Select Service Status" : serviceStatus}

                                                      <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 011.414 0 1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                                      </svg>
                                                    </button>
                                                  </div>
                                                  <div className={`w-full mt-[80px] flex flex-col bg-gray-900 text-md font-medium text-white rounded-md shadow-lg p-4 ${isOpen ? 'w-[190px] absolute z-20' : 'hidden'}`}>
                                {isOpen ? (
                                  serviceAvailability.map((name) => (
                                    <button
                                    name="stock"
                                      className='text-left'
                                      type="button"
                                      key={name}
                                      value={name}
                                      onClick={(e) => setServiceStatus(e.currentTarget.value)}
                                    >
                                      {name}
                                    </button>
                                  ))
                                ) : null}
                              </div>

                              </div>

                                            <label htmlFor="price" className=" text-lg absolute -z-8 mt-1.5 text-black font-bold px-1 rounded">
                                                   Service Description
                                                </label>
                                        <textarea id="message"
                                            className="mt-10 py-2 px-4 rounded-md bg-gray-900 text-gray-300 w-full h-[150px] outline-none focus:ring-2 focus:ring-blue-600" name='description'
                                            onChange={(e) => setServices({...services, description: e.target.value})} placeholder="Input your service description here" required/>
                                    </div>
                                <button
                                    className="border-2 text-md font-bold mt-5 rounded-md py-2 px-4 bg-[#FFBD59] shadow-md shadow-black hover:bg-yellow-500 text-gray-900 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-900" onClick={handleGoBack}>
                                    Add New Service
                                </button>
                            </form>
                            
                    </div>
                    </div>    
                    </div>
</div>
</>

  )
}

export default AddServicePage