import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from '@/styles/admin/sidebar.module.scss'
import { useRouter } from 'next/router'
import { Open_Sans } from 'next/font/google'
import { TbListSearch, TbUsers, TbFiles, TbCalendar, TbShoppingBag, TbClock, TbGraph, TbFileAnalytics, TbList, TbArchive, TbClipboard, TbMessage, TbSettings2, TbLogout2, TbArrowLeft, TbChevronLeft, TbChevronRight, TbSettings } from 'react-icons/tb'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { FaQuestionCircle } from "react-icons/fa";
import { FaPhoneSquare } from "react-icons/fa";

const poppins = Open_Sans({
  weight: '500',
  subsets: [ "latin" ]
})

const routes = [
  { name: "Customer Profile", url: "/minerva/admin/customer", icons: <TbUsers size={30} /> },
  { name: "Product Management", url: "/minerva/admin/product", icons: <TbFiles size={30} /> },
  { name: "Service Management", url: "/minerva/admin/service", icons: <TbListSearch size={30} /> },
  { name: "Orders", url: "/minerva/admin/order", icons: <TbShoppingBag size={30} /> },
  { name: "Appointments", url: "/minerva/admin/appointment", icons: <TbClock size={30} /> },
  { name: "Inventory", url: "/minerva/admin/inventory", icons: <TbClipboard size={30} /> },
]


const submenu = [
  { name: "Generate Reports", url: "/minerva/admin/reports/generatereport", icons: <TbFileAnalytics size={30} /> },
  { name: "Audit Logs", url: "/minerva/admin/reports/auditlog", icons: <TbList size={30} /> },
  { name: "Report Archive", url: "/minerva/admin/reports/reportarchive", icons: <TbArchive size={30} /> }
]

const submenu2 = [
  { name: "About Us", url: "/minerva/admin/content/aboutus", icons: <FaQuestionCircle size={30} /> },
  { name: "Contact Us", url: "/minerva/admin/content/contactus", icons: <FaPhoneSquare size={30} /> },
]

export default function Sidebar() {

  const router = useRouter();
  const [ userId, setUserId ] = useState("");


  const [ reports, setReports ] = useState(false)
  const [ content, setContent ] = useState(false)

  const onLogoutBtn = () => {
    Cookies.remove("ecom_token")
    router.push("/")
  }
  return (
    <div className={styles.container}>

      <div onClick={() => router.push("/minerva/admin/customer")} className={styles.sidebarHeader}>
        <Image src="/logo.png" alt="" height={60} width={150} />
        <span className='inline-flex text-center'>Minerva Sales Corporations</span>
      </div>

      <div className={styles.sidebarNav}>
        {routes.map(({ name, url, icons }) => (
          <button key={name} onClick={() => router.push(`${url}`)} className={styles.siderBar}>
            {icons}
            <span className={poppins.className}>{name}</span>
          </button>
        ))}
        <button onClick={() => setReports(() => !reports)}>
          <div className={styles.reports}>
            <TbGraph size={30} />
            <span>Reports</span>
          </div>
          <TbChevronRight size={30} />
        </button>
        {
          reports ?
            <div className={styles.submenu}>
              {submenu.map(({ name, url, icons }) => (
                <button key={name} onClick={() => router.push(url)}>
                  {icons}
                  <span>{name}</span>
                </button>
              ))}
            </div> : null
        }

    <button onClick={() => setReports(() => !content)}>
          <div className={styles.reports}>
            <TbGraph size={30} />
            <span>Content Management</span>
          </div>
          <TbChevronRight size={30} />
        </button>
        {
          content ?
            <div className={styles.submenu2}>
              {submenu.map(({ name, url, icons }) => (
                <button key={name} onClick={() => router.push(url)}>
                  {icons}
                  <span>{name}</span>
                </button>
              ))}
            </div> : null
        }
        <button onClick={() => router.push(`/minerva/admin/settings/${userId}`)}>
          <TbSettings size={30} />
          <span>Settings</span>
        </button>
        <button onClick={onLogoutBtn}>
          <TbLogout2 size={30} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}
