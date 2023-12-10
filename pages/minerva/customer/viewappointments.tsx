import HomePageLayout from '@/layout/homepagelayout'
import PageWithLayout from '@/layout/pagewithlayout'
import React, { FC, useEffect, useState } from 'react'
import styles from '@/styles/customer/viewappointment.module.scss'
import router from 'next/router'
import { TbEdit, TbTrash, TbUsers, TbFiles, TbCalendar, TbShoppingBag, TbClock, TbGraph, TbFileAnalytics, TbList, TbArchive, TbClipboard, TbMessage, TbSettings2, TbLogout2, TbArrowLeft, TbChevronLeft, TbChevronRight, TbHexagonPlus } from 'react-icons/tb'
import Head from 'next/head'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { FormattedDate } from '@/helpers'
import Link from 'next/link'

const ViewAppointments: FC = () => {

  const [ page, setPage ] = useState(0)

  const [ appointment, setAppointment ] = useState<any>(null)

  const [ userId, setUserId ] = useState("")

  useEffect(() => {
    const cookies = Cookies.get("ecom_token");
    if (cookies) {
      const { userID }: any = jwtDecode(cookies)
      setUserId(userID)
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/schedule/getAllMyAppointments/${userId}/?skip=${page}`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
        cache: "default"
      })
      const result = await response.json()
      setAppointment(result)
    }

    fetchData();
  }, [ userId, appointment ])

  return (

    <div className={styles.bodyProducts}>

      <div className={styles.titleHead}>
        <div className={styles.icon}><TbClock size={50} /></div>
        Appointments
      </div>

      <div className='absolute top-0 left-[230px]'>
        <div className={styles.container}>

          <div className={styles.divider}></div>

          <div className={styles.tablecontainer}>
            <ul className={styles.responsiveTable}>
              <li className={styles.tableHeader}>
                <div className={styles.col1}>Service ID</div>
                <div className={styles.col3}>Service Name</div>
                <div className={styles.col4}>Appointment Date</div>
                <div className={styles.col5}>Status</div>

              </li>

              {appointment?.map(({ userID, id, date, time, name, status, User, service }: any) => (

                <li key={id} className={styles.tableRow}>
                  <div className={styles.col1} data-label="Job Id">{id}</div>
                  <div className={styles.col3} data-label="Service Name">{service}</div>
                  <div className={styles.col4} data-label="Appointment Date">{FormattedDate(date)} {time}</div>
                  <div className={styles.col6} data-label="Order Status"><span>{status}</span></div>

                </li>
              ))}

            </ul>
          </div>
          <div className='absolute bottom-10 right-[540px]'>
            <button disabled={page === 0} className=' bg-[#FFBD59] hover:bg-blue-700 text-white font-bold mx-4 py-2 px-4 rounded' onClick={() => setPage(() => page - 1)}>Prev</button>
            <button className='bg-[#FFBD59] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => setPage(() => page + 1)}>Next</button>
          </div>
        </div>



      </div>
      <section className="relative mt-18 flex flex-col items-center justify-center text-center text-white ">
        <footer className="h-62 bg-gradient-to-r w-full from-gray-100 via-[#FFBD59] to-gray-100">
          <div className="max-w-screen-xl mt-2 px-2 py-8 mx-auto sm:px-6 lg:px-8">
            <div className="relative top-4 grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div>
                <img src="/logo.png" className="mr-5 h-6 sm:h-6" alt="logo" />
                <p className="max-w-xs mt-4 text-sm text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, accusantium.
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
                    <Link href="" className="hover:opacity-75"> Live Chat </Link>
                  </nav>
                </div>
                <div>
                  <p className="font-medium text-black">
                    Legal
                  </p>
                  <nav className="flex flex-col mt-1 space-y-1 text-sm text-black">
                    <Link href="" className="hover:opacity-75" > Privacy Policy </Link>
                    <Link href="" className="hover:opacity-75" > Terms &amp; Conditions </Link>
                    <Link href="" className="hover:opacity-75" > Returns Policy </Link>
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

(ViewAppointments as PageWithLayout).layout = HomePageLayout
export default ViewAppointments