import React, { FC, FormEvent, useEffect, useState } from 'react'
import Head from 'next/head'
import {TbClock, TbEdit, TbTrash, TbUsers } from 'react-icons/tb'
import router, { useRouter } from 'next/router'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
import 'react-toastify/dist/ReactToastify.css';
import { Toaster, toast } from 'sonner'
import SideNavDash from '@/components/sideNavDash'

const EditAppointmentPage: FC = () => {

  const [ status, setStatus ] = useState("") // set niyo ung status

  const [isOpen, setIsOpen] = useState(false);

 
  const [ userid, setUserId ] = useState("")
  const [usersId, setUsersId] = useState("");

  
  const [ appointmentD, setAppointmentD ] = useState<[]>()

  const [ appointment, setAppointment ] = useState({
    id: "",
    date: "",
    service: "",
    time: "",
    name: "",
    status: ""
  })

  const [ appointmentStatus, setAppointmentStatus ] = useState(appointment.status || "");
  const appointmentStatusB =["Pending", "Completed", "Cancelled"];


  useEffect(() => {
    const cookies = Cookies.get("ecom_token")
    if (cookies) {
      const { userID }: any = jwtDecode(cookies)
      setUserId(userID)
    }
  }, [ userid ])
  
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
    
        const res = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/schedule/${router.query.id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          cache: 'default',
        });
  
        if (!res.ok) {
          throw new Error(`Failed to fetch appointment data: ${res.status}`);
        }
  
        const result = await res.json();
        setAppointmentD(result)

        
      
    };

    fetchData();
  }, [router, appointmentD ]);

  console.log(appointment.status)

  const EditAppointmentForm = async (e :any) => {

    e.preventDefault();

    const response = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/schedule/updateSchedule/${router.query.id}`, {

         method: "PUT",
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
          status: appointmentStatus,
          userID: userid
        })
    })
    // if(!response.ok) 
    // {
    //   alert("Please complete all fields")
    // }
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  useEffect(() => {
    appointmentD?.map(({userID, scheduleID, date, time, name, service, status, User}: any) => {
      name === null ?
      
      User.map(({ profile }: any) => (
        setAppointment({
          id: scheduleID,
          date: date,
          time: time,
          name: `${profile.firstname} ${profile.lastname}`,
          status: status,
          service: service

        })
      )) : setAppointment({
        id: scheduleID,
        date: date,
        time: time,
        name: name,
        status: status,
        service: service

      }) 
    
    })
  }, [  appointmentD ])

  const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));

  const handleGoBack = () => {
    // Trigger the router.back() function
    router.back();

    toast.promise(promise, {
      loading: 'Loading...',
      success: (productsD) => {
        
        return `Updated appointment status succesfully`;
      },
      error: 'Error',
    });
  }

  return (
    
    <>
    <SideNavDash/>
    
        <div className="h-screen bg-gray-200">
        <div className="flex w-full h-[1050px] bg-gradient-to-r from-amber-200 to-yellow-500 flex-col bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="pt-20 md:pl-96 md:pt-[80px] lt:pl-20 lg:pl-96 sm:pl-28">
                        <div className="p-4 md:p-8">
                            <h1 className="text-black text-center font-bold pb-8 text-4xl md:text-5xl lg:text-6xl">Update Appointment Status</h1>
                                <form encType='multipart/form-data' onSubmit={EditAppointmentForm} className="flex flex-col items-center">
                                        <div className="md:w-4/5 lg:w-3/4 xl:w-2/3">
                                                <div className="flex flex-col md:flex-row">
                                                    
    
                                                    <label htmlFor="name" className="text-lg absolute mt-2.5 text-black font-bold px-1 rounded ">
                                                       Customer Name
                                                    </label>
                                                    
                                                    <input id="name" type="text" name="name"
                                                        className="mt-10 py-4 px-4 pb-4 rounded-md bg-gray-900 text-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-600"
                                                        placeholder="Input product name"
                                                        defaultValue={appointment.name} disabled required/>
    
                                               
                                                </div>
    
                                                <div className="flex flex-col md:flex-row">
                                                    
    
                                                    <label htmlFor="price" className="text-lg absolute mt-1.5 text-black font-bold px-1 rounded">
                                                    Service Name
                                                    </label>
                                                    
                                                    <input id="price" type="text" name="price"
                                                        className="mt-10 py-4 px-4 rounded-md bg-gray-900 text-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-600"
                                                        onChange={(e) => setAppointment({...appointment, service: e.target.value})}
                                                        placeholder="Input service name" 
                                                        defaultValue={appointment.service} disabled required/>
    
                                               
                                                </div>

                                                <div className="flex flex-col md:flex-row gap-4">
                                                    
    
                                                    <label htmlFor="price" className="text-lg absolute mt-1.5 text-black font-bold px-1 rounded">
                                                    Select Date
                                                    </label>
                                                    

                                                    <input
                                                    disabled
                                                    id="date"
                                                   type="date"
                                                    name="date"
                                                    min="2023-12-6"
                                                     max="2030-01-31"
                                                    className="mt-10 py-4 px-4 rounded-md bg-gray-900 text-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-600"
                                                     onChange={(e) => setAppointment({...appointment, date: e.target.value})}
                                                    defaultValue={appointment.date}
                                                        />

                                                    <label htmlFor="price" className="text-lg absolute mt-[110px] md:ml-[490px] xl:mt-2 text-black font-bold px-1 rounded">
                                                    Select Time
                                                    </label>
    
                                                    <input
                                                    disabled
                                                      id="time"
                                                      type="time"
                                                      name="time"
                                                      min="08:30"
                                                      max="16:30"
                                                      defaultValue={appointment.time}
                                                      className="mt-10 py-4 px-4 rounded-md bg-gray-900 text-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-600"
                                                      onChange={(e) => setAppointment({...appointment, time: e.target.value})}
                                                    />
                                               
                                                </div>
    
                                                <div className="my-4 flex flex-row md:gap-[620px]">
                                                    
    
                                                <div>
                          <label htmlFor="lastName" className="text-lg absolute mt-1.5 text-black font-bold px-1 rounded">Appointment Status </label>
                          <button name="status"type="button" className="inline-flex justify-center w-[220px] rounded-md border border-gray-700 shadow-sm mt-10 px-4 py-2 bg-gray-900 text-md font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                            onClick={toggleDropdown}
                          >
                           {appointmentStatus === "" ? "Select Appointment Status" : appointmentStatus}
    
                            <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 011.414 0 1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                          </button>
                        </div>
                        <div className={`w-full mt-[80px] flex flex-col bg-gray-900 text-md font-medium text-white rounded-md shadow-lg p-4 ${isOpen ? 'w-[219px] sm:w-[220px] absolute z-20' : 'hidden'}`}>
      {isOpen ? (
        appointmentStatusB.map((name) => (
          <button
          name="stock"
            className='text-left'
            type="button"
            key={name}
            value={name}
            onClick={(e) => setAppointmentStatus(e.currentTarget.value)}
          >
            {name}
          </button>
        ))
      ) : null}
    </div>
    
                                               
                                                </div>
    
                                               
    

    
                                    
                                        </div>
                                    <button
                                        type="submit" onClick={handleGoBack} className="border-2 text-md font-bold mt-5 rounded-md py-2 px-4 bg-[#FFBD59] shadow-md shadow-black hover:bg-yellow-500 text-gray-900 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-900">
                                        Update Appointment Status
                                    </button>
                                </form>
                                
                        </div>
                        </div>    
                        </div>
    </div>
    </>
    

  )
}

export default EditAppointmentPage