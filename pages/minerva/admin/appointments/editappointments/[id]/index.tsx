import styles from '@/styles/admin/content.module.scss'
import AdminPageLayout from '@/layout/adminpagelayout'
import PageWithLayout from '@/layout/pagewithlayout'
import React, { FC, FormEvent, useEffect, useState } from 'react'
import Head from 'next/head'
import {TbClock, TbEdit, TbTrash, TbUsers } from 'react-icons/tb'
import router from 'next/router'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
import 'react-toastify/dist/ReactToastify.css';
import { Toaster, toast } from 'sonner'

const EditAppointmentsPage: FC = () => {

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
    if(!response.ok) 
    {
      alert("Please complete all fields")
    }
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
    
    <div>
      <Head>
        <title>Edit Appointments</title>
      </Head>

      <div className={styles.titleHead}>
      <div className={styles.icon}><TbClock size={50}/></div>
      Edit Appointments
      </div>

      <div className={styles.container}>
        <div className={styles.title}>Edit Details</div>
          <div className={styles.divider}></div>

          <div className="flex lg:flex-row flex-col items-center py-6 px-4">


<div className="w-full mx-28 my-32">


<div className=" w-full mx-auto">
    
<form encType='multipart/form-data' onSubmit={EditAppointmentForm} className='grid grid-cols-1 md:grid-cols-2 gap-16'>

        <div className="mb-6">
            <label htmlFor="firstName" className="text-sm font-medium text-gray-900 block mb-2">Customer Name</label>
            <input type="text" id="firstName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Input customer name" defaultValue={appointment.name} disabled required />
            </div>
        <div className="mb-6">
            <label htmlFor="middleName" className="text-sm font-medium text-gray-900 block mb-2">Service Name</label>
            <input type="text" id="middleName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
            onChange={(e) => setAppointment({...appointment, service: e.target.value})}
            placeholder="Input service name" defaultValue={appointment.service} disabled required />
            </div>
            <div className="mb-6">
                    <label htmlFor="customerName" className="text-sm font-medium text-gray-900 block mb-2">Select Date</label>                      
                   <input
                   disabled
                          id="date"
                          type="date"
                          name="date"
                          min="2023-12-6"
                          max="2030-01-31"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          onChange={(e) => setAppointment({...appointment, date: e.target.value})}
                          defaultValue={appointment.date}
                        />
                      
                    </div>
               
                <div className="mb-6">
                <label htmlFor="customerName" className="text-sm font-medium text-gray-900 block mb-2">Select Time</label>
                        <input
                        disabled
                          id="time"
                          type="time"
                          name="time"
                          min="08:30"
                          max="16:30"
                          defaultValue={appointment.time}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          onChange={(e) => setAppointment({...appointment, time: e.target.value})}
                        />
                    </div>
          
        <div className="mb-6">
        <div className="relative inline-block text-left">
  <div>
  <label htmlFor="lastName" className="text-sm font-medium text-gray-900 block mb-2">Appointment Status</label>
    <button type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
    onClick={toggleDropdown}
    >
      {appointmentStatus === "" ? "Select Appointment Status" : appointmentStatus}
      
      <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 011.414 0 1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
  <div className={`w-full flex flex-col rounded-md shadow-lg bg-primary-100 p-4 text-primary-600 ${isOpen ? 'w-[220px] absolute z-50' : 'hidden'}`}>
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
<br></br>
        <button type="submit" className="relative top-10 left-80  text-black bg-[#FFBD59] hover:bg-[#FFBD59] focus:ring-yellow-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={handleGoBack}>Update Appointment Details</button>
        <Toaster richColors  />
    </form>
</div>

</div>

          </div>
          </div>
          </div>

  )
}

(EditAppointmentsPage as PageWithLayout).layout = AdminPageLayout
export default EditAppointmentsPage