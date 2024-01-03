import React, { FC, FormEvent, useEffect, useState } from 'react'
import Head from 'next/head'
import {TbClock, TbEdit, TbTrash, TbUsers } from 'react-icons/tb'
import router, { useRouter } from 'next/router'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
import 'react-toastify/dist/ReactToastify.css';
import { Toaster, toast } from 'sonner'
import SideNavDash from '@/components/sideNavDash'
import HomePageLayout from '@/layout/homepagelayout'
import PageWithLayout from '@/layout/pagewithlayout'
import Link from 'next/link'
import Image from 'next/image'

const ViewAppointmentsPage: FC = () => {

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
    status: "",
    brand: '',
    model: '',
    platNo: '',
    remarks: '',
    type: '',
    year: '',
    reason: "",
  })

  const [ appointmentStatus, setAppointmentStatus ] = useState('');
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

        if (result && result.length > 0) {
          const { status } = result[0];
          setAppointmentStatus(status);


        }
      
    };

    fetchData();
  }, [router ]);

  console.log(appointment.status)

  const EditAppointmentForm = async (e :any) => {

    e.preventDefault();

    const response = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/schedule/updateSchedule/${router.query.id}`, {

         method: "PUT",
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
          reason: reason,
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
    appointmentD?.map(({userID, scheduleID, date, time, name, service, status, Car, User, Reason}: any) => {
      name === null ?
      
      User.map(({ profile }: any) => (
        setAppointment({
          id: scheduleID,
          date: date,
          time: time,
          name: `${profile.firstname} ${profile.lastname}`,
          status: status,
          service: service,
          brand: Car[0].brand,
          model: Car[0].model,
          platNo: Car[0].platNo,
          remarks: Car[0].remarks,
          type: Car[0].type,
          year: Car[0].year,
          reason: Reason[0]?.reason,
        })
      )) : setAppointment({
        id: scheduleID,
        date: date,
        time: time,
        name: name,
        status: status,
        service: service,
        brand: Car[0].brand,
        model: Car[0].model,
        platNo: Car[0].platNo,
        remarks: Car[0].remarks,
        type: Car[0].type,
        year: Car[0].year,
        reason: Reason[0]?.reason,
      }) 
    
    })
  }, [  appointmentD ])

  const [ reason, setReason ] = useState("")

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

    
        <div className="h-screen bg-gray-200">
        <div className="flex w-full h-[1200px] bg-gradient-to-r from-amber-200 to-yellow-500 flex-col bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="pt-32 md:pl-96 lt:pl-20 lg:pl-28 sm:pl-28">
                        <div className="p-4 md:p-8">
                            <h1 className="text-black text-center font-bold pb-8 text-4xl md:text-5xl lg:text-6xl">View Appointment Status</h1>
                                <form encType='multipart/form-data' onSubmit={EditAppointmentForm} className="flex flex-col items-center">
                                        <div className="md:w-4/5 lg:w-3/4 xl:w-2/3">
                                        <div className="flex flex-col md:flex-row gap-4">
                                                    
    
                                                    <label htmlFor="name" className="text-lg absolute mt-2.5 text-black font-bold px-1 rounded ">
                                                       Customer Name
                                                    </label>
                                                    
                                                    <input id="name" type="text" name="name"
                                                        className="mt-10 py-4 px-4 pb-4 rounded-md bg-gray-900 text-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-600"
                                                        placeholder="Input product name"
                                                        defaultValue={appointment.name} disabled required/>
    
    <label htmlFor="price" className="text-lg absolute lt:ml-[420px] lg:ml-[655px] md:ml-[655px] mt-[110px] xl:mt-0 text-black font-bold px-1 rounded">
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
                                                    Car Brand
                                                    </label>
                                                    
                                                    <input id="price" type="text" name="price"
                                                        className="mt-10 py-4 px-4 rounded-md bg-gray-900 text-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-600"
                                                        onChange={(e) => setAppointment({...appointment, brand: e.target.value})}
                                                        placeholder="Input service name" 
                                                        defaultValue={appointment.brand} disabled required/>
    
    <label htmlFor="price" className="text-lg absolute lt:ml-[420px] lg:ml-[655px] md:ml-[655px] mt-[120px] xl:mt-2 text-black font-bold px-1 rounded">
                                                    Car Model
                                                    </label>
                                                    
                                                    <input id="price" type="text" name="price"
                                                        className="mt-10 py-4 px-4 rounded-md bg-gray-900 text-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-600"
                                                        onChange={(e) => setAppointment({...appointment, model: e.target.value})}
                                                        placeholder="Input service name" 
                                                        defaultValue={appointment.model} disabled required/>
    
                                               
                                                </div>

                                                <div className="flex flex-col md:flex-row gap-4">
                                                    
                                                <label htmlFor="price" className="text-lg absolute mt-1.5 text-black font-bold px-1 rounded">
                                                    Car Model
                                                    </label>
                                                    
                                                    <input id="price" type="text" name="price"
                                                        className="mt-10 py-4 px-4 rounded-md bg-gray-900 text-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-600"
                                                        onChange={(e) => setAppointment({...appointment, model: e.target.value})}
                                                        placeholder="Input service name" 
                                                        defaultValue={appointment.model} disabled required/>
                                                   
                                                   <label htmlFor="price" className="text-lg absolute lt:ml-[420px] lg:ml-[655px] md:ml-[655px] mt-[120px] xl:mt-2 text-black font-bold px-1 rounded">
                                                    Car Plate No.
                                                    </label>
                                                    
                                                    <input id="price" type="text" name="price"
                                                        className="mt-10 py-4 px-4 rounded-md bg-gray-900 text-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-600"
                                                        onChange={(e) => setAppointment({...appointment, platNo: e.target.value})}
                                                        placeholder="Input service name" 
                                                        defaultValue={appointment.platNo} disabled required/>
    
                                               
                                                </div>

                                                <div className="flex flex-col md:flex-row gap-4">
                                                    
                                                <label htmlFor="price" className="text-lg absolute mt-1.5 text-black font-bold px-1 rounded">
                                                    Car Year
                                                    </label>
                                                    
                                                    <input id="price" type="text" name="price"
                                                        className="mt-10 w-[640px] py-4 px-4 rounded-md bg-gray-900 text-gray-300  outline-none focus:ring-2 focus:ring-blue-600"
                                                        onChange={(e) => setAppointment({...appointment, year: e.target.value})}
                                                        placeholder="Input service name" 
                                                        defaultValue={appointment.year} disabled required/>
    
    <div>
                          <label htmlFor="lastName" className="text-lg absolute mt-1.5 text-black font-bold px-1 rounded">Appointment Status </label>
                          <button name="status"type="button" className="inline-flex justify-center w-[220px] rounded-md border border-gray-700 shadow-sm mt-10 px-4 py-2 bg-gray-900 text-md font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                           disabled  onClick={toggleDropdown}
                          >
                           {appointmentStatus === "" ? "Select Appointment Status" : appointmentStatus}
    
                            <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 011.414 0 1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                          </button>
                        </div>
                        <div className={`w-full mt-[80px] flex flex-col bg-gray-900 text-md font-medium text-white rounded-md shadow-lg p-4 ${isOpen ? 'w-[219px] sm:w-[220px] absolute z-20 right-[530px]' : 'hidden'}`}>
      {isOpen ? (
        appointmentStatusB.map((name) => (
          <button
          name="stock"
            className='text-left'
            type="button"
            key={name}
            value={name}
            onClick={(e) => setAppointmentStatus(name)}
            disabled
          >
            {name}
          </button>
        ))
      ) : null}
      
    </div>
    
                                               
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

                                                    <label htmlFor="price" className="text-lg absolute mt-[110px] ml-[650px] xl:mt-2 text-black font-bold px-1 rounded">
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

    
                                                <div className="flex flex-col md:flex-row gap-4">
                                                    
                                                    <label htmlFor="price" className=" text-lg absolute -z-8 mt-1.5 text-black font-bold px-1 rounded">
           Remarks
        </label>
    <textarea id="message"
    className="w-full mt-10 py-2 px-4 rounded-md bg-gray-900 text-gray-300  h-[150px] outline-none focus:ring-2 focus:ring-blue-600" name='description'
    onChange={(e) => setAppointment({...appointment, remarks: e.target.value})} placeholder="Input any other remarks" disabled defaultValue={appointment.remarks} required/>

                                                    </div>
                                                    { appointmentStatus === "Cancelled" ? <div className="flex flex-col md:flex-row gap-4">
    
    <label htmlFor="price" className="text-lg absolute mt-[110px] xl:mt-2 text-black font-bold px-1 rounded">
           Reason for Cancellation
        </label>
    <textarea id="message"
    className="w-full mt-10 py-2 px-4 rounded-md bg-gray-900 text-gray-300  h-[150px] outline-none focus:ring-2 focus:ring-blue-600" name='description'
    disabled onChange={(e) => setReason(e.currentTarget.value)} defaultValue={appointment.reason} placeholder="Input cancellation reason"/>
    </div>
: null }

    
                                    
                                        </div>
                                    {/* <button
                                        type="submit" onClick={handleGoBack} className="border-2 text-md font-bold mt-5 rounded-md py-2 px-4 bg-[#FFBD59] shadow-md shadow-black hover:bg-yellow-500 text-gray-900 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-900">
                                        Update Appointment Status
                                    </button> */}
                                </form>
                                
                        </div>
                        </div>    
                        </div>
    </div>
    <section className="absolute top-[1100px] w-full mt-10 flex flex-col items-center justify-center text-center text-white ">
             <footer className="py-10 w-full 12:mt-12 flex flex-col space-y-10 justify-center bg-gradient-to-r from-[#FFBD59] via-gray-100 to-[#FFBD59]">
   
             <nav className="flex justify-center flex-wrap gap-6 text-gray-500 font-medium">
    <Link className="text-black hover:text-gray-500" href="/">Home</Link>
    <Link className="text-black hover:text-gray-500" href="/product">Products</Link>
    <Link className="text-black hover:text-gray-500" href="/services">Services</Link>
    <Link className="text-black hover:text-gray-500" href="/about">About</Link>
    <Link className="text-black hover:text-gray-500" href="/contact">Contact</Link>
</nav>

<div className="flex justify-center space-x-5">
    <Link href="https://www.facebook.com/MinervaSalesCorp" target="_blank" rel="noopener noreferrer">
        <Image src="/fblogo.webp" alt = "" width={20} height={10}/>
   </Link>
  
</div>
<p className="text-center text-gray-700 font-medium">&copy; 2023 Minerva Sales Corporation. All rights reserved.</p>
   </footer>
   
             </section>
    </>
    

  )
}

(ViewAppointmentsPage as PageWithLayout).layout = HomePageLayout
export default ViewAppointmentsPage