import styles from '@/styles/admin/content.module.scss'
import AdminPageLayout from '@/layout/adminpagelayout'
import PageWithLayout from '@/layout/pagewithlayout'
import React, { FC, FormEvent, useEffect, useState } from 'react'
import Head from 'next/head'
import { TbClock, TbEdit, TbTrash, TbUsers } from 'react-icons/tb'
import router from 'next/router'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import 'react-toastify/dist/ReactToastify.css';
import { Toaster, toast } from 'sonner'
import SideNavDash from '@/components/sideNavDash'

const AddAboutUsPage: FC = () => {

  const [ isOpen, setIsOpen ] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [ appointmentStatus, setAppointmentStatus ] = useState("");
  const appointmentStatusB =["Pending", "Completed", "Cancelled"];

  const [ userid, setUserId ] = useState("")

  useEffect(() => {
    const cookies = Cookies.get("ecom_token")
    if (cookies) {
      const { userID }: any = jwtDecode(cookies)
      setUserId(userID)
    }
  }, [])

  const [ aboutus, setAboutUs ] = useState({
    title: "",
    description: "",
  })

  const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));

  const AddAboutUsForm = async (e :any) => {

    e.preventDefault();
    
    const response = await fetch("https://minervasales-23b0919d60c1.herokuapp.com/about/createAbout", {
      method: "POST",  
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "title": aboutus.title,
        "description" : aboutus.description,
        userID: userid
      })
    })

    if(!response.ok) 
    {
      alert("Please complete all fields")
    }
    else{
      
    }
  }



  console.log({
    "title": aboutus.title,
    "description" : aboutus.description,
    userID: userid
  })

  return (

    <>
<SideNavDash/>

    <div className="h-screen bg-gray-200">
    <div className="flex w-full h-[1050px] bg-gradient-to-r from-amber-200 to-yellow-500 flex-col bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="pt-10 md:pl-96 md:pt-[46px] lt:pl-20 lg:pl-96 sm:pl-24">
                    <div className="p-4 md:p-8">
                        <h1 className="text-black text-center font-bold pb-8 text-4xl md:text-5xl lg:text-6xl">Add About Us Content</h1>
                            <form encType='multipart/form-data' onSubmit={AddAboutUsForm} className="flex flex-col items-center">
                                    <div className="md:w-4/5 lg:w-3/4 xl:w-2/3">
                                            <div className="flex flex-col md:flex-row">
                                                

                                                <label htmlFor="name" className="text-lg absolute mt-2.5 text-black font-bold px-1 rounded ">
                                                   Title
                                                </label>
                                                
                                                <input id="name" type="text" name="name"
                                                    className="mt-10 py-4 px-4 pb-4 rounded-md bg-gray-900 text-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-600"
                                                    placeholder="Input title"
                                                    onChange={(e) => setAboutUs({...aboutus, title: e.target.value})} required/>

                                           
                                            </div>

                                            <div className="flex flex-col md:flex-row">
                                                

                                            <label htmlFor="price" className=" text-lg absolute -z-8 mt-1.5 text-black font-bold px-1 rounded">
                                                   Description
                                                </label>
                                            <textarea 
                                            placeholder="Input description"
                                            id="message"
                                            className="mt-10 py-2 px-4 rounded-md bg-gray-900 text-gray-300 w-full h-[150px] outline-none focus:ring-2 focus:ring-blue-600"
                                            onChange={(e) => setAboutUs({...aboutus, description: e.target.value})}
                                            name="description"/>

                                           
                                            </div>

                                            </div>

                                           
                                <button
                                    className="border-2 text-md font-bold mt-5 rounded-md py-2 px-4 bg-[#FFBD59] shadow-md shadow-black hover:bg-yellow-500 text-gray-900 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-900">
                                    Add Content Details
                                </button>
                            </form>
                            
                    </div>
                    </div>    
                    </div>
</div>
</>
    
  )
}

export default AddAboutUsPage