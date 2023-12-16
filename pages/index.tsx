import Image from 'next/image'
import { Inter } from 'next/font/google'
import HomePageLayout from '@/layout/homepagelayout'
import PageWithLayout from '@/layout/pagewithlayout'
import { motion } from "framer-motion"
import { FC, FunctionComponent, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import styles from '@/styles/customer/customer.module.scss'
import React, { Component} from 'react';
import { IoCartOutline } from "react-icons/io5";
import { IoIosEye, IoMdArrowDropright } from "react-icons/io";
import { FaUserClock } from "react-icons/fa6";
import 'react-toastify/dist/ReactToastify.css';
import { Toaster, toast } from 'sonner'
import { FormattedPrice } from '@/helpers'
import { useRouter } from 'next/router'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
import { FacebookProvider, CustomChat } from 'react-facebook';


const Home: FC = () => {

  const [ productsTake, setProductsTake ] = useState(10)  // you can set this on default
  const [ products, setProducts ] = useState<[]>()
  const [ filterProducts, setFilterProducts ] = useState("asc")
  const [ search, setSearch ] = useState("")
  const [ productSearch, setProductSearch ] = useState(null)
  const [ productCategory, setProductCategory ] = useState(null)
  const [ category, setCategory ] = useState("")
  const [ page, setPage ] = useState(0)
  const [ userId, setUserId ] = useState("")



  const [ isOpen, setIsOpen ] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const filtersOptions = [
    {
      name: "Low-to-High", value: "asc"
    },
    {
      name: "High-to-Low", value: "desc"
    }
  ];


  const router = useRouter();

  const handleClickProducts = (productId: any) => {
    // Navigate to the target page when the component is clicked
    router.push(`/product/productdetail/${productId}`);
  };

  const handleClickServices = (servicesID: any) => {
    // Navigate to the target page when the component is clicked
    router.push(`/services/servicedetail/${servicesID}`);
  };


  // search products

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/product/getProductsByCategory/?category=${category}&skip=${page}&orderby=${filterProducts}`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
      })

      const result = await response.json()
      setProductCategory(result)
    }
    fetchData()
  }, [ productCategory ])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/product/getSearchProduct/?search=${search}`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
      })
      const result = await response.json()
      setProductSearch(result)
    }
    fetchData()
  }, [ productSearch ])

  //filter data w/ pagination 



  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/product/getAllProduct/?skip=${page}&orderby=${filterProducts}`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
        cache: "default"
      })

      if (!res.ok) {
        throw new Error("There something wrong while fetching data")
      }

      const result = await res.json();

      setProducts(result)

    }

    fetchData();
  }, [ products ])

  const [ isModalOpen, setIsModalOpen ] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setTimeout(() => {
      setIsModalOpen(false);
    }, 2000);
  }

  const [ services, setServices ] = useState<[]>()
  const [ servicesId, setServicesId ] = useState("")
  const [ userid, setUserID ] = useState("")


  useEffect(() => {
    const cookies = Cookies.get("ecom_token") as any
    if (cookies) {
      const { userID }: any = jwtDecode(cookies) as any
      setUserId(userID)
    }
  }, [ userId ])


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/services/getAllServices/?skip=${page}&orderby=desc`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
        cache: "default"
      })

      if (!response.ok) {
        throw new Error("There something wrong while fetching data")
      }

      const result = await response.json();

      setServices(result)

    }

    fetchData();
  }, [ services ])


  const onFormDelete = async () => {
    const res = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/services/deleteService/${servicesId}`, {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userID: userId,
      })
    })


    if (!res.ok) {
      alert("There something wrong while updating..")
    } else {
      {
        services?.map(({ userID, servicesID, id, services, description, price, status }: any) => (

          toast.warning(`${services} has been deleted`)

        ))
      }
    }

    return res.json();
  }

  const videoRef = useRef<HTMLVideoElement>(null);

 useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
      videoRef.current.addEventListener('ended', () => {
        videoRef.current!.play();
      });
    }
 }, []);

  return (
<div className={styles.bodyHome}>
<Toaster richColors  />

<section className="relative w-full h-screen flex flex-col items-center justify-center text-center text-white">
  
          <div className={styles.videoDocker}>
              <video
              autoPlay muted loop className="min-w-full min-h-full absolute object-cover">
              <source src="/landingvid.MOV" 
              type="video/mp4"/></video>
          </div>
          <div className="pt-10 video-content space-y-2 z-10">
              <span className={styles.welcome}>Welcome</span>
              <span className={styles.tagline}>Road Safety & Roadworthiness 
              <br></br>at your fingertips</span>
              <span className={styles.comment}>Drive with Confidence Knowing Minerva Sales Corporation 
              is Always by Your Side. We Take Pride in Offering Comprehensive Solutions 
              to Enhance Your Vehicle’s Performance, Longevity, and Efficiency.</span>
          </div>
      </section>

        <section className="relative mt-20 h-96 flex flex-col items-center justify-center text-center text-white">
              <div className={styles.section2}>
              <div className={styles.titleText}>

              <span>
              <span className={styles.color}>MINERVA SALES</span> CORPORATION
              </span>
              </div>
                <div className={styles.contentText}>
                  <span>We are an automotive retail service provider for over 30 years in Binan, Laguna. Our flagship brand in tires is Dunlop, but we also provide supplies for other notable brands such as Yokohama, Goodyear, Michelin, BF Goodrich, and etc.
                  </span>
                </div>
              </div>
      </section>  

      <section className="relative -mb-96 h-32 flex flex-col items-center justify-center text-center text-white ">

    <div className={styles.section3}>
      <Image src="/section-3.jpeg" width={2000} height = {100} alt = "" />
      </div>
      </section> 

      


      {/* contact */}
      
      <section className="relative pt-12 top-[900px] mt-16 -mb-4 h-[1350px] flex flex-col items-center justify-center text-center text-black ">
        
      <iframe className={styles.map}src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3865.685100620232!2d121.07044808579853!3d14.329715147891662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d75e4116aa53%3A0xc60e02b60387b51a!2sMinerva%20Sales%20Corp.%20-%20Dunlop%20Concept%20Shop!5e0!3m2!1sen!2sph!4v1700566977340!5m2!1sen!2sph" 
      width="600" height="450"  loading="lazy" ></iframe>
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
                          <span className="text-base leading-7 text-dark-grey-600 font-medium">Visit us during these Hours</span>
                          <div className="text-lg font-bold text-purple-blue-500">
                              <a className='relative -left-24'>Open Mon-Sat <br></br>
                              8:00am - 5:00pm
                              </a>
                              <br></br>
                              <a className='relative -top-14 left-24'>Open Sun    <br></br>
                              8:30am - 3:00pm
                                    <br></br></a>
                              
                           </div>
                          </div>  
                      </div>
            
        </ul>
        
              </div>
      </section>   

      {/* Products */}

         <section className="relative h-60 top-96 mb-28 flex flex-col items-center justify-center text-center text-white ">
<div className={styles.videoDocker2}>
              <video 
              autoPlay muted loop className="max-w-full max-h-full  absolute object-cover"> 
              <source src="/productvid.mp4" 
              type="video/mp4"/></video>
          </div>
      </section>  
 
 <section className="relative mb-28 top-20 h-[1200px] flex flex-col items-center justify-center text-center text-black ">
    <div className="absolute -top-40 lg:w-2/3 w-full h-80 -z-10">
    </div>

    <div
        className={styles.productSection}>        
        <h1 className={styles.headerP}>Products</h1>
         <small className={styles.h2}>Explore our wide range of products.</small>
        <ul className="flex items-start justify-start gap-8 lg:gap-[170px] mt-10 md:flex-row flex-col">
        
        { products?.slice(0, 3).map(({ userId, id, productID, name, category, price, stock, image, description, quantity }: any) => (
  
  <div key={productID} onClick={() => handleClickProducts(productID)}>
       
        <div className={styles.pCard}>
           
           {image.length > 0 && (
    <Image src={image[0]} alt={name} height={100} width={300}/>
  )}                       
   <div className="p-4">
                          <h2 className={styles.pName}>{name}</h2>
                          <p className="text-sm mb-2 dark:text-black text-black">{category}</p>
                              <div className="flex items-center">
                                <p className="mr-2 text-lg font-bold flex text-black dark:text-black">{FormattedPrice(price)} </p>
                                <button
               
               className="absolute bottom-0 right-0 mx-2 my-2 px-4 py-2 transition ease-in duration-200 uppercase rounded-full text-black font-bold hover:bg-black hover:text-white border-2 border-gray-900 focus:outline-none"><IoIosEye size="18px"/></button>
                              </div>
                          </div>  
                      </div>
                      </div>

           ))}   
        </ul>
        <div className={styles.pButton}>
           <button onClick={() => router.push("/products")} className="group relative top-8 left-[53px] mt-12 -mb-16 h-12 w-60 overflow-hidden rounded-lg bg-white text-lg shadow">
    <div className="absolute inset-0 w-3 bg-amber-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
    <span className="relative text-black group-hover:text-white">View More Products </span>
    </button>  
  </div>
</div>

</section>  

      {/* Services */}
         <section className="relative -top-12 h-60  mb-2 flex flex-col items-center justify-center text-center text-white ">
      <div className={styles.videoDocker1}>
                    <video 
                    autoPlay muted loop className="max-w-full max-h-full  absolute object-cover"> 
                    <source src="/services.MOV" 
                    type="video/mp4"/></video>
                </div>
            </section>


      <section className="relative -mt-[650px] -mb-60 h-screen flex flex-col items-center justify-center text-center text-black ">
    <div className="absolute -top-40 lg:w-2/3 w-full h-80 -z-10">
    </div>

    <div
        className={styles.servicesSection}>

        <h1 className={styles.h1S}>Services</h1>
        
        <small className={styles.h2S}>Try our service and maintenance.</small>

        <ul className="flex items-start justify-between gap-8 mt-10 md:flex-row flex-col">

        {services?.map(({ userID, servicesID, id, services, description, price, status, image }: any) => (
          
          <div key={servicesID} onClick={() => handleClickServices(servicesID)}>
        
        <div className={styles.sCard}>
 <Image src={image} alt={services} height={350} width={450} />                        <div className="p-4">
                          <h2 className="mb-2 text-lg font-medium dark:text-black text-gray-900">{services}</h2>
                          <p className="text-sm mb-2 dark:text-black text-black">{status}</p>
                              <div className="flex items-center">
                                <p className="mr-2 w-36 text-lg font-bold flex text-black dark:text-black">{FormattedPrice(price)} </p>
                                <button
                  className="-mt-80 xl:mt-2 ml-40 px-4 py-2 s8:mt-[70px] transition ease-in duration-200 uppercase rounded-full text-black font-bold hover:bg-black hover:text-white border-2 border-gray-900 focus:outline-none"><FaUserClock size="18px"/></button>
                              </div>
                          </div>  
                      </div>
                      </div>
            ))}
            
        </ul>
        <div className={styles.sButton}>
        <button onClick={() => router.push("/services")} className="group relative top-4 left-[35px] mt-12 -mb-2 h-12 w-60 overflow-hidden rounded-lg bg-white text-lg shadow">
    <div className="absolute inset-0 w-3 bg-amber-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
    <span className="relative text-black group-hover:text-white">View More Services </span>
  </button>
    </div>
    </div> 

</section>  

{/*  */}
 <footer className="py-10 fr:mt-[1940px] xs:mt-[940px] sm:mt-[1260px] 12:mt-[910px] 14:mt-[1870px] s8:mt-[1270px] lg:mt-[1070px] lg:w-[100%] flex flex-col space-y-10 justify-center bg-gradient-to-r from-[#FFBD59] via-gray-200 to-[#FFBD59]">

<nav className="flex justify-center flex-wrap gap-6 text-gray-500 font-medium">
    <Link className="text-black hover:text-gray-500" href="/">Home</Link>
    <Link className="text-black hover:text-gray-500" href="/product">Products</Link>
    <Link className="text-black hover:text-gray-500" href="/service">Services</Link>
    <Link className="text-black hover:text-gray-500" href="/about">About</Link>
    <Link className="text-black hover:text-gray-500" href="/contact">Contact</Link>
</nav>

<div className="flex justify-center space-x-5">
    <Link href="https://www.facebook.com/MinervaSalesCorp" target="_blank" rel="noopener noreferrer">
        <Image src="/fblogo.webp" alt = "" width={20} height={10}/>
   </Link>
  
</div>
<p className="text-center text-gray-700 font-medium">&copy; 2023 Minerva Sales Corporation. All rights reserved.</p>
</footer> 
    
    </div> 

  )
}

(Home as PageWithLayout).layout = HomePageLayout
export default Home

