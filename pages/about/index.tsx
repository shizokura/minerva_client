"use client"; 
import HomePageLayout from '@/layout/homepagelayout'
import PageWithLayout from '@/layout/pagewithlayout'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { motion } from "framer-motion"
import { FC, useRef, useState } from 'react'
import Link from 'next/link'
import styles from '@/styles/customer/customer.module.scss'
import { FaCar } from "react-icons/fa6";
import { PiSmileyFill } from "react-icons/pi";
import { FaHandshake } from "react-icons/fa6";
import { BsBullseye } from "react-icons/bs";
import { IoIosEye } from "react-icons/io";
import FacebookMsg from '@/components/FacebookMsg'

const About: FC = () => {

    
  return (
    <>
    <section className='absolute top-20' id="about">
    <div className="relative w-screen h-[500px] overflow-hidden">
<Image className='object-cover w-full h-full' src="/about.jpeg" width={2048} height={1536} alt="About" />
<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
  <p className="text-white text-[60px] lg:text-[100px] font-bold font-poppins text-center">ABOUT US</p>
</div>

</div>


</section>

<div className="pt-[600px] pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="lg:text-center">
              <h2
                  className="font-heading mb-4 bg-orange-100 text-blac px-4 py-2 rounded-lg md:w-64 md:mx-auto text-xs font-semibold tracking-widest text-black uppercase title-font">
                  About Us
              </h2>
              <p className="font-heading mt-2 text-3xl leading-10 font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Welcome to Minerva Sales Corporation, a pioneer in automotive services in Biñan, Laguna. 

              </p>
              <p className="mt-4 max-w-2xl text-lg text-gray-500 lg:mx-auto">
              We offer a comprehensive range of car care services to meet all your vehicle’s needs.
Our skilled technicians and mechanics provide top-notch service, utilizing the latest technology and tools.
              </p>
          </div>

          <div className="mt-10">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                  <div className="relative">
                      <dt>
                          <div
                              className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                              {/* <Image src="https://www.svgrepo.com/show/503163/api-settings.svg" > */}
                          </div>
                          <p className="font-heading ml-0 lg:ml-16 text-lg leading-6 font-bold text-gray-700">Quality</p>
                      </dt>
                      <dd className="mt-2 ml-0 lg:ml-16 text-base text-gray-500">
                      We value quality workmanship and strive for excellence in every service we provide. We prioritize using high-quality parts, employing skilled technicians,
and following industry best practices to ensure that vehicles are serviced or repaired to the highest standards.

                      </dd>
                  </div>
                  <div className="relative">
                      <dt>
                          <div
                              className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                              {/* <Image src="https://www.svgrepo.com/show/503138/webpack.svg" > */}
                          </div>
                          <p className="font-heading ml-0 lg:ml-16 text-lg leading-6 font-bold text-gray-700">Customer Satisfaction
                          </p>
                      </dt>
                      <dd className="mt-2 ml-0 lg:ml-16 text-base text-gray-500"> We prioritize building strong relationships 
                      with our clients and customers by delivering exceptional service, listening 
                      to their needs, and addressing their concerns.
                      </dd>
                  </div>
                  <div className="relative">
                      <dt>
                          <div
                              className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                              {/* <Image src="https://www.svgrepo.com/show/511771/dashboard-671.svg" > */}

                          </div>
                          <p className="font-heading ml-0 lg:ml-16 text-lg leading-6 font-bold text-gray-700">Integrity and Transparency
                          </p>
                      </dt>
                      <dd className="mt-2 ml-0 lg:ml-16 text-base text-gray-500"> We place a high emphasis on integrity and transparency. We are honest 
                      and upfront about the services, products, pricing, and any potential issues discovered during inspections.
                      </dd>
                  </div>
                  <div className="relative">
                      <dt>
                          <div
                              className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                              {/* <Image src="https://www.svgrepo.com/show/76267/free-commercial-label.svg" > */}

                          </div>
                          <p className="font-heading ml-0 lg:ml-16 text-lg leading-6 font-bold text-gray-700">We Follow Best Practices
                          </p>
                      </dt>
                      <dd className="mt-2 ml-0 lg:ml-16 text-base text-gray-500"> By following these best practices, we provide 
                      superior service, enhance customer satisfaction, and build a reputation for excellence in the industry.
                      </dd>
                  </div>
              </dl>
          </div>
<FacebookMsg/>
      </div>

      <footer className="py-10 -mt-10 lg:mt-0 w-screen flex flex-col space-y-10 justify-center bg-gradient-to-r from-[#FFBD59] via-gray-100 to-[#FFBD59]">

<nav className="flex justify-center flex-wrap gap-6 text-gray-500 font-medium">
  <Link className="text-black hover:text-gray-500" href="#">Home</Link>
  <Link className="text-black hover:text-gray-500" href="#">Products</Link>
  <Link className="text-black hover:text-gray-500" href="#">Services</Link>
  <Link className="text-black hover:text-gray-500" href="#">About</Link>
  <Link className="text-black hover:text-gray-500" href="#">Contact</Link>
</nav>

<div className="flex justify-center space-x-5">
  <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
      <Image src="/fblogo.webp" width={20} height={20} alt=''/>
 </Link>

</div>
<p className="text-center text-gray-700 font-medium">&copy; 2023 Minerva Sales Corporation. All rights reservered.</p>
</footer>

{/* <div className="absolute top-[580px] h-[920px] inset-0 bg-gray-700 bg-opacity-90 " >
<span className='absolute top-20 left-60 font-poppins font-bold text-[32px] text-[#FFBD59]'>About Us</span>
<span className='absolute mt-6 w-[550px] top-32 left-60 font-poppins font-semibold text-[45px] text-white leading-[50px] tracking-wide'> We Are The Pioneer In Automotive Services in Biñan, Laguna </span>
<span className='absolute mt-4 w-[620px] top-80 left-60 font-poppins text-white text-[17px] tracking-wide'>
Welcome to Minerva Sales Corporation, a pioneer in automotive services in Biñan, Laguna. We offer a comprehensive range of car care services to meet all your vehicle’s needs.
Our skilled technicians and mechanics provide top-notch service, utilizing the latest technology and tools.

<br></br>
<br></br>

At Minerva Sales Corporation, we are committed to excellence, ensuring your vehicle receives the highest 
level of care. Visit us today and experience our dedication to keeping your vehicle in prime condition.
</span>

<div className="absolute top-[90px] left-[1000px] bg-[#FFBD59] px-2 py-2 rounded-3xl">
<FaCar color="white" size="30px"/>
</div>
<span className='absolute top-[87px] left-[1070px] font-poppins font-bold text-[30px] text-[#FFBD59]' >Quality</span>
<span className='absolute w-[550px] top-36 left-[1070px]  font-poppins text-white text-[17px] tracking-wide'> 
We value quality workmanship and strive for excellence in every service we provide. We prioritize using high-quality parts, employing skilled technicians,
and following industry best practices to ensure that vehicles are serviced or repaired to the highest standards.
</span>

<div className='absolute top-48'>
<div className="absolute top-[90px] left-[1000px] bg-[#FFBD59] px-2 py-2 rounded-3xl">
<PiSmileyFill color="white" size="30px"/>
</div>
<span className='absolute w-96 top-[87px] left-[1070px] font-poppins font-bold text-[30px] text-[#FFBD59]' >Customer Satisfaction</span>
<span className='absolute w-[550px] top-36 left-[1070px]  font-poppins text-white text-[17px] tracking-wide'> 
We prioritize building strong relationships with our clients and customers by delivering exceptional service, listening to their needs, and addressing their concerns.
</span>
</div>

<div className='absolute top-[335px]'>
<div className="absolute top-[90px] left-[1000px] bg-[#FFBD59] px-2 py-2 rounded-3xl">
<FaHandshake color="white" size="30px"/>
</div>
<span className='absolute w-[600px] top-[87px] left-[1070px] font-poppins font-bold text-[30px] text-[#FFBD59]' >Integrity and Transparency</span>
<span className='absolute w-[550px] top-36 left-[1070px]  font-poppins text-white text-[17px] tracking-wide'> 
We place a high emphasis on integrity and transparency. We are honest and upfront about the services, products, pricing, and any potential issues discovered during inspections. We provide detailed explanations,
options, and accurate estimates, ensuring that customers have a clear understanding of the work being done on their vehicles.</span>
</div>

<hr className="relative left-48 top-[630px] mt-8 w-[1500px] border-4 border-[#FFBD59] rounded-lg " />

<div className='absolute top-[620px] left-[250px]'>
<div className="absolute top-[90px]  bg-[#FFBD59] px-2 py-2 rounded-3xl">
<IoIosEye color="white" size="30px"/>
</div>
<span className='absolute w-96 top-[87px] left-16 font-poppins font-bold text-[30px] text-[#FFBD59]' >Vision</span>
<span className='absolute w-[550px] top-36  left-16 font-poppins text-white text-[17px] tracking-wide'> 
To continue to be the leading automotive retail and service provider in Binan, Laguna and further improve service quality and customer experience</span>
</div>

<div className='absolute top-[620px] left-[1020px]'>
<div className="absolute top-[90px]  bg-[#FFBD59] px-2 py-2 rounded-3xl">
<BsBullseye color="white" size="30px"/>
</div>
<span className='absolute w-96 top-[87px] left-16 font-poppins font-bold text-[30px] text-[#FFBD59]' >Mission</span>
<span className='absolute w-[550px] top-36  left-16 font-poppins text-white text-[17px] tracking-wide'> 
To serve our clients and deliver a convenient shopping and servicing experience  to keep them worry-free on their journeys.</span>
</div> 


</div>
 
</section>
*/}
</>
  )
}

(About as PageWithLayout).layout = HomePageLayout
export default About