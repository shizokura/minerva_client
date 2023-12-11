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

  const [ selectedDate, setSelectedDate ] = useState<Date | null>(null);
  const [ selectedTime, setSelectedTime ] = useState<string>('');

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


  const [ userid, setUserId ] = useState("")
  const [ servicesD, setServicesD ] = useState<[]>()

  const [ appointment, setAppointment ] = useState({
    date: "",
    service: "",
    time: "",
  })

  const [ services, setServices ] = useState({
    services: '',
    status: '',
    price: '',
    image: ''
  });



  const AddAppointmentForm = async (e: any) => {

    e.preventDefault();

    const response = await fetch("http://localhost:3001/schedule/createSchedule", {
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
        const res = await fetch(`http://localhost:3001/services/getAllServices/${router.query.id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          cache: 'no-cache',
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
    <div className={styles.bodyServicesD}>

      <div className="w-full relative top-20">
        <div className="relative mx-auto mt-20 mb-20 max-w-screen-lg overflow-hidden rounded-t-xl bg-yellow-100/60 py-32 text-center shadow-xl shadow-gray-300">
          <h1 className="mt-2 px-8 text-3xl font-bold text-white md:text-5xl">Book a Service</h1>
          <p className="mt-6 text-lg text-white">Set up your Appointment</p>
          <img className="absolute top-0 -z-10 h-full w-full object-cover" src="https://images.unsplash.com/photo-1504672281656-e4981d70414b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" />
        </div>
        <form encType='multipart/form-data' onSubmit={AddAppointmentForm} className='grid grid-cols-1 md:grid-cols-2 gap-16'>

          <div className='absolute left-[500px] flex flex-col'>
            <div className="flex flex-row items-center justify-center mx-auto max-w-screen-[2000px] px-4 pb-20 gap-60">
              <div className="w-full lg:max-w-sm bg-white border border-gray-200 rounded-lg shadow transition-all duration-700 hover:scale-105">
                <div>
                  <Image src={services.image} alt={""} height={350} width={450} />
                </div>
                <div className="p-4">
                  <h4 className="text-xl font-semibold text-black-600 text-center">
                    {services.services}
                  </h4>
                  <p className="mb-2 leading-normal text-center">
                    {services.status}
                  </p>
                  <p className="mr-2 text-lg font-bold text-black dark:text-black">
                    {FormattedPrice(services.price as any)}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center">

                <div className="mb-6">
                  <label htmlFor="customerName" className="w-60 text-sm font-medium text-white block mb-2">Select Date</label>
                  <input
                    id="date"
                    type="date"
                    name="date"
                    min="2023-12-9"
                    max="2030-01-31"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    onChange={(e) => setAppointment({ ...appointment, date: e.target.value })}
                  />

                </div>

                <div className="mb-6">
                  <label htmlFor="customerName" className="text-sm font-medium text-white block mb-2 w-60">Select Time</label>
                  <select
                    id="time"
                    name="time"
                    value={appointment.time}
                    onChange={(e) => setAppointment({ ...appointment, time: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  >
                    {[ '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00' ].map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                <Toaster richColors />
                <button
                  type="submit"
                  className="mt-8 w-56 rounded-full border-6 border-yellow-100 bg-[#FFBD59] px-16 py-4 text-base font-bold text-white transition hover:translate-y-1"
                >
                  Schedule
                </button>

              </div>
            </div>
          </div>
        </form>
      </div>
      <Script src="https://unpkg.com/flowbite@1.5.2/dist/datepicker.js"></Script>

      <section className="absolute w-full top-[1160px] flex flex-col items-center justify-center text-center text-white ">
        <footer className="h-62 bg-gradient-to-r w-full from-gray-100 via-[#FFBD59] to-gray-100">
          <div className="max-w-screen-xl mt-2 px-2 py-8 mx-auto sm:px-6 lg:px-8">
            <div className="relative top-4 grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div>
                <img src="/logo.png" className=" h-6 sm:h-6" alt="logo" />
                <p className="max-w-xs mt-4 text-sm text-gray-600">
                  Let us make your trips more comfortable and safe. Leave the worries behind and let{"'"}s begin our journey!
                </p>
                <div className="flex mt-8 space-x-6 text-gray-600">
                  <Link href="https://www.facebook.com/MinervaSalesCorp" className="hover:opacity-75" target="_blank" rel="noreferrer">
                    <span className="sr-only"> Facebook </span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-8 lg:col-span-2 sm:grid-cols-1 lg:grid-cols-4">
                <div>
                  <p className="font-medium text-black">
                    <Link href="/products" className="hover:opacity-75">Products</Link>
                  </p>
                  <nav className="flex flex-col mt-1 space-y-1 text-sm text-black">
                    <Link href="" className="hover:opacity-75"> Tires </Link>
                    <Link href="" className="hover:opacity-75"> Car Battery </Link>
                    <Link href="" className="hover:opacity-75"> Oils </Link>
                    <Link href="" className="hover:opacity-75"> Tire Mags </Link>
                    <Link href="" className="hover:opacity-75"> Car Filters </Link>
                  </nav>
                </div>
                <div>
                  <p className="font-medium text-black">
                    <Link href="/services" className="hover:opacity-75 "> Services </Link>
                  </p>
                  <nav className="flex flex-col mt-1 space-y-1 text-sm text-black">
                    <Link href="" className="hover:opacity-75"> Oil Change </Link>
                    <Link href="" className="hover:opacity-75"> Change Tire </Link>
                    <Link href="" className="hover:opacity-75"> Alignment </Link>
                  </nav>
                </div>
                <div>
                  <p className="font-medium text-black">
                    Helpful Links
                  </p>
                  <nav className="flex flex-col mt-1 space-y-1 text-sm text-black">
                    <Link href="" className="hover:opacity-75"> Contact </Link>
                    <Link href="" className="hover:opacity-75"> About </Link>
                  </nav>
                </div>
                <div>
                  <p className="font-medium text-black">
                    Legal
                  </p>
                  <nav className="flex flex-col mt-1 space-y-1 text-sm text-black">
                    <Link href="" className="hover:opacity-75" > Terms &amp; Conditions </Link>
                  </nav>
                </div>
              </div>
            </div>
            <p className="mt-9 text-xs text-gray-800">
              © 2023 Minerva Sales Corporation
            </p>
          </div>
        </footer>
      </section>
    </div>
  )
}

(ServiceDetails as PageWithLayout).layout = HomePageLayout
export default ServiceDetails