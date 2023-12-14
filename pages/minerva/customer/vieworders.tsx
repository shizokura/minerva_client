import HomePageLayout from '@/layout/homepagelayout'
import PageWithLayout from '@/layout/pagewithlayout'
import React, { FC, useState, useEffect } from 'react'
import styles from '@/styles/customer/customer.module.scss'
import Head from 'next/head'
import { TbEdit, TbTrash, TbUsers, TbFiles, TbCalendar, TbShoppingBag, TbClock, TbGraph, TbFileAnalytics, TbList, TbArchive, TbClipboard, TbMessage, TbSettings2, TbLogout2, TbArrowLeft, TbChevronLeft, TbChevronRight } from 'react-icons/tb'
import router from 'next/router'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { FormattedDate, FormattedPrice } from '@/helpers/index'
import Link from 'next/link'

const ViewOrders: FC = () => {

  const [ page, setPage ] = useState(0)
  const [ orders, setOrders ] = useState<any>(null)


  const [ userId, setUserId ] = useState("")


  useEffect(() => {
    const cookies = Cookies.get("ecom_token");
    if (cookies) {
      const { userID }: any = jwtDecode(cookies)
      setUserId(userID)
    }
  }, [])

  useEffect(() => {

    if (!userId) return
    const fetchData = async () => {
      const response = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/order/getAllMyOrders/${userId}/?skip=${page}`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
        cache: "no-cache"
      })

      if (!response.ok) throw new Error("There is something wrong while fetching")

      const result = await response.json();
      setOrders(result)
    }

    fetchData();
  }, [ userId, orders ])

  return (

    <div className={styles.bodyViewOrders}>
 

    <div className="container mt-40 mx-auto px-4 sm:px-8 lg:ml-[200px] ">
        <div className="py-12">
            <div>
                <h2 className="text-3xl font-roboto font-bold leading-tight sm:">View Order Status</h2>
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
                                    DATE ORDERED
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                    AMOUNT
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                    PAYMENT METHOD
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                    ORDER STATUS
                                </th>
                               

                            </tr>
                        </thead>
                        <tbody>
                        {orders?.map(({ orders, createdAt, total, payment, status}: any) => (
                          
                            <tr>
                                <td className="z-40 px-5 py-5 border-b border-gray-200 bg-white text-md">
                                    <div className="flex items-center">
                                        <div className="ml-3">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                            {orders}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
                                    <p className="text-gray-900 whitespace-no-wrap">{FormattedDate(createdAt)}</p>
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
                                    <span className={styles.badgeSuccess}>{status}</span>
                                    </p>
                                </td>

                            </tr>
                             ))}
                             <tr>
                              <td className="px-5 bg-white text-sm"></td>
                              </tr> 
                             
                                
                        </tbody>
                    </table>
                    
                    <div
                        className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
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
        <footer className="py-10 mt-2 lg:mt-0 w-screen flex flex-col space-y-10 justify-center bg-gradient-to-r from-[#FFBD59] via-gray-100 to-[#FFBD59]">

<nav className="flex justify-center flex-wrap gap-6 text-gray-500 font-medium">
    <Link className="text-black hover:text-gray-500" href="#">Home</Link>
    <Link className="text-black hover:text-gray-500" href="#">Products</Link>
    <Link className="text-black hover:text-gray-500" href="#">Services</Link>
    <Link className="text-black hover:text-gray-500" href="#">About</Link>
    <Link className="text-black hover:text-gray-500" href="#">Contact</Link>
</nav>

<div className="flex justify-center space-x-5">
    <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <img src="https://img.icons8.com/fluent/30/000000/facebook-new.png" />
   </Link>
  
</div>
<p className="text-center text-gray-700 font-medium">&copy; 2023 Minerva Sales Corporation. All rights reservered.</p>
</footer>

    </div>
  )
}

(ViewOrders as PageWithLayout).layout = HomePageLayout
export default ViewOrders