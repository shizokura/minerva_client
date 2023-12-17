import React, { FC, useState, useEffect } from 'react'
import  SideNavDash  from '@/components/sideNavDash'
import { TbEdit, TbUser } from 'react-icons/tb'
import Modal from '@/components/Modal';
import {  TbTrash, TbUsers, } from 'react-icons/tb'
import 'react-toastify/dist/ReactToastify.css';
import { Toaster, toast } from 'sonner'
import { FormattedPrice, FormattedDate } from '@/helpers/index'
import { useRouter } from 'next/router';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { set } from 'date-fns';
import { jwtDecode } from 'jwt-decode';
import Cookies
 from 'js-cookie';
import { title } from 'process';
const EditAboutUsPage: FC = () => {
  
  
  const router = useRouter()

  const [ userid, setuserid ] = useState("")
  
  const [ userId, setUserId] = useState("")
  const [ page, setPage ] = useState(0)
  const [ isModalOpen, setIsModalOpen ] = useState(false);

  const [confirmationInput, setConfirmationInput] = useState('');
  const correctInputValue = 'delete';

  useEffect(() => {
    const cookies = Cookies.get("ecom_token");
    if (cookies) {
      const { userID }: any = jwtDecode(cookies)
      setUserId(userID)
    }
  }, [])
  
  const handleOpenModal = () => {
    setIsModalOpen(true);
  }
  const handleCloseModal = () => {
    setTimeout(() => {
      setIsModalOpen(false);
    }, 2000);
  }
  const [ aboutUsD, setAboutUsD ] = useState<[]>()

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/about/getAllAbout/${router.query.id}`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
        cache: "default"
      })


      if (!response.ok) {
        throw new Error("There something wrong while fetching data")
      }

      const result = await response.json();

      setAboutUsD(result)

    }


    fetchData();
  }, [ router ])

  const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setConfirmationInput(e.target.value);
  };

  const [aboutUs, setAboutUs] = useState({
    title: "",
    description: "",
  })

  const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));
  
  const EditAboutUsForm = async (e: any) => {
    e.preventDefault();
    
    // Use products state directly here
    // const fd = new FormData();
    // fd.append('name', products.name);
    // fd.append('descriptions', products.description);
    // fd.append('category', productCategory);
    // fd.append('price', products.price);
    // fd.append('stock', productStock);
    // fd.append('quantity', products.quantity);
    // fd.append('userID', userId);

      const response = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/about/updateAbout/${router.query.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "title": aboutUs.title,
          "description": aboutUs.description,
          "userID": userId
        }),
      });

      if(!response.ok) 
    {
      toast.warning("Please complete all fields.")
    }


  }

  
  useEffect(() => {
    aboutUsD?.map(({ userID, aboutID, id, title, description,}: any) => {
        setAboutUs({
          title: title,
          description: description

        })
    })
    
  }, [aboutUsD])

  const handleGoBack = () => {
    // Trigger the router.back() function
    router.back();

    toast.promise(promise, {
      loading: 'Loading...',
      success: (productsD) => {
        return `Updated content succesfully`;
      },
      error: 'Error',
    });
  }

  
  console.log(userId)
console.log(aboutUs)

  return (
    
    <>
        <title>Edit Content</title>


    <SideNavDash/>

    <div className="h-screen bg-gray-200">
    <div className="flex w-full h-[1050px] bg-gradient-to-r from-amber-200 to-yellow-500 flex-col bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="pt-10 md:pl-96 md:pt-[46px] lt:pl-20 lg:pl-96">
                    <div className="p-4 md:p-8">
                        <h1 className="text-black text-center font-bold pb-8 text-4xl md:text-5xl lg:text-6xl">Edit About Us Details</h1>
                            <form encType='multipart/form-data' onSubmit={EditAboutUsForm} className="flex flex-col items-center">
                                    <div className="md:w-4/5 lg:w-3/4 xl:w-2/3">
                                            <div className="flex flex-col md:flex-row">
                                                

                                                <label htmlFor="name" className="text-lg absolute mt-2.5 text-black font-bold px-1 rounded ">
                                                   Title
                                                </label>
                                                
                                                <input id="title" type="text" name="title"
                                                    className="mt-10 py-4 px-4 pb-4 rounded-md bg-gray-900 text-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-600"
                                                    placeholder="Input title"
                                                    onChange={(e) => setAboutUs({...aboutUs, title: e.target.value})}
                                                    value={aboutUs.title} required/>

                                           
                                            </div>

                                            <div className="flex flex-col md:flex-row">
                                                

                                                <label htmlFor="price" className=" text-lg absolute -z-8 mt-1.5 text-black font-bold px-1 rounded">
                                                       Vision Description
                                                    </label>
                                                <textarea 
                                                value={aboutUs.description}
                                                placeholder="Input description"
                                                id="description"
                                                className="mt-10 py-2 px-4 rounded-md bg-gray-900 text-gray-300 w-full h-[150px] outline-none focus:ring-2 focus:ring-blue-600"
                                                onChange={(e) => setAboutUs({...aboutUs, description: e.target.value})}
                                                
                                                name="description"
                                                />
    
                                               
                                                </div>

                                                </div>
                                <button
                                    className="border-2 text-md font-bold mt-5 rounded-md py-2 px-4 bg-[#FFBD59] shadow-md shadow-black hover:bg-yellow-500 text-gray-900 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-900">
                                    Update Content Details
                                </button>
                            </form>
                            
                    </div>
                    </div>    
                    </div>
                    <Toaster richColors/>
</div>


  </>
  )
}


export default EditAboutUsPage