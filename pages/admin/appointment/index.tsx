import React, { FC, useState, useEffect } from 'react'
import SideNavDash from '@/components/sideNavDash'
import Head from 'next/head'
import { TbEdit, TbClock,  TbHexagonPlus } from 'react-icons/tb'
import { useRouter } from 'next/router'
import Modal from '@/components/Modal'
import {FormattedDate} from '@/helpers/index'
import { jwtDecode } from 'jwt-decode'
import Cookies from "js-cookie"
import 'react-toastify/dist/ReactToastify.css';
import { Toaster, toast } from 'sonner'
import { IoMdAddCircleOutline } from 'react-icons/io'

const AppointmentPage = () => {

    const router = useRouter()
  const [ page, setPage] = useState(0)
  const [ isModalOpen, setIsModalOpen ] = useState(false);


  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setTimeout(() => {
      setIsModalOpen(false);
    }, 5000);
  }

  const [ appointment, setAppointment ] = useState<[]>()
  const [ userId, setUserId] = useState("")

  useEffect(() => {
    const cookies = Cookies.get("ecom_token") as any
    const { userID }: any = jwtDecode(cookies) as any
    setUserId(userID)
  }, [ userId ])


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/schedule/?skip=${page}&orderby=desc`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
        cache: "default",
      })
      if (!response.ok) {
        throw new Error("There something wrong while fetching data")
      }
  
      const result = await response.json();
  
      setAppointment(result)
  
    }
  
    fetchData();
  }, [ page, userId,  appointment])

  return (
    <>



        <title>Appointment</title>


    <SideNavDash/>

    

    <div className="antialiased font-sans bg-gray-200">
    <div className="container mx-auto px-4 sm:px-8 2xl:ml-[360px] ">
        <div className="py-12">
        <div className='w-full flex gap-[1180px]'>
                <h2 className="text-3xl font-roboto font-bold leading-tight">Appointment</h2>
                <button onClick={() => router.push("/admin/appointment/addappointment")} className="rounded-xl bg-gradient-to-br from-[#f5e725] to-[#FF5555] px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#f5e725]/50">
                <IoMdAddCircleOutline size={15}/>
                </button>
            </div> 
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden h-[790px] bg-white">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                    APPOINTMENT ID
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                    CUSTOMER NAME
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                    SERVICE NAME
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                    DATE
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                    STATUS
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                    ACTION
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                        {appointment?.map(({ scheduleID, service, date,  time, id, name, status, User}: any) => (
                          
                            <tr key={scheduleID}>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
                                    <div className="flex items-center">
                                        <div className="ml-3">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                            {id}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
                                    <p className="text-gray-900 whitespace-no-wrap">{User.length === 0? name: `${User[0].profile.firstname} ${User[0].profile.lastname}`}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                    {service}
                                    </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                    {FormattedDate(date)} {time}
                                    </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                    {status}
                                    </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
                                    <span
                                        className="relative inline-block px-3 py-1 font-bold text-black leading-tight">
                                     <button onClick={() => router.push(`/admin/appointment/editappointment/${scheduleID}`)} > <TbEdit size={25} /> </button>

                                    </span>
                                </td>
                            </tr>
                             ))} 
                                
                        </tbody>
                    </table>
                    
                    <div
                        className="px-5 py-5 bg-white border-t  flex items-center justify-center xs:flex-row xs:justify-center          ">
                        <div className="inline-flex mt-2 xs:mt-0 gap-4">
                            <button disabled={page === 0 }
                                className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l" onClick={() => setPage(()=> page - 1)}>
                                Prev
                            </button>
                            <button
                                className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r" onClick={() => setPage(() => page + 1)}>
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

  </>
  )
}

export default AppointmentPage