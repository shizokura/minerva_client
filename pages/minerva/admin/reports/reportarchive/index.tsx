import styles from '@/styles/admin/content.module.scss'
import AdminPageLayout from '@/layout/adminpagelayout'
import PageWithLayout from '@/layout/pagewithlayout'
import React, { FC, useState, useEffect } from 'react'
import Head from 'next/head'
import { TbFilter, TbEye, TbArchive } from 'react-icons/tb'
import router from 'next/router'
import { FormattedDate } from '@/helpers/index'
import { format } from 'date-fns'

const ReportArchivePage: FC = () => {
  const [ page, setPage] = useState(0)

  const [ isOpen, setIsOpen ] = useState(false);
  const [ archive, setArchive ] = useState<[]>()
  const [ archiveId, setArchiveId ] = useState("")


  console.log(archive)


  const [ dateFilters, setDateFilters ] = useState("Daily")
  const filters =["Daily", "Weekly", "Monthly"];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [ isOpen1, setIsOpen1 ] = useState(false);

  const toggleDropdown1 = () => {
    setIsOpen1(!isOpen1);
  };



  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/archive/getAllArchive?skip=${page}&filter=${dateFilters}`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
        cache: "no-cache"
      })

      const result = await res.json();
      setArchive(result)
    }
    fetchData()
  }, [ archive ])

  return (

    <div>
      <Head>
        <title>Report Archive</title>
      </Head>

      <div className={styles.titleHead}>
        <div className={styles.icon}><TbArchive size={50} /></div>
        Report Archive
      </div>
      <div className={styles.container}>

        <div className={styles.title}>View Report Archive</div>

        <div className="absolute top-6 right-6 mb-6">
                                <div className="relative inline-block text-left">
                                  <div>
                                    <button type="button" className="flex gap-4 justify-center w-[220px] rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                                      onClick={toggleDropdown}
                                    >
                                    {dateFilters === "" ? "Filters" : dateFilters}

                                     <span className='pt-[2px]'><TbFilter/></span>
                                    </button>
                                  </div>
                                  <div className={`w-full flex flex-col rounded-md shadow-lg bg-primary-100 p-4 text-primary-600 ${isOpen ? 'w-[220px] absolute z-10' : 'hidden'}`}>
                {isOpen ? (
                  filters.map((name) => (
                    <button
                    name="filters"
                      className='text-left'
                      type="button"
                      key={name}
                      value={name}
                      onClick={(e) => setDateFilters(e.currentTarget.value)}
                    
                      aria-required>
                      {name}
                    </button>
                  ))
                ) : null}
              </div></div>
                                </div>
      

        <div className={styles.divider}></div>

        <ul className={styles.responsiveTable}>
          <li className={styles.tableHeader}>
            <div className={styles.col1}>Archive ID</div>
            <div className={styles.col2}>Administrator Name</div>
            <div className={styles.col3}>Date Created</div>
            <div className={styles.col4}>File Type</div>
            <div className={styles.col5}>Action</div>
          </li>

          {archive?.map(({ archieveID, id, startDate, firstname, lastname, endDate, createdAt, User }: any) => (
             <li key={archieveID} className={styles.tableRow}>
             <div className={styles.col1} data-label="Job Id">{id}</div>
             <div className={styles.col2} data-label="Customer Name">{firstname} {lastname}</div> 
             <div className={styles.col3} data-label="Date Created">{FormattedDate(createdAt)}</div> 
             <div className={styles.col4} data-label="File Type"><span className={styles.badgeSuccessArchive}>Generated Report</span></div>
             <div className={styles.col5} data-label="Action">
               <button onClick={() => router.push(`/minerva/admin/reports/reportarchive/viewreportarchive/${archieveID}`)} className={styles.col7}> <TbEye className='ml-5' size={25} /> </button>
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

(ReportArchivePage as PageWithLayout).layout = AdminPageLayout
export default ReportArchivePage