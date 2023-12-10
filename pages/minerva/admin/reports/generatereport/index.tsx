import styles from '@/styles/admin/content.module.scss'
import AdminPageLayout from '@/layout/adminpagelayout'
import PageWithLayout from '@/layout/pagewithlayout'
import React, { FC, useState, useEffect, SyntheticEvent } from 'react'
import { TbFileAnalytics } from 'react-icons/tb'
import Head from 'next/head'
import router from 'next/router'
import Cookies from 'js-cookie'
import { jwtDecode} from 'jwt-decode'
import Products from '@/pages/product'
import PDF from '@/components/pdf'
import { Toaster, toast } from 'sonner'

const GenerateReport: FC = () => {

  const [showPDF, setShowPDF] = useState(false);

  const [reportData, setReportData] = useState(null);

  const handleButtonClick = () => {
    // Open the PDF view in a new tab
    const newTab = window.open('/pdfview', '_blank');
    
    // Focus on the new tab
    if (newTab) {
      newTab.focus();
    }
  };

  const [ isOpen, setIsOpen ] = useState(false);
  const [ userId, setUserId ] = useState("")
  const [ generated, setGenerated ] = useState(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const cookies = Cookies.get("ecom_token")
    if(cookies) {
      const { userID }: any = jwtDecode(cookies) as any
      setUserId(userID)
    }
  }, [ userId ])

  const [ isOpen1, setIsOpen1 ] = useState(false);

  const [ dates, setDates ] = useState({
    startDate: "2023-12-09",
    endDate: "2023-12-31"
  })
  
  const toggleDropdown1 = () => {
    setIsOpen1(!isOpen1);
  };


  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/order/getGeneratedReport?startDate=${dates.startDate}&endDate=${dates.endDate}`, {
        method: "GET",
        cache: "default",
        headers: { 'Content-Type': 'application/json' },
      })

      if(!res.ok) throw new Error("There's something wrong while fetching")


      const result = await res.json();

      setGenerated(result)
    }

    fetchData()
  }, [ generated ])

  // console.log(generated)
  
  const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));

  const onSubmitGenerateRerport = async (e: SyntheticEvent) => {
    e.preventDefault();

    const res = await fetch("https://minervasales-23b0919d60c1.herokuapp.com/order/generateReport", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        startDate: new Date(dates.startDate),
        endDate: new Date(dates.endDate),
        userID: userId,
        Products: Products.name
      })
    })

    
    if(!res.ok) throw new Error("There is something wrong while fetching your data")

    toast.promise(promise, {
      loading: 'Loading...',
      success: (generated) => {
        return `Generated report succesfully`;
      },
      error: 'Error',
    });

    const result = await res.json();

    return result
  }
  return (
    <div>
      <Head>
        <title>Generate Report</title>
      </Head>

      <div className={styles.titleHead}>
        <div className={styles.icon}><TbFileAnalytics size={50} /></div>
        Generate Report
      </div>
      <Toaster richColors  />
      <div className={styles.container}>
        <div className={styles.title}>Generate Report</div>
        <div className={styles.divider}></div>

        <div className="flex lg:flex-row flex-col items-center py-6 px-4">


          <div className="w-50 mx-28 my-32">


            <div className=" w-50 mx-auto">

          <form onSubmit={onSubmitGenerateRerport}>
          <div className="mb-6">
                <div className="font-medium pl-3 pb-6 py-3">
                  Select Start Date <br></br>
                  <div>
                    
                      <input
                          id="date"
                          type="date"
                          name="date"
                          min="2023-12-8"
                          max="2030-01-31"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          onChange={(e) => setDates({...dates, startDate: e.target.value})}
                        />
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <div className="font-medium pl-3 pb-6 py-3">
                  Select End Date <br></br>
                  <div>
                    
                      <label htmlFor="date"></label>
                       <input
                            id="date"
                            type="date"
                            name="date"
                            min="232-2-88"
                            max="30-01-31"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            onChange={(e) => setDates({...dates, endDate: e.target.value})}
                        />
                  </div>
                </div>
              </div>
          

              <div className='pt-4'>
                <button
        type="submit" className="relative left-4 text-black bg-[#FFBD59] hover:bg-[#FFBD59] focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Generate Report</button>
              </div>
</form>
 
            </div>

          </div>

        </div>

      </div>

       <div className={styles.generateReportContainer}>
        <div className={styles.titlePreview}>Preview File Here</div>
      
        
        <div className={styles.dividerPreview}>
         
      {generated ?   
      <PDF generate={generated} startDate={dates.startDate} endDate={dates.endDate} /> : null}
        </div>
      </div> 

    </div>

  )
}

(GenerateReport as PageWithLayout).layout = AdminPageLayout
export default GenerateReport