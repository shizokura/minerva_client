import AdminPageLayout from '@/layout/adminpagelayout'
import PageWithLayout from '@/layout/pagewithlayout'
import styles from '@/styles/admin/content.module.scss'
import Head from 'next/head'
import { TbListSearch, TbEdit, TbTrash, TbUsers, TbFiles, TbCalendar, TbShoppingBag, TbClock, TbGraph, TbFileAnalytics, TbList, TbArchive, TbClipboard, TbMessage, TbSettings2, TbLogout2, TbArrowLeft, TbChevronLeft, TbChevronRight, TbHexagonPlus } from 'react-icons/tb'
import React, { FC, SyntheticEvent, useEffect, useState } from 'react'
import { FormattedPrice } from '@/helpers/index'
import Modal from '@/components/Modal';
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import 'react-toastify/dist/ReactToastify.css';
import { Toaster, toast } from 'sonner'

const ServicePage: FC = () => {


  const [ isModalOpen, setIsModalOpen ] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setTimeout(() => {
      setIsModalOpen(false);
    }, 2000);
  }

  const [ page, setPage ] = useState(0)
  const [ services, setServices ] = useState<[]>()
  const [ servicesId, setServicesId ] = useState("")
  const [ userid, setUserID ] = useState("")
  const [ userId, setUserId ] = useState("")

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

  const onFormDelete = async () => {
    const res = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/services/deleteService/${servicesId}`, {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userID: userId
      })
    })


    if (!res.ok) {
      alert("There something wrong while updating..")
    } else {
      {
        services?.map(({ userID, servicesID, id, services, description, price, status }: any) => (

          toast.warning(`${services} has been deleted`)

        ))
      }
    }

    return res.json();
  }

  return (

    <div>
      <Toaster richColors />
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
      <Head>
        <title>Services</title>
      </Head>

      <div className={styles.titleHead}>
        <div className={styles.icon}><TbListSearch size={50} /></div>
        Service Management
      </div>
      <div className={styles.container}>
        <div className={styles.title}>Services List
          <button className="py-2 flex font-large absolute top-5 right-5 text-black bg-[#FFBD59] hover:bg-[#FFBD59] focus:ring-yellow-200 rounded-lg text-sm px-5 text-center" onClick={() => router.push("/minerva/admin/services/addservices")}> <TbHexagonPlus className='mr-2' size={25} />Add New Service</button>
        </div>
        <div className={styles.divider}></div>

        <ul className={styles.responsiveTable}>
          <li className={styles.tableHeader}>
            <div className={styles.col1}>SERVICE ID</div>
            <div className={styles.col2}>SERVICE NAME</div>
            <div className={styles.col2}>PRICE</div>
            <div className={styles.col3}>SERVICE STATUS</div>
            <div className={styles.col4}>Action</div>
          </li>

          {services?.map(({ userId, servicesID, id, services, description, price, status }: any) => (

            <li key={servicesID} className={styles.tableRow}>
              <div className={styles.col1} data-label="Service ID">{id}</div>
              <div className={styles.col2} data-label="Service Name">{services}</div>
              <div className={styles.col2} data-label="Service Name">{FormattedPrice(price)}</div>
              <div className={styles.col3} data-label="Email Address">{status}</div>
              <div className={styles.col4} data-label="Action">
                <button onClick={() => router.push(`/minerva/admin/services/editservices/${servicesID}`)} className={styles.col4} > <TbEdit size={25} /> </button>
                <button onClick={() => {
                  handleOpenModal();
                  setServicesId(servicesID)
                }} className={styles.col4} > <TbTrash size={25} /> </button>
              </div>
            </li>

          ))}
        </ul>


        <div className={styles.pagination}>
          <button disabled={page === 0} className=' bg-[#FFBD59] hover:bg-blue-700 text-white font-bold mx-4 py-2 px-4 rounded' onClick={() => setPage(() => page - 1)}>Prev</button>
          <button className='bg-[#FFBD59] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => setPage(() => page + 1)}>Next</button>
        </div>

      </div>
    </div>


  )
}

(ServicePage as PageWithLayout).layout = AdminPageLayout
export default ServicePage