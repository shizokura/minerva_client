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

const About: FC = () => {
  return (
    <div className={styles.bodyAbout}>
      <section className='absolute top-20' id="about">
        <div className="relative w-screen h-[500px] overflow-hidden">
          <img className='object-cover w-full h-full' src="/about.jpeg" alt="About" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <p className="text-white text-[100px] font-bold font-poppins text-center">ABOUT US</p>
          </div>

        </div>


      </section>
      <div className="absolute top-[580px] h-[920px] inset-0 bg-gray-700 bg-opacity-90 " >
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
          <FaCar color="white" size="30px" />
        </div>
        <span className='absolute top-[87px] left-[1070px] font-poppins font-bold text-[30px] text-[#FFBD59]' >Quality</span>
        <span className='absolute w-[550px] top-36 left-[1070px]  font-poppins text-white text-[17px] tracking-wide'>
          We value quality workmanship and strive for excellence in every service we provide. We prioritize using high-quality parts, employing skilled technicians,
          and following industry best practices to ensure that vehicles are serviced or repaired to the highest standards.
        </span>

        <div className='absolute top-48'>
          <div className="absolute top-[90px] left-[1000px] bg-[#FFBD59] px-2 py-2 rounded-3xl">
            <PiSmileyFill color="white" size="30px" />
          </div>
          <span className='absolute w-96 top-[87px] left-[1070px] font-poppins font-bold text-[30px] text-[#FFBD59]' >Customer Satisfaction</span>
          <span className='absolute w-[550px] top-36 left-[1070px]  font-poppins text-white text-[17px] tracking-wide'>
            We prioritize building strong relationships with our clients and customers by delivering exceptional service, listening to their needs, and addressing their concerns.
          </span>
        </div>

        <div className='absolute top-[335px]'>
          <div className="absolute top-[90px] left-[1000px] bg-[#FFBD59] px-2 py-2 rounded-3xl">
            <FaHandshake color="white" size="30px" />
          </div>
          <span className='absolute w-[600px] top-[87px] left-[1070px] font-poppins font-bold text-[30px] text-[#FFBD59]' >Integrity and Transparency</span>
          <span className='absolute w-[550px] top-36 left-[1070px]  font-poppins text-white text-[17px] tracking-wide'>
            We place a high emphasis on integrity and transparency. We are honest and upfront about the services, products, pricing, and any potential issues discovered during inspections. We provide detailed explanations,
            options, and accurate estimates, ensuring that customers have a clear understanding of the work being done on their vehicles.</span>
        </div>

        <hr className="relative left-48 top-[630px] mt-8 w-[1500px] border-4 border-[#FFBD59] rounded-lg " />

        <div className='absolute top-[620px] left-[250px]'>
          <div className="absolute top-[90px]  bg-[#FFBD59] px-2 py-2 rounded-3xl">
            <IoIosEye color="white" size="30px" />
          </div>
          <span className='absolute w-96 top-[87px] left-16 font-poppins font-bold text-[30px] text-[#FFBD59]' >Vision</span>
          <span className='absolute w-[550px] top-36  left-16 font-poppins text-white text-[17px] tracking-wide'>
            To continue to be the leading automotive retail and service provider in Binan, Laguna and further improve service quality and customer experience</span>
        </div>

        <div className='absolute top-[620px] left-[1020px]'>
          <div className="absolute top-[90px]  bg-[#FFBD59] px-2 py-2 rounded-3xl">
            <BsBullseye color="white" size="30px" />
          </div>
          <span className='absolute w-96 top-[87px] left-16 font-poppins font-bold text-[30px] text-[#FFBD59]' >Mission</span>
          <span className='absolute w-[550px] top-36  left-16 font-poppins text-white text-[17px] tracking-wide'>
            To serve our clients and deliver a convenient shopping and servicing experience  to keep them worry-free on their journeys.</span>
        </div>


      </div>
      {/* Footer */}
      <section className="absolute w-full top-[1500px] flex flex-col items-center justify-center text-center text-white ">
        <footer className="h-62 bg-gradient-to-r w-full from-gray-100 via-[#FFBD59] to-gray-100">
          <div className="max-w-screen-xl mt-2 px-2 py-8 mx-auto sm:px-6 lg:px-8">
            <div className="relative top-4 grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div>
                <img src="/logo.png" className="mr-5 h-6 sm:h-6" alt="logo" />
                <p className="max-w-xs mt-4 text-sm text-gray-600">
                  Let us make your trips more comfortable and safe. Leave the worries behind and let{"'"}s begin our journey!
                </p>
                <div className="flex mt-8 space-x-6 text-gray-600">
                  <a href="https://www.facebook.com/MinervaSalesCorp" className="hover:opacity-75" target="_blank" rel="noreferrer">
                    <span className="sr-only"> Facebook </span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-8 lg:col-span-2 sm:grid-cols-1 lg:grid-cols-4">
                <div>
                  <p className="font-medium text-black">
                    <a href="/products" className="hover:opacity-75">Products</a>
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

(About as PageWithLayout).layout = HomePageLayout
export default About