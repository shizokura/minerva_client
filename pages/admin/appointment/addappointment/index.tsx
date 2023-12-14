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

const AddAppointmentsPage: FC = () => {

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

  const [ appointment, setAppointment ] = useState({
    date: "",
    service: "",
    time: "",
    name: ""
  })

  const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));

  const AddAppointmentForm = async (e :any) => {

    e.preventDefault();
    
    const response = await fetch("http://localhost:3001/schedule/createManualSchedule", {
      method: "POST",  
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "date": appointment.date,
        "time" : appointment.time,
        "name": appointment.name,
        "service": appointment.service,
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

  const handleGoBack = () => {

    setTimeout(() => {
      router.back();
  
      toast.promise(promise, {
        loading: 'Loading...',
        success: (productsD) => {
          return `Added new manual appointment successfully`;
        },
        error: 'Error',
      });
    }, 2000);
  }


  console.log({
    'name': appointment.name,
    'service': appointment.service,
    'date': appointment.date,
    'time': appointment.time,
    userID: userid
  })

  return (

    <>
<SideNavDash/>

    <div className="h-screen bg-gray-200">
    <div className="flex w-full h-[1050px] bg-gradient-to-r from-amber-200 to-yellow-500 flex-col bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="pt-10 md:pl-96 md:pt-[46px]">
                    <div className="p-4 md:p-8">
                        <h1 className="text-black text-center font-bold pb-8 text-4xl md:text-5xl lg:text-6xl">Add Manual Appointment</h1>
                            <form encType='multipart/form-data' onSubmit={AddAppointmentForm} className="flex flex-col items-center">
                                    <div className="md:w-4/5 lg:w-3/4 xl:w-2/3">
                                            <div className="flex flex-col md:flex-row">
                                                

                                                <label htmlFor="name" className="text-lg absolute mt-2.5 text-black font-bold px-1 rounded ">
                                                   Customer Name
                                                </label>
                                                
                                                <input id="name" type="text" name="name"
                                                    className="mt-10 py-4 px-4 pb-4 rounded-md bg-gray-900 text-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-600"
                                                    placeholder="Input customer name"
                                                    onChange={(e) => setAppointment({...appointment, name: e.target.value})} required/>

                                           
                                            </div>

                                            <div className="flex flex-col md:flex-row">
                                                

                                                <label htmlFor="price" className="text-lg absolute mt-1.5 text-black font-bold px-1 rounded">
                                                   Service Name
                                                </label>
                                                
                                                <input id="price" type="text" name="price"
                                                    className="mt-10 py-4 px-4 rounded-md bg-gray-900 text-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-600"
                                                    placeholder="Input service name"
                                                    onChange={(e) => setAppointment({...appointment, service: e.target.value})}  required 
                                                    />

                                           
                                            </div>

                                            <div className="flex flex-col md:flex-row gap-4">
                                                    
    
                                                    <label htmlFor="price" className="text-lg absolute mt-2 text-black font-bold px-1 rounded">
                                                    Select Start Date
                                                    </label>
                                                    

                                                    <input
                                                            id="date"
                                                            type="date"
                                                            name="date"
                                                            min="2023-12-9"
                                                            max="2030-01-31"
                                                            className="bg-gray-50 border mt-10 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                            onChange={(e) => setAppointment({...appointment, date: e.target.value})}
                                                       />
                                               
                                                </div>
    
                                                <div className="flex flex-col md:flex-row gap-4"> 
                                                <label htmlFor="price" className="text-lg absolute mt-2 text-black font-bold px-1 rounded">
                                                    Select End Date
                                                    </label>
    
                                                    <select
                            id="time"
                            name="time"
                            value={appointment.time} 
                            onChange={(e) => setAppointment({...appointment, time: e.target.value})}
                            className="bg-gray-50 border mt-10 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          >
                            {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'].map((time) => (
                              <option key={time} value={time} className='w-80'>
                                {time}
                              </option>
                            ))}
                            </select>
                                               
                                               </div> 

                                               </div>

                                           
                                <button
                                    className="border-2 text-md font-bold mt-5 rounded-md py-2 px-4 bg-[#FFBD59] shadow-md shadow-black hover:bg-yellow-500 text-gray-900 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-900">
                                    Add Manual Schedule
                                </button>
                            </form>
                            
                    </div>
                    </div>    
                    </div>
</div>
</>
    
  )
}

export default AddAppointmentsPage