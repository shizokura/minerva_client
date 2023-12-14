
import Head from 'next/head'
import {TbListSearch, TbEdit, TbTrash, TbUsers, TbFiles, TbCalendar, TbShoppingBag, TbClock, TbGraph, TbFileAnalytics, TbList, TbArchive, TbClipboard, TbMessage, TbSettings2, TbLogout2, TbArrowLeft, TbChevronLeft, TbChevronRight, TbHexagonPlus   } from 'react-icons/tb'

import { FormattedPrice } from '@/helpers/index'
import Modal from '@/components/Modal';
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React, { FC, useState, useEffect, SyntheticEvent } from 'react'
import  SideNavDash  from '@/components/sideNavDash'
import 'react-toastify/dist/ReactToastify.css';
import { Toaster, toast } from 'sonner'
import { IoMdAddCircleOutline } from 'react-icons/io';

const ServicePage = () => {

  const [ isModalOpen, setIsModalOpen ] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setTimeout(() => {
      setIsModalOpen(false);
    }, 2000);
  }

  const [ page, setPage] = useState(0)
  const [ services, setServices ] = useState<[]>()
  const [ servicesId, setServicesId] = useState("")
  const [ userid, setUserID ] = useState("")
  const [ userId, setUserId] = useState("")

  useEffect(() => {
    const cookies = Cookies.get("ecom_token") as any
    const { userID }: any = jwtDecode(cookies) as any
    setUserId(userID)
  }, [ userId ])

  useEffect(() => {
    const fetchData = async () => {
       const response = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/services/getAllServices/?skip=${page}&orderby=desc`, {
          method: "GET",
          headers: { 'Content-Type': 'application/json' },
          cache: "default"
      })

      if (!response.ok) {
        throw new Error("There something wrong while fetching data")
      }
  
      const result = await response.json();
  
      setServices(result)
  
    }
  
    fetchData();
    }, [ services ])

    const router = useRouter();
    
    const onFormDelete =  async () => {
    const res = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/services/deleteService/${servicesId}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userID: userId
        })
    })


    if(!res.ok) {
        alert("There something wrong while updating..")
    } else {
      {services?.map(({ userID, servicesID, id, services, description, price, status }: any) => (

      toast.warning(`${services} has been deleted`)

      ))}
    }

    return res.json();
  }


  return (

<>
<Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className=" bg-gray-800 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 sm:p-7 " >
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Confirm Delete</h1>
            </div>

            <div className="mt-5 flex flex-col justify-center items-center">
            <form onSubmit={onFormDelete}>
                <div className="grid gap-y-4">
                <p className="text-center divide-x divide-gray-300 dark:divide-gray-700 text-white">
                Are you sure you want to delete this service?
                </p>
                <div className='flex gap-2'>
                  <button type="submit" className="py-3 px-4 flex w-40 justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-[#FFBD59] text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" onClick={() => router.push("/minerva/admin/services")}>Yes</button>
                  <button type="button" className="py-3 px-4 w-40 flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-[#FFBD59] text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" onClick={handleCloseModal}>No</button>
                </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>

<Toaster richColors  />
    <title>Service Management</title>


<SideNavDash/>



<div className="antialiased font-sans bg-gray-200">
<div className="container mx-auto px-4 sm:px-8 2xl:ml-[360px] ">
    <div className="py-12">
    <div className='w-full flex gap-12 xl:gap-[1170px]'>
                <h2 className="text-2xl font-roboto font-bold leading-tight">Service Management</h2>
                <button onClick={() => router.push("/admin/service/addservice")} className="rounded-xl bg-gradient-to-br from-[#f5e725] to-[#FF5555] px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#f5e725]/50">
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
                                Service Id
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                Service NAME
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                Price ADDRESS
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                Services Status
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                ACTION
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                    {services?.map(({ userId, servicesID, id, services, description, price, status }: any) => (

                      
                        <tr>
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
                                <p className="text-gray-900 whitespace-no-wrap">{services}</p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
                                <p className="text-gray-900 whitespace-no-wrap">
                                {FormattedPrice(price)}
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
                                <p className="text-gray-900 whitespace-no-wrap">
                                {status}
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
                                <span
                                    className="relative inline-block px-3 py-1 font-bold text-green-900 leading-tight">
                                            <button onClick={() => router.push(`/admin/service/editservice/${servicesID}`)}  > <TbEdit size={25}/> </button>

                                    <button onClick={() => {
                          handleOpenModal();
                          // setUserId(userID)
                        }} > <TbTrash size={25} /> </button>
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

export default ServicePage