
import React, { FC, useState, useEffect, SyntheticEvent } from 'react'
import { TbFileAnalytics } from 'react-icons/tb'
import Head from 'next/head'
import router from 'next/router'
import Cookies from 'js-cookie'
import { jwtDecode} from 'jwt-decode'
import Products from '@/pages/product'
import PDF from '@/components/pdf'
import { Toaster, toast } from 'sonner'
import SideNavDash from '@/components/sideNavDash'

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

    <>
    <title>Generate Report</title>
    <SideNavDash/>
    <Toaster richColors/>
        <div className="h-screen bg-gray-200 sm:pl-24 lg:pl-2 ">
        <div className="flex w-full h-[1050px] bg-gradient-to-r from-amber-200 to-yellow-500 flex-col bg-white bg-clip-border text-gray-700 shadow-md">
                <div className="pt-10 md:pl-96 md:pt-[46px] lt:pl-20 lg:pl-96">
                        <div className="p-4 md:p-8">
                            <h1 className="text-black text-center font-bold pb-8 text-4xl md:text-5xl lg:text-6xl">Generate Report</h1>
                           
                           
                                <form encType='multipart/form-data' onSubmit={onSubmitGenerateRerport} className="flex flex-col items-center">
                                        <div className="md:w-4/5 lg:w-3/4 xl:w-2/3">

                                                <div className="flex flex-col md:flex-row gap-4">
                                                    
    
                                                    <label htmlFor="price" className="text-lg absolute mt-1.5 text-black font-bold px-1 rounded">
                                                    Select Start Date
                                                    </label>
                                                    

                                                    <input
                                                    id="date"
                                                   type="date"
                                                    name="date"
                                                    min="2023-12-1"
                                                     max="2030-01-31"
                                                    className="mt-10 py-4 px-4 rounded-md bg-white text-gray-800 w-full outline-none focus:ring-2 focus:ring-blue-600"
                                                    onChange={(e) => setDates({...dates, startDate: e.target.value})}
                                                        />
                                               
                                                </div>
    
                                                <div className="flex flex-col md:flex-row gap-4"> 
                                                <label htmlFor="price" className="text-lg absolute mt-1.5 text-black font-bold px-1 rounded">
                                                    Select End Date
                                                    </label>
    
                                                    <input
                                                    id="date"
                                                    type="date"
                                                     name="date"
                                                     min="2023-12-6"
                                                      max="2030-01-31"
                                                      className="mt-10 py-4 px-4 rounded-md bg-white text-gray-800 w-full outline-none focus:ring-2 focus:ring-blue-600"
                                                      onChange={(e) => setDates({...dates, endDate: e.target.value})}
                                                    />
                                               
                                               </div>

    
                                    
                                        </div>
                                    <button
                                        type="submit" className="border-2 text-md font-bold mt-5 rounded-md py-2 px-4 bg-[#FFBD59] shadow-md shadow-black hover:bg-yellow-500 text-gray-900 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-900">
                                        Generate Report
                                    </button>
                                </form>

                        </div>
                        <div>    {generated ?   
      <PDF generate={generated} startDate={dates.startDate} endDate={dates.endDate} /> : null}
      </div>
                        </div>    
                        </div>
    </div>



    </>
    

  )
}


export default GenerateReport