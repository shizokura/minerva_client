import HomePageLayout from '@/layout/homepagelayout'
import PageWithLayout from '@/layout/pagewithlayout'
import React, { FC, useEffect, useState } from 'react'
import styles from '@/styles/customer/customer.module.scss'
import { FaUserClock } from "react-icons/fa6";
import Image from 'next/image'
import { FormattedPrice } from '@/helpers/index'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
import router from 'next/router';
import Link from 'next/link'

const Services: FC = () => {

  const [ userId, setUserId ] = useState("")
  const [ page, setPage ] = useState(0)

  const handleClick = (servicesID: any) => {
    // Navigate to the target page when the component is clicked
    router.push(`/services/servicedetail/${servicesID}`);
  };

  const [ services, setServices ] = useState<[]>()

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/services/getAllServices/?skip=${page}&orderby=desc`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
        cache: "default"
      })

      const result = await response.json();
      setServices(result)
    }
    fetchData()
  }, [ services ])

  return (
    <>

<section id="Projects" className="mt-40 lg:ml-[180px] w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mb-5">

  {services?.slice (0, 3).map(({ servicesID, image, services, description, userID, price }: any) => (
        <div key={servicesID} onClick={() => handleClick(servicesID)}>
              <div className="w-[260px] xl:w-[500px] bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                        {image.length > 0 && (
              <Image src={image} alt={services} height={350} width={500} />
            )}
                      <div className="px-4 py-3 w-[260px] xl:w-[500px] leading normal">
                      <span className="text-gray-400 mr-3 uppercase text-xs">{description}</span>
                          <p className="max-w-[200px] break-normal leading-tight text-lg font-bold text-black truncate block capitalize">{services}</p>
                          <div className="flex items-center">
                              <p className="text-lg font-semibold text-black cursor-auto my-3">{FormattedPrice(price)}</p>
                              <div className="ml-auto"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                      fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
                                      <path fill-rule="evenodd"
                                          d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                                      <path
                                          d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                                  </svg></div>
                          </div>
                      </div>
                  </div>
              </div>
  ))} 
          </section>
          <div className="flex justify-center">
 <div className="flex w-20 mt-12 mb-10 -ml-24 lg:-ml-12">
 <button
      disabled={page === 0}
      className="bg-[#FFBD59] hover:bg-blue-700 text-white font-bold mx-4 py-2 px-4 rounded"
      onClick={() => setPage(() => page - 1)}
    >
      Prev
    </button>
    <button
      className="bg-[#FFBD59] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => setPage(() => page + 1)}
    >
      Next
    </button>
 </div>
 </div>
          <section className="relative flex flex-col items-center justify-center text-center text-white ">
          <footer className="py-10 w-screen flex flex-col space-y-10 justify-center bg-gradient-to-r from-gray-100 via-[#FFBD59] to-gray-100">

<nav className="flex justify-center flex-wrap gap-6 text-gray-500 font-medium">
    <Link className="text-black hover:text-gray-500" href="#">Home</Link>
    <Link className="text-black hover:text-gray-500" href="#">Products</Link>
    <Link className="text-black hover:text-gray-500" href="#">Services</Link>
    <Link className="text-black hover:text-gray-500" href="#">About</Link>
    <Link className="text-black hover:text-gray-500" href="#">Contact</Link>
</nav>

<div className="flex justify-center space-x-5">
    <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <Image src="https://Image.icons8.com/fluent/30/000000/facebook-new.png" alt=''/>
   </Link>
  
</div>
<p className="text-center text-gray-700 font-medium">&copy; 2023 Minerva Sales Corporation. All rights reservered.</p>
</footer>

          </section>

            </>
  )
}

(Services as PageWithLayout).layout = HomePageLayout
export default Services