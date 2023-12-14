import HomePageLayout from '@/layout/homepagelayout'
import PageWithLayout from '@/layout/pagewithlayout'
import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from "@/styles/customer/customer.module.scss";
import { useRouter } from 'next/router';
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
import { FormattedPrice } from '@/helpers/index'
import 'react-toastify/dist/ReactToastify.css';
import { Toaster, toast } from 'sonner'
import Link from 'next/link'
import Script from 'next/script'
const ServiceDetails: FC = () => {

  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');

  const handleTimeButtonClick = (time: string) => {
    // Handle the click event for time buttons
    setSelectedTime(time);
  };
  const handleScheduleClick = () => {
    // Handle the click event for the "Schedule" button
    // You can use selectedDate and selectedTime in your logic here
    console.log('Selected Date:', selectedDate);
    console.log('Selected Time:', selectedTime);
  };


  const [ userid, setUserId] = useState("")
  const [ servicesD, setServicesD ] = useState<[]>()


  useEffect(() => {
    const cookies = Cookies.get("ecom_token");
    if(cookies) {
      const { userID } = jwtDecode(cookies) as any
      setUserId(userID)
    }
  }, [ ])

  const [ appointment, setAppointment ] = useState({
    date: "",
    service: "",
    time: "",
  })

  const [services, setServices] = useState({
    services: '',
    status: '',
    price: '',
    image: ''
  });



  const AddAppointmentForm = async (e: any) => {

    e.preventDefault();

    const response = await fetch("https://minervasales-23b0919d60c1.herokuapp.com/schedule/createSchedule", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: appointment.date,
        time: appointment.time,
        service: services.services,
        userID: userid
      })
    })

    if (!response.ok) {
      toast.error('Please make sure to provide necessary details')
    }
    else {
      toast.success('Appontment has been created')
      return response.json()
    }
  }



  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/services/getAllServices/${router.query.id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          cache: 'default',
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch product data: ${res.status}`);
        } 

        const result = await res.json();
        setServicesD(result);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchData();
  }, [ router ])







  useEffect(() => {
    servicesD?.map(({ servicesID, image, services, price, status, userID, }: any) => {
      setServices({
        image: image,
        services: services,
        price: price,
        status: status,
      })
    })
  }, [ servicesD ])

  return (
    <>
    <Toaster richColors/>
    <div className="max-w-screen-xl ml-8 lg:ml-80 mx-auto px-6 14:-px-6 md:px-8 lg:px-12 pt-32 lg:pt-40 pb-6 lg:pb-12">
        <div className="bg-yellow-100  14:-ml-12 py-8 lg:py-12 px-6 relative text-center">
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                Book A Service
            </p>
            <p className="prose lg:prose-lg xl:prose-2xl mx-auto">Setup your Appointment Now</p>
            <div className="h-12 w-12 bg-yellow-100 left-1/2 -ml-6 -bottom-6 absolute transform rotate-45">&nbsp;</div>
        </div>
    </div>
    <form encType='multipart/form-data' onSubmit={AddAppointmentForm} className='grid grid-cols-1 md:grid-cols-2 gap-16'>
    
    <div className=" w-96 ml-4 lg:ml-[770px] bg-white border mt-4 border-gray-200 rounded-lg shadow transition-all duration-700 hover:scale-105">
    
                <div className="w-96  bg-white border border-gray-200 rounded-lg shadow transition-all duration-700 hover:scale-105">
    
                          <Image src={services.image} alt={""} height={250} width={550} />
                       
                        <div className="p-4">
                                  <h4 className="text-xl font-semibold text-black-600 text-center">
                                    {services.services}
                                  </h4>
                                  <p className="mb-2 leading-normal text-center">
                                  {services.status}
                                  </p>
                                  <p className="mr-2 text-lg font-bold text-black dark:text-black">
                                  {FormattedPrice(services.price as any) }
                                  </p>
                          </div>
                  </div>
                  <div className="mb-6 w-60 ml-16 lg:ml-[75px]">
                        <label htmlFor="customerName" className="w-60 text-sm font-medium text-white block mb-2">Select Date</label>                        
                        <input
                              id="date"
                              type="date"
                              name="date"
                              min="2023-12-9"
                              max="2030-01-31"
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                              onChange={(e) => setAppointment({...appointment, date: e.target.value})}
                            />
                          
    
    
    
                          <label htmlFor="customerName" className="text-sm font-medium text-white block mb-2 w-60">Select Time</label>
                          <select
                            id="time"
                            name="time"
                            value={appointment.time} 
                            onChange={(e) => setAppointment({...appointment, time: e.target.value})}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          >
                            {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'].map((time) => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))}
                            </select>
              
            <button
            type="submit"
              className="mt-8 mb-8 ml-2 w-56 rounded-full border-6 border-yellow-100 bg-[#FFBD59] px-16 py-4 text-base font-bold text-white transition hover:translate-y-1"
            >
              Schedule
            </button>
            
      </div>
              </div>
    
              </form>
    
    
      
            <footer className="py-10 w-[420px] lg:w-[1920px] lg:ml-[0px] lg:mt-12 flex flex-col space-y-10 justify-center bg-gradient-to-r from-gray-100 via-[#FFBD59] to-gray-100">
    
    <nav className="flex justify-center flex-wrap gap-6 text-gray-500 font-medium">
        <Link className="text-black hover:text-gray-500" href="#">Home</Link>
        <Link className="text-black hover:text-gray-500" href="#">Products</Link>
        <Link className="text-black hover:text-gray-500" href="#">Services</Link>
        <Link className="text-black hover:text-gray-500" href="#">About</Link>
        <Link className="text-black hover:text-gray-500" href="#">Contact</Link>
    </nav>
    
    <div className="flex justify-center space-x-5">
        <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <Image src="/fblogo.webp" width={20} height={20} alt=""/>
       </Link>
      
    </div>
    <p className="text-center text-gray-700 font-medium">&copy; 2023 Minerva Sales Corporation. All rights reservered.</p>
    </footer>
    {/* <form encType='multipart/form-data' onSubmit={AddAppointmentForm} className='grid grid-cols-1 md:grid-cols-2 gap-16'>
    
    <div className='flex flex-row items-center justify-center ml-[500px] lg:ml-[1000px]'>
        <div className="flex flex-row items-center justify-center px-4 pb-20 gap-40">
          <div className="w-[400px] bg-white border border-gray-200 rounded-lg shadow transition-all duration-700 hover:scale-105">
         
    
    
    
            
                        
          <Toaster richColors  />
         
            
          </div>
    
          <div className="mb-6">
                        <label htmlFor="customerName" className="w-60 text-sm font-medium text-white block mb-2">Select Date</label>                        
                        <input
                              id="date"
                              type="date"
                              name="date"
                              min="2023-12-9"
                              max="2030-01-31"
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                              onChange={(e) => setAppointment({...appointment, date: e.target.value})}
                            />
                          
    
    
    
                          <label htmlFor="customerName" className="text-sm font-medium text-white block mb-2 w-60">Select Time</label>
                          <select
                            id="time"
                            name="time"
                            value={appointment.time} 
                            onChange={(e) => setAppointment({...appointment, time: e.target.value})}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          >
                            {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'].map((time) => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))}
                            </select>
              
            <button
            type="submit"
              className="mt-8 w-56 rounded-full border-6 border-yellow-100 bg-[#FFBD59] px-16 py-4 text-base font-bold text-white transition hover:translate-y-1"
            >
              Schedule
            </button>
            </div>
        </div>
        
      </div>
      
      </form> */}
    
    <Script src="https://unpkg.com/flowbite@1.5.2/dist/datepicker.js"></Script>
    
    {/* <section className="absolute w-full top-[1200px] flex flex-col items-center justify-center text-center text-white ">
    <footer className="py-10 w-[1800px] ml-[500px] lg:ml-0 flex flex-col space-y-10 justify-center bg-gradient-to-r from-gray-100 via-[#FFBD59] to-gray-100">
    
    <nav className="flex justify-center flex-wrap gap-6 text-gray-500 font-medium">
        <Link className="text-black hover:text-gray-500" href="#">Home</Link>
        <Link className="text-black hover:text-gray-500" href="#">Products</Link>
        <Link className="text-black hover:text-gray-500" href="#">Services</Link>
        <Link className="text-black hover:text-gray-500" href="#">About</Link>
        <Link className="text-black hover:text-gray-500" href="#">Contact</Link>
    </nav>
    
    <div className="flex justify-center space-x-5">
        <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Image src="https://Image.icons8.com/fluent/30/000000/facebook-new.png" />
       </Link>
      
    </div>
    <p className="text-center text-gray-700 font-medium">&copy; 2023 Minerva Sales Corporation. All rights reservered.</p>
    </footer>
    </section> */}
    </>
  )
}

(ServiceDetails as PageWithLayout).layout = HomePageLayout
export default ServiceDetails