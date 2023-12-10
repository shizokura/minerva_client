import React, { useState, SyntheticEvent } from 'react'
import Image from 'next/image'
import router from 'next/router'
import Modal from '@/components/Modal';
import HomePageLayout from '@/layout/homepagelayout'
import PageWithLayout from '@/layout/pagewithlayout'
import styles from '@/styles/customer/customer.module.scss'
import { IoCartOutline } from "react-icons/io5";
import { IoMdArrowDropright } from "react-icons/io";
import { FaUserClock } from "react-icons/fa6";
import { IoMailUnread } from "react-icons/io5";
import Link from 'next/link';

export default function ChangePasswordReqSuccess() {


  const [ isModalOpen, setIsModalOpen ] = useState(true);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className=" bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 sm:p-7 " >
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Change Password Successful</h1>
            </div>

            <div className="mt-5 flex flex-col justify-center items-center">
              <IoMailUnread size={60} className="text-white mb-3" />
              <p className="text-center divide-x divide-gray-300 dark:divide-gray-700 text-white">
                The verification link for your forgot password request is now sent to the email you provided. Please see the email, if you cannot see an email from us, please double-check the spam folder.
              </p>
            </div>
          </div>
        </div>
      </Modal>

      <div className={styles.bodyHome}>

        <section className="relative h-screen flex flex-col items-center justify-center text-center text-white ">
          <div className={styles.videoDocker}>
            <video
              autoPlay muted loop className="min-w-full min-h-full absolute object-cover">
              <source src="/landingvid.MOV"
                type="video/mp4" /></video>
          </div>
          <div className="video-content space-y-2 z-10">
            <span className={styles.welcome}>Welcome</span>
            <span className={styles.tagline}>Road Safety & Roadworthiness
              <br></br>at your fingertips</span>
            <span className={styles.comment}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry{"'"}s standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type.</span>
          </div>
        </section>

        <section className="relative h-96 flex flex-col items-center justify-center text-center text-white">
          <div className={styles.section2}>
            <div className={styles.titleText}>

              <span>
                WELCOME TO <span className={styles.color}>MINERVA SALES</span> CORPORATION
              </span>
            </div>
            <div className={styles.contentText}>
              <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry{"'"}s
                standard dummy text ever since the 1500s, when an unknown printer took a galley of type. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry{"'"}s
                standard dummy text ever since the 1500s, when an unknown printer took a galley of type. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry{"'"}s
                standard dummy text ever since the 1500s, when an unknown printer took a galley of type. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry{"'"}s
                standard dummy text ever since the 1500s, when an unknown printer took a galley of type.
              </span>
            </div>
          </div>
        </section>

        <section className="relative h-60 flex flex-col items-center justify-center text-center text-white ">
          <div className={styles.section3}>
            <img src="/section-3.jpeg"></img>
          </div>
        </section>




        {/* contact */}

        <section className="relative pt-12 top-80 mt-16 -mb-4 h-screen flex flex-col items-center justify-center text-center text-black ">

          <iframe className={styles.map} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3865.685100620232!2d121.07044808579853!3d14.329715147891662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d75e4116aa53%3A0xc60e02b60387b51a!2sMinerva%20Sales%20Corp.%20-%20Dunlop%20Concept%20Shop!5e0!3m2!1sen!2sph!4v1700566977340!5m2!1sen!2sph"
            width="600" height="450" loading="lazy" ></iframe>
          <div className={styles.contactCards}>

            <ul className="flex items-start justify-between gap-8 mt-10 ml-12 md:flex-row flex-col">
              <div className="h-80 relative top-12 mx-auto mt-2 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-[#FFBD59] shadow-md duration-300 hover:scale-105 hover:shadow-lg">
                <div className="absolute top-8 flex w-80 flex-col items-center gap-3 px-2 py-10">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                    </svg>
                  </span>
                  <p className="text-2xl font-extrabold text-dark-grey-900">Phone</p>
                  <p className="text-base leading-7 text-dark-grey-600 font-medium">Reach out to us by phone</p>
                  <a className="text-lg font-bold text-purple-blue-500">0917 865 7346</a>
                </div>
              </div>

              <div className="h-80 relative top-12 mx-auto mt-2 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-[#FFBD59] shadow-md duration-300 hover:scale-105 hover:shadow-lg">
                <div className="absolute top-8 flex w-80 flex-col items-center gap-3 px-2 py-10">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h8">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </span>
                  <p className="text-2xl font-extrabold text-dark-grey-900">Location</p>
                  <p className="text-base leading-7 text-dark-grey-600 font-medium">Find us at our office</p>
                  <a className="text-lg font-bold text-purple-blue-500" target="_blank" href="https://tinyurl.com/yeysd225">General Malvar Street
                    Barangay Tubigan
                    Binan City, Laguna
                  </a>
                </div>
              </div>

              <div className="h-80 relative top-12 mx-auto mt-2 w-96 transform overflow-hidden rounded-lg bg-white dark:bg-[#FFBD59] shadow-md duration-300 hover:scale-105 hover:shadow-lg">
                <div className="absolute top-8 left-8 flex w-80 flex-col items-center gap-3 px-2 py-10">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <p className="text-2xl font-extrabold text-dark-grey-900">Office Hours</p>
                  <p className="text-base leading-7 text-dark-grey-600 font-medium">Visit us during these Hours</p>
                  <a className="text-lg font-bold text-purple-blue-500">
                    <span className='relative -left-24'>Open Mon-Sat <br></br>
                      8:00am - 5:00pm
                    </span>
                    <br></br>
                    <span className='relative -top-14 left-24'>Open Sun    <br></br>
                      8:30am - 3:00pm
                      <br></br></span>

                  </a>
                </div>
              </div>

            </ul>
          </div>
        </section>

        {/* Products */}

        <section className="relative h-60 mb-28 flex flex-col items-center justify-center text-center text-white ">
          <div className={styles.videoDocker2}>
            <video
              autoPlay muted loop className="min-w-full min-h-full absolute object-cover">
              <source src="/productvid.mp4"
                type="video/mp4" /></video>
          </div>
        </section>

        <section className="relative mb-28 -top-70 h-screen flex flex-col items-center justify-center text-center text-black ">
          <div className="absolute -top-40 -right-40 lg:w-2/3 w-full h-80 -z-10">
          </div>

          <div
            className="w-full max-w-[1190px] px-6 sm:px-8 md:px-16 py-10 md:py-20 rounded-xl bg-gradient-to-r  from-gray-100 via-[#FFBD59] to-gray-100 min-h-[300px] m-2 shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.5)]">
            <h1 className="font-bold text-2xl mb-2 tracking-wider drop-shadow-[3px_3px_5px_rgba(91,91,91,0.58)]">Products</h1>
            <small className="font-[700]">Explore our wide range of products.</small>
            <ul className="flex items-start justify-between gap-8 mt-10 md:flex-row flex-col">
              <div className="mx-auto mt-2 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-[#FFBD59] shadow-md duration-300 hover:scale-105 hover:shadow-lg">
                <img className="h-48 w-full object-cover object-center" src="https://www.motolite.com/cdn/shop/products/Gold1_750x.jpg?v=1663294903" alt="Motolite Gold" />
                <div className="p-4">
                  <h2 className="mb-2 text-lg font-medium dark:text-black text-gray-900">Motolite Gold</h2>
                  <p className="text-sm mb-2 dark:text-black text-black">Long lasting power for high performance vehicles.</p>
                  <div className="flex items-center">
                    <p className="mr-2 text-lg font-bold flex text-black dark:text-black">PHP 5,600.00 </p>
                    <button
                      className="ml-28 px-4 py-2 transition ease-in duration-200 uppercase rounded-full text-black font-bold hover:bg-black hover:text-white border-2 border-gray-900 focus:outline-none"><IoCartOutline size="18px" /></button>
                  </div>
                </div>
              </div>

              <div className="mx-auto mt-2 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-[#FFBD59] shadow-md duration-300 hover:scale-105 hover:shadow-lg">
                <img className="h-48 w-full object-cover object-center" src="https://www.motolite.com/cdn/shop/products/Gold1_750x.jpg?v=1663294903" alt="Motolite Gold" />
                <div className="p-4">
                  <h2 className="mb-2 text-lg font-medium dark:text-black text-gray-900">Motolite Gold</h2>
                  <p className="text-sm mb-2 dark:text-black text-black">Long lasting power for high performance vehicles.</p>
                  <div className="flex items-center">
                    <p className="mr-2 text-lg font-bold text-black dark:text-black">PHP 5,600.00</p>
                    <button
                      className="ml-28 px-4 py-2 transition ease-in duration-200 uppercase rounded-full text-black font-bold hover:bg-black hover:text-white border-2 border-gray-900 focus:outline-none"><IoCartOutline size="18px" /></button>

                  </div>
                </div>
              </div>

              <div className="mx-auto mt-2 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-[#FFBD59] shadow-md duration-300 hover:scale-105 hover:shadow-lg">
                <img className="h-48 w-full object-cover object-center" src="https://www.motolite.com/cdn/shop/products/Gold1_750x.jpg?v=1663294903" alt="Motolite Gold" />
                <div className="p-4">
                  <h2 className="mb-2 text-lg font-medium dark:text-black text-gray-900">Motolite Gold</h2>
                  <p className="text-sm mb-2 dark:text-black text-black">Long lasting power for high performance vehicles.</p>
                  <div className="flex items-center">
                    <p className="mr-2 text-lg font-bold text-black dark:text-black">PHP 5,600.00</p>
                    <button
                      className="ml-28 px-4 py-2 transition ease-in duration-200 uppercase rounded-full text-black font-bold hover:bg-black hover:text-white border-2 border-gray-900 focus:outline-none"><IoCartOutline size="18px" /></button>

                  </div>
                </div>
              </div>

            </ul>
            <button className="group relative top-4 mt-12 -mb-16 h-12 w-60 overflow-hidden rounded-lg bg-white text-lg shadow">
              <div className="absolute inset-0 w-3 bg-amber-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
              <span className="relative text-black group-hover:text-white">View More Products </span>
            </button>
          </div>

        </section>

        {/* Services */}
        <section className="relative -top-12 h-60  mb-2 flex flex-col items-center justify-center text-center text-white ">
          <div className={styles.videoDocker1}>
            <video
              autoPlay muted loop className="min-w-full min-h-full absolute object-cover">
              <source src="/services.MOV"
                type="video/mp4" /></video>
          </div>
        </section>

        <section className="relative top-12 mb-20 h-screen flex flex-col items-center justify-center text-center text-black ">
          <div className="absolute -top-40 -right-40 lg:w-2/3 w-full h-80 -z-10">
          </div>

          <div
            className="w-full max-w-[1300px] px-6 sm:px-8 md:px-16 py-10 md:py-20 rounded-xl bg-gradient-to-r  from-[#FFBD59] via-gray-100 to-[#FFBD59] min-h-[300px] m-2 shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.5)]">
            <h1 className="font-bold text-2xl mb-2 tracking-wider drop-shadow-[3px_3px_5px_rgba(91,91,91,0.58)]">Services</h1>
            <small className="font-[700]">Try our service and maintenance.</small>
            <ul className="flex items-start justify-between gap-8 mt-10 md:flex-row flex-col">
              <div className="mx-auto mt-2 w-96 transform overflow-hidden rounded-lg bg-[#FFBD59] shadow-md duration-300 hover:scale-105 hover:shadow-lg">
                <img className="h-48 w-full object-cover object-center" src="/services.png" alt="Change Tire" />
                <div className="p-4">
                  <h2 className="mb-2 text-lg font-medium dark:text-black text-gray-900">Change Tire</h2>
                  <p className="text-sm mb-2 dark:text-black text-black">Requires two sets of wheels and two sets of tires.</p>
                  <div className="flex items-center">
                    <p className="mr-2 text-lg font-bold flex text-black dark:text-black">PHP 1,600.00 </p>
                    <button
                      className="ml-40 px-4 py-2 transition ease-in duration-200 uppercase rounded-full text-black font-bold hover:bg-black hover:text-white border-2 border-gray-900 focus:outline-none"><FaUserClock size="18px" /></button>
                  </div>
                </div>
              </div>

              <div className="mx-auto mt-2 w-96 transform overflow-hidden rounded-lg bg-[#FFBD59] shadow-md duration-300 hover:scale-105 hover:shadow-lg">
                <img className="h-48 w-full object-cover object-center" src="/services.png" alt="Change Tire" />
                <div className="p-4">
                  <h2 className="mb-2 text-lg font-medium dark:text-black text-gray-900">Change Tire</h2>
                  <p className="text-sm mb-2 dark:text-black text-black">Requires two sets of wheels and two sets of tires.</p>
                  <div className="flex items-center">
                    <p className="mr-2 text-lg font-bold text-black dark:text-black">PHP 1,600.00</p>
                    <button
                      className="ml-40  px-4 py-2 transition ease-in duration-200 uppercase rounded-full text-black font-bold hover:bg-black hover:text-white border-2 border-gray-900 focus:outline-none"><FaUserClock size="18px" /></button>

                  </div>
                </div>
              </div>

              <div className="mx-auto mt-2 w-96 transform overflow-hidden rounded-lg bg-[#FFBD59] shadow-md duration-300 hover:scale-105 hover:shadow-lg">
                <img className="h-48 w-full object-cover object-center" src="/services.png" alt="Change Tire" />
                <div className="p-4">
                  <h2 className="mb-2 text-lg font-medium dark:text-black text-gray-900">Change Tire</h2>
                  <p className="text-sm mb-2 dark:text-black text-black">Requires two sets of wheels and two sets of tires.</p>
                  <div className="flex items-center">
                    <p className="mr-2 text-lg font-bold text-black dark:text-black">PHP 1,600.00</p>
                    <button
                      className="ml-40  px-4 py-2 transition ease-in duration-200 uppercase rounded-full text-black font-bold hover:bg-black hover:text-white border-2 border-gray-900 focus:outline-none"><FaUserClock size="18px" /></button>

                  </div>
                </div>
              </div>

            </ul>
            <button className="group relative top-4 mt-12 -mb-16 h-12 w-60 overflow-hidden rounded-lg bg-white text-lg shadow">
              <div className="absolute inset-0 w-3 bg-amber-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
              <span className="relative text-black group-hover:text-white">View More Services </span>
            </button>
          </div>

        </section>

        {/*  */}
        <section className="relative flex flex-col items-center justify-center text-center text-white ">
          <footer className="h-62 bg-gradient-to-r w-full from-gray-100 via-[#FFBD59] to-gray-100">
            <div className="max-w-screen-xl mt-2 px-2 py-8 mx-auto sm:px-6 lg:px-8">
              <div className="relative top-4 grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div>
                  <img src="/logo.png" className="mr-5 h-6 sm:h-6" alt="logo" />
                  <p className="max-w-xs mt-4 text-sm text-gray-600">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, accusantium.
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
                      <Link href="/products" className="hover:opacity-75">Products</Link>
                    </p>
                    <nav className="flex flex-col mt-1 space-y-1 text-sm text-black">
                      <a href="" className="hover:opacity-75"> Tires </a>
                      <a href="" className="hover:opacity-75"> Car Battery </a>
                      <a href="" className="hover:opacity-75"> Oils </a>
                      <a href="" className="hover:opacity-75"> Tire Mags </a>
                      <a href="" className="hover:opacity-75"> Car Filters </a>
                    </nav>
                  </div>
                  <div>
                    <p className="font-medium text-black">
                      <Link href="/services" className="hover:opacity-75 "> Services </Link>
                    </p>
                    <nav className="flex flex-col mt-1 space-y-1 text-sm text-black">
                      <a href="" className="hover:opacity-75"> Oil Change </a>
                      <a href="" className="hover:opacity-75"> Change Tire </a>
                      <a href="" className="hover:opacity-75"> Alignment </a>
                    </nav>
                  </div>
                  <div>
                    <p className="font-medium text-black">
                      Helpful Links
                    </p>
                    <nav className="flex flex-col mt-1 space-y-1 text-sm text-black">
                      <a href="" className="hover:opacity-75"> Contact </a>
                      <a href="" className="hover:opacity-75"> About </a>
                      <a href="" className="hover:opacity-75"> Live Chat </a>
                    </nav>
                  </div>
                  <div>
                    <p className="font-medium text-black">
                      Legal
                    </p>
                    <nav className="flex flex-col mt-1 space-y-1 text-sm text-black">
                      <a href="" className="hover:opacity-75" > Privacy Policy </a>
                      <a href="" className="hover:opacity-75" > Terms &amp; Conditions </a>
                      <a href="" className="hover:opacity-75" > Returns Policy </a>
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
    </div>
  )
}
(ChangePasswordReqSuccess as unknown as PageWithLayout).layout = HomePageLayout
