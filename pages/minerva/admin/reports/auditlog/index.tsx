import styles from '@/styles/admin/content.module.scss'
import AdminPageLayout from '@/layout/adminpagelayout'
import PageWithLayout from '@/layout/pagewithlayout'
import React, { FC, useState, useEffect } from 'react'
import Head from 'next/head'
import { TbEdit, TbTrash, TbUsers, TbFiles, TbCalendar, TbShoppingBag, TbClock, TbGraph, TbFileAnalytics, TbList, TbArchive, TbClipboard, TbMessage, TbSettings2, TbLogout2, TbArrowLeft, TbChevronLeft, TbChevronRight } from 'react-icons/tb'
import router from 'next/router'
import { FormattedDate } from '@/helpers'

const AuditLog: FC = () => {

  const [ page, setPage] = useState(0)
  const [ logs, setLogs ] = useState<[]>()

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/logs/?skip=${page}&orderby=desc`, {
        method: "GET",
        cache: "default",
        headers: { 'Content-Type': 'application/json' },
      })

      const result = await res.json();
      setLogs(result)
    }

    fetchData();
  }, [ logs ])

  console.log(logs)

  return (

    <div>
      <Head>
        <title>Audit Logs</title>
      </Head>

      <div className={styles.titleHead}>
        <div className={styles.icon}><TbUsers size={50} /></div>
        Audit Logs
      </div>
      <div className={styles.container}>
        <div className={styles.title}>View Audit Logs</div>
        <div className={styles.divider}></div>

        <ul className={styles.responsiveTable}>
          <li className={styles.tableHeader}>
            <div className={styles.col2}>Name</div>
            <div className={styles.col3}>Date Created</div>
            <div className={styles.col4}>Action</div>
          </li>
          
          {logs?.map(({ userID, logsID, title, createdAt, User}: any) => (
           
          <li key={logsID} className={styles.tableRow}>
            <div className={styles.col2} data-label="Admin Name">{User.profile.firstname} {User.profile.lastname} </div>
            <div className={styles.col3} data-label="Date Created">{FormattedDate(createdAt)}</div>
            <div className={styles.col4} data-label="Action"><span className={`${styles.badgeSuccessLogs} relative left-8`}>{title}</span>
            </div>
          </li>
          
          ))}  
        </ul>


        <div className={styles.pagination}>
        <button disabled={page === 0 } className=' bg-[#FFBD59] hover:bg-blue-700 text-white font-bold mx-4 py-2 px-4 rounded' onClick={() => setPage(()=> page - 1)}>Prev</button>
                 <button className='bg-[#FFBD59] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => setPage(() => page + 1)}>Next</button>
        </div>          
        
        </div>
    </div>

  )
}

(AuditLog as PageWithLayout).layout = AdminPageLayout
export default AuditLog