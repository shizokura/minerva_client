import HomePageLayout from '@/layout/homepagelayout'
import PageWithLayout from '@/layout/pagewithlayout'
import React, { FC } from 'react'
import styles from '@/styles/customer/customer.module.scss'
import Link from 'next/link'

const Contacts: FC = () => {
  return (

<>
<section className='absolute top-20' id="about">
      <div className="relative w-screen h-[500px] overflow-hidden">
  <img className='object-cover w-full h-full' src="/MSC-TEAM.jpeg" alt="About" />
  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <p className="text-white text-[60px] lg:text-[100px] font-bold font-poppins text-center">CONTACT US</p>
  </div>
  
</div>


</section>

    <section className='relative h-[1000px] top-[600px] mb-80' id="contact">
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-8 lg:px-8 lg:py-20">
        <div className="mb-4">
            <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
                <h2 className="font-heading mb-4 font-bold tracking-tight text-gray-900 text-3xl sm:text-5xl">
                    Get in Touch With Us
                </h2>
                <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-600">
                    We would love to hear from you!
                </p>
            </div>
        </div>
        <div className="flex items-stretch justify-center">
            <div className="grid md:grid-cols-2">
                <div className="h-full pr-6">
                    <p className="mt-3 mb-12 text-lg text-gray-600">You may send an email and inquire with us through our contact details. Preferably, you may log in your account and inquire through the chat function as well for a quicker repsonse.</p>
                    <ul className="mb-6 md:mb-0">
                        <li className="flex">
                            <div className="flex h-10 w-10 items-center justify-center rounded bg-[#FFBD59] text-gray-50">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" className="h-6 w-6">
                                    <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                                    <path
                                        d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z">
                                    </path>
                                </svg>
                            </div>
                            <div className="ml-4 mb-4">
                                <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900">Our Address
                                </h3>
                                <p className="text-gray-600 ">General Malvar Street Barangay Tubigan</p>
                                <p className="text-gray-600 ">Binan City, Laguna</p>
                            </div>
                        </li>
                        <li className="flex">
                            <div className="flex h-10 w-10 items-center justify-center rounded bg-[#FFBD59] text-gray-50">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" className="h-6 w-6">
                                    <path
                                        d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2">
                                    </path>
                                    <path d="M15 7a2 2 0 0 1 2 2"></path>
                                    <path d="M15 3a6 6 0 0 1 6 6"></path>
                                </svg>
                            </div>
                            <div className="ml-4 mb-4">
                                <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 ">Contact
                                </h3>
                                <p className="text-gray-600 ">Mobile: 09178657346 </p>
                                <p className="text-gray-600 ">Mail: minervasalesweb@gmail.com</p>
                            </div>
                        </li>
                        <li className="flex">
                            <div className="flex h-10 w-10 items-center justify-center rounded bg-[#FFBD59] text-gray-50">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" className="h-6 w-6">
                                    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                                    <path d="M12 7v5l3 3"></path>
                                </svg>
                            </div>
                            <div className="ml-4 mb-4">
                                <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 ">Working
                                    hours</h3>
                                <p className="text-gray-600 ">Monday - Friday: 08:00 - 17:00</p>
                                <p className="text-gray-600 ">Saturday &amp; Sunday: 08:00 - 12:00</p>
                            </div>
                        </li>
                    </ul>
                </div>
               
            </div>

                

        </div>
        <iframe className="w-80 h-96 ml-4 lg:ml-[620px] lg:w-[660px] lg:absolute lg:-mt-[400px]" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3865.685100620232!2d121.07044808579853!3d14.329715147891662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d75e4116aa53%3A0xc60e02b60387b51a!2sMinerva%20Sales%20Corp.%20-%20Dunlop%20Concept%20Shop!5e0!3m2!1sen!2sph!4v1700566977340!5m2!1sen!2sph" 
      width="600" height="450"  loading="lazy" ></iframe>
    </div>
    <footer className="py-10 mt-8 w-screen flex flex-col space-y-10 justify-center bg-gradient-to-r from-[#FFBD59] via-gray-100 to-[#FFBD59]">

<nav className="flex justify-center flex-wrap gap-6 text-gray-500 font-medium">
    <Link className="text-black hover:text-gray-500" href="#">Home</Link>
    <Link className="text-black hover:text-gray-500" href="#">Products</Link>
    <Link className="text-black hover:text-gray-500" href="#">Services</Link>
    <Link className="text-black hover:text-gray-500" href="#">About</Link>
    <Link className="text-black hover:text-gray-500" href="#">Contact</Link>
</nav>

<div className="flex justify-center space-x-5">
    <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <img src="https://img.icons8.com/fluent/30/000000/facebook-new.png" />
   </Link>
  
</div>
<p className="text-center text-gray-700 font-medium">&copy; 2023 Minerva Sales Corporation. All rights reservered.</p>
</footer>
    </section>
    </>
  )
}

(Contacts as PageWithLayout).layout = HomePageLayout
export default Contacts