import styles from '@/styles/admin/content.module.scss'
import AdminPageLayout from '@/layout/adminpagelayout'
import PageWithLayout from '@/layout/pagewithlayout'
import React, { FC, useEffect, useState, SyntheticEvent } from 'react'
import Head from 'next/head'
import { TbListSearch, TbCalendar, TbEdit, TbTrash, TbUsers } from 'react-icons/tb'
import router from 'next/router'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import 'react-toastify/dist/ReactToastify.css';
import { Toaster, toast } from 'sonner'

const AddServicesPage: FC = () => {

  const [ isOpen, setIsOpen ] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [ isOpen1, setIsOpen1 ] = useState(false);

  const toggleDropdown1 = () => {
    setIsOpen1(!isOpen1);
  };

  const [ serviceStatus, setServiceStatus ] = useState("")
  const serviceAvailability = [ "Available", "Unavailable" ]

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

  const AddServicesForm = async (e: any) => {

    e.preventDefault();
    const fd = new FormData();

    for (const image of selectedImage) {
      fd.append("file", image)
    }

    fd.append("services", services.services)
    fd.append("description", services.description);
    fd.append("price", services.price);
    fd.append("status", serviceStatus);
    fd.append("userID", userid);

    const response = await fetch("https://minervasales-23b0919d60c1.herokuapp.com/services/createServices", {
      method: "POST",
      body: fd
    })

    if (!response.ok) {
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

    <div>
      <Head>
        <title>Service Management</title>
      </Head>

      <div className={styles.titleHead}>
        <div className={styles.icon}><TbListSearch size={50} /></div>
        Add Service Details
      </div>

      <div className={styles.container}>
        <div className={styles.title}>Add Service Details</div>
        <div className={styles.divider}></div>

        <div className="flex lg:flex-row flex-col items-center py-6 px-4">


          <div className="w-full mx-28 my-28">


            <div className=" w-full mx-auto">

              <form encType='multipart/form-data' onSubmit={AddServicesForm} className='grid grid-cols-1 md:grid-cols-2 gap-16'>
                <div className="mb-6">
                  <label htmlFor="productName" className="text-sm font-medium text-gray-900 block mb-2">Service Name</label>
                  <input name="services" type="text" id="productName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e) => setServices({ ...services, services: e.target.value })} placeholder="Input service name" />
                </div>
                <div className="mb-6">
                  <div className="relative inline-block text-left">
                    <div>
                      <label htmlFor="lastName" className="text-sm font-medium text-gray-900 block mb-2">Service Status</label>
                      <button name="status" type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                        onClick={toggleDropdown}
                      >
                        {serviceStatus === "" ? "Select Service Status" : serviceStatus}
                        <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 011.414 0 1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    <div className={`w-full flex flex-col rounded-md shadow-lg bg-primary-100 p-4 text-primary-600 ${isOpen ? 'absolute z-10' : 'hidden'}`}>
                      {isOpen ? (
                        serviceAvailability.map((name) => (
                          <button
                            name="status"
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
                </div>
                <div className="mb-6">
                  <label htmlFor="description" className="text-sm font-medium text-gray-900 block mb-2">Service Description</label>
                  <textarea name="description" id="description" className="h-40 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 start-0" onChange={(e) => setServices({ ...services, description: e.target.value })} placeholder="Input your product description here" required />
                </div>
                <div className="mb-6">
                  <label htmlFor="price" className="text-sm font-medium text-gray-900 block mb-2">Service Price</label>
                  <input name="price" type="text" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " onChange={(e) => setServices({ ...services, price: e.target.value })} placeholder="ex. PHP 999.00" required />
                </div>

                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-black" htmlFor="file_input">Upload photo</label>
                  <input name="file" className="block w-80 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none" id="file_input" type="file" accept='image/*' multiple onChange={onHandleImageUpload} />
                  <p className="mt-1 text-sm text-gray-900 dark:text-gray-800" id="file_input_help">PNG, JPG, or JPEG</p>
                </div>
                <br></br>
                <button type="submit" className="relative left-80 text-black bg-[#FFBD59] hover:bg-[#FFBD59] focus:ring-yellow-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={handleGoBack}>Add New Service</button>
                <Toaster richColors />
              </form>
            </div>

          </div>

        </div>
      </div>
    </div>

  )
}

(AddServicesPage as PageWithLayout).layout = AdminPageLayout
export default AddServicesPage