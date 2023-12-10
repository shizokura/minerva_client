import styles from '@/styles/admin/content.module.scss'
import AdminPageLayout from '@/layout/adminpagelayout'
import PageWithLayout from '@/layout/pagewithlayout'
import React, { FC, useEffect, useState } from 'react'
import Head from 'next/head'
import { TbEdit, TbTrash, TbUsers, TbFiles, TbCalendar, TbShoppingBag, TbClock, TbGraph, TbFileAnalytics, TbList, TbArchive, TbClipboard, TbMessage, TbSettings2, TbLogout2, TbArrowLeft, TbChevronLeft, TbChevronRight, TbDownload } from 'react-icons/tb'
import { useRouter } from 'next/router'
import ArchivePDF from '@/components/archivePDF'
import Image from 'next/image'


const ViewReportArchivePage: FC = () => {

  const router = useRouter();


  const [ archive, setArchive ] = useState<any>(null)
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/archive/getAllArchive/${router.query.id}`, {
        method: "GET",
        cache: "default",
      })
      const result = await res.json();

      setArchive(result)
    }
    fetchData()
  }, [ router, archive ])

  // console.log(archive)

  return (
    <div>
      <Head>
        <title>View Report Archive</title>
      </Head>

      <div className={styles.titleHead}>
        <div className={styles.icon}><TbArchive size={50} /></div>
        Report Archive
      </div>

      <div className={styles.archiveContainer}>
        <div className={styles.title}>Viewing Report Archive {archive?.id}</div>
        <div className={styles.divider}></div>

        <div>

          <div className='flex justify-center'>



            <ArchivePDF generate={archive} />

          </div>
        </div>
      </div>

    </div>
  )
}

(ViewReportArchivePage as PageWithLayout).layout = AdminPageLayout
export default ViewReportArchivePage