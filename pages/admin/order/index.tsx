import React, { FC, useState, useEffect, SyntheticEvent } from 'react'
import Head from 'next/head'
import SideNavDash from '@/components/sideNavDash'
import router, { useRouter } from 'next/router'
import { TbEdit, TbShoppingBag, } from 'react-icons/tb'
import Modal from '@/components/Modal';
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
import { FormattedPrice, FormattedDate } from '@/helpers/index'
import { Toaster, toast } from 'sonner'


const OrderPage = () => {
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

  const [profile, setProfile] = useState<[]>()
  const [ users, setUsers ] = useState<[]>()
  const [ orders, setOrders ] = useState<[]>()
  const [ userId, setUserId] = useState("") 
  const [ search, setSearch ] = useState("")
  const [ orderSearch, setOrderSearch ] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/order?skip=${page}&orderby=desc`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
        cache: "default"
      })

      if (!response.ok) throw new Error("There is something wrong while fethcing")

      const result = await response.json();
      
      setOrders(result)
    }

    fetchData()
  }, [ orders ])

  const [ userid, setUserID ] = useState();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/order/getAllOrders/?search=${search}`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
      })
      const result = await response.json()
      setOrderSearch(result)
    }
    fetchData()
  }, [ orderSearch, search ])

  useEffect(() => {
    const cookies = Cookies.get("ecom_token") as any
    const { userID }: any = jwtDecode(cookies) as any
    setUserId(userID)
  }, [ userId ])
  
  const onSubmitDeleteProduct = async (e: SyntheticEvent) => {
    e.preventDefault();
    
    const res = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/order/deleteProduct/${router.query.id}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...orders,    userID: userid,
        })
    })


    if(!res.ok) {
        alert("There something wrong while updating..")
    } else {
        alert("Successfully Deleted")
        router.push("/minerva/admin/product")
    }

    return res.json();
  }
  console.log(page)

  return (
    <>

    
    
            <title>Order Management</title>
    
            <Toaster richColors  />
        <SideNavDash/>
        <div className="absolute z-20 top-[40px] right-10 flex items-center w-[140px] lg:w-[220px] mx-auto bg-white border-2 border-black rounded-md text-sm " x-data="{ search: '' }">
          <div className="w-full">
          
            <input type="search" className="w-full px-4 py-1 text-gray-800 rounded-lg focus:outline-none "
              placeholder="search by ID" onChange={(e) => setSearch(e.target.value)}/>
          </div>
          
          <div>
            <button type="submit" className="flex items-center border-2 bg-[#FFBD59] justify-center w-12 h-12 text-white rounded-r-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </div>
        </div> 
    
        <div className="antialiased font-sans bg-gray-200 sm:pl-20 lg:pl-2">
        <div className="container mx-auto px-4 sm:px-8 2xl:ml-[360px] ">
            <div className="py-12">
                <div>
                    <h2 className="text-3xl font-roboto font-bold leading-tight">Order Management</h2>
                </div> 
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden h-[790px] bg-white">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                        ORDER ID
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                        CUSTOMER NAME
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                        DATE ORDERED
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                        AMOUNT
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                        PAYMENT
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                        aCTION
                                    </th>
    
                                </tr>
                            </thead>
                            <tbody>
                            
            {orders?.map(({ userID, orderID, orders, total, payment, status, createdAt, User}: any) => (
                User.map(({ profile }: any) => (
                              
                                <tr key={orderID}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
                                        <div className="flex items-center">
                                            <div className="ml-3">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                {orders}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
                                        <p className="text-gray-900 whitespace-no-wrap">{profile.firstname} {profile.lastname}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                        {FormattedDate(createdAt)}
                                        </p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                        {FormattedPrice(total)}
                                        </p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                        {payment}
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
                                        <button onClick={() => router.push(`/admin/order/editorder/${orderID}`)}> <TbEdit size={25} /> </button>
                                        </span>
                                    </td>
                                </tr>
                                                 ))
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

export default OrderPage