import Image from 'next/image'
import { Inter } from 'next/font/google'
import HomePageLayout from '@/layout/homepagelayout'
import PageWithLayout from '@/layout/pagewithlayout'
import { motion } from "framer-motion"
import { FC, FunctionComponent, useEffect, useRef, useState, SyntheticEvent } from 'react'
import Link from 'next/link'
import styles from '@/styles/customer/customer.module.scss'
import { GiCarWheel } from "react-icons/gi";
import { GiCartwheel } from "react-icons/gi";
import { BiSolidCarBattery } from "react-icons/bi";
import { IoListSharp } from "react-icons/io5";
import { LiaOilCanSolid } from "react-icons/lia";
import { BiSolidCylinder } from "react-icons/bi";
import { IoCartOutline } from "react-icons/io5";
import { IoMdArrowDropleft } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import { FormattedPrice } from '@/helpers/index'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useLocalStorageValue } from '@react-hookz/web'
import { GiHamburgerMenu } from "react-icons/gi";
import { Transition, Disclosure } from "@headlessui/react";


interface Product {
  productID: string
  name: string
  image: []
  price: number
  category: string
  quantity: string

}

const Products: FC = () => {

  const [ productsTake, setProductsTake ] = useState(10)  // you can set this on default
  const [ products, setProducts ] = useState<[]>()
  const [ filterProducts, setFilterProducts ] = useState("asc")
  const [ search, setSearch ] = useState("")
  const [ productSearch, setProductSearch ] = useState<any>(null)
  const [ productCategory, setProductCategory ] = useState<any>(null)
  const [ category, setCategory ] = useState("")
  const [ page, setPage ] = useState(0)
  const [ userId, setUserId ] = useState("")

  const productCategoryLInk = [
    { name: "View All", icon: <IoListSharp size="40px" />, value: "" },
    { name: "Tires", icon: <GiCarWheel size="40px" />, value: "Tires" },
    { name: "Car Battery", icon: <BiSolidCarBattery size="40px" />, value: "Car Battery" },
    { name: "Tire Mags", icon: <GiCartwheel size="40px" />, value: "Tire Mags" },
    { name: "Oils", icon: <LiaOilCanSolid size="40px" />, value: "Oils" },
    { name: "Car Filters", icon: <BiSolidCylinder size="40px" />, value: "Car Filters" },


  ]


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

  const handleClick = (productId: any) => {
    // Navigate to the target page when the component is clicked
    router.push(`/product/productdetail/${productId}`);
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
  }, [ productSearch, search ])

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
  }, [ filterProducts, page, products ])


  return (
    <>



    <div className='fixed lg:absolute lg:w-2 top-[110px] w-screen h-[60px] bg-black'>
    <Disclosure as="nav">
<Disclosure.Button className="absolute top-3 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-white hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
        <GiHamburgerMenu
          className="block lg:hidden h-6 w-6"
          aria-hidden="true"
        />
      </Disclosure.Button>
      <div className="pt-[110px] lg:pt-[80px] pl-10 w-[300px] h-[600px] lg:w-[350px] lg:h-[100px] z-60 absolute bg-white top-0 -left-96  lg:left-0 peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
        <div className="flex flex-col justify-start item-center">
          
          
          <div className=" my-4 border-b border-gray-100 pb-4">
            <div className="flex flex-col mb-2 items-center gap-4 pl-5">
            {productCategoryLInk.map(({ name, value, icon}) => (
              <button key={name} value={value} onClick={(e) => setCategory(e.currentTarget.value)} className=" w-full flex gap-2 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                  <span className="text-2xl text-gray-600 group-hover:text-white "> {icon} </span>
                 <span className="text-base text-gray-800 group-hover:text-white font-semibold "> {name}</span>
                 </button>
              ))}
              
           
            
              </div>
          </div>
          
        </div>
      </div>
    </Disclosure>
                          <div className='absolute top-[10px] lg:top-[10px] left-[185px] lg:left-[280px] z-40'>
                                    <button type="button" className="inline-flex justify-center w-20 lg:w-[150px] rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-xs lg:text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"

                                                onClick={toggleDropdown}
                                              >
                                                Filters

                                                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http:www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 011.414 0 1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                                </svg>
                                              </button>
                                            </div>
                                            <div className={`bg-white flex flex-col rounded-md shadow-xl bg-primary-100 p-4 text-black ${isOpen ? 'w-[160px] lg:w-[160px] absolute z-40 top-[50px] left-[100px] lg:top-[50px] xl:top-[170px] lg:left-[270px] lg:z-20' : 'hidden'}`}>
                          {isOpen ? (
                            filtersOptions.map(({name, value}) => (
                              <button
                              name="status"
                                className='text-left'
                                type="button"
                                key={name}
                                value={value}
                                onClick={(e) => setFilterProducts(e.currentTarget.value)}
                            
                                aria-required>
                                {name}
                              </button>
                            ))
                          ) : null}
                                        </div>

                


     
        <div className="absolute z-20 top-[3.5px] left-6 lg:left-10 flex items-center w-[140px] lg:w-[220px] mx-auto bg-white border-2 border-black rounded-md text-sm " x-data="{ search: '' }">
          <div className="w-full">
          
            <input type="search" className="w-full px-4 py-1 text-gray-800 rounded-lg focus:outline-none "
              placeholder="search" onChange={(e) => setSearch(e.target.value)}/>
          </div>
          
          <div>
            <button type="submit" className="flex items-center border-2 bg-[#FFBD59] justify-center w-12 h-12 text-white rounded-r-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </div>
        </div> 
        </div>
<section id="Projects" className="ml-16 mt-48 lg:mt-40 sm:ml-[85px] lg:ml-[500px] w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mb-5">


       { search  ? productSearch?.map(({ productID, name, category, price, stock, image, description, quantity } :any) => (
                   <div key={productID} onClick={() => handleClick(productID)}>
  <div className="w-[260px] xl:w-96 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
             {image.length > 0 && (
   <Image src={image[0]} alt={name} height={120} width={500}/>
 )}
          <div className="px-4 py-3 w-[260px] xl:w-96">
          <span className="text-gray-400 mr-3 uppercase text-xs">{category}</span>
              <p className="w-1/2 leading-tight text-lg font-bold text-black truncate block capitalize">{name}</p>
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
       )) : category ? productCategory?.map(({ productID, name, category, price, stock, image, description, quantity } :any) => (
                  <div key={productID} onClick={() => handleClick(productID)}>
                  <div className="w-[260px] xl:w-96 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                  {image.length > 0 && (
   <Image src={image[0]} alt={name} height={120} width={500}/>
 )}
          <div className="px-4 py-3 w-[260px] xl:w-96">
              <span className="text-gray-400 mr-3 uppercase text-xs">{category}</span>
              <p className="text-lg font-bold text-black truncate block capitalize">{name}</p>
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

  )): 
        products?.map(({ userId, id, productID, name, category, price, stock, image, description, quantity }: any) => (
         <div key={productID} onClick={() => handleClick(productID)}>
         <div className="w-[260px] xl:w-96 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
         {image.length > 0 && (
   <Image src={image[0]} alt={name} height={120} width={500}/>
 )}
          <div className="px-4 py-3 w-[260px] xl:w-96">
          <span className="text-gray-400 mr-3 uppercase text-xs">{category}</span>
          <p className="text-lg font-bold text-black truncate block capitalize">{name}</p>
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

  </div></div>
  ))} 
</section> 
<div className="flex justify-center lg:ml-[350px] mt-[50px] lg:mt-[50px] ">
<div className="flex justify-between max-w-sm">
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
<footer className="py-10 mt-12 w-screen flex flex-col space-y-10 justify-center bg-gradient-to-r from-gray-100 via-[#FFBD59] to-gray-100">

  <nav className="flex justify-center flex-wrap gap-6 text-gray-500 font-medium">
      <Link className="text-black hover:text-gray-500" href="#">Home</Link>
      <Link className="text-black hover:text-gray-500" href="#">Products</Link>
      <Link className="text-black hover:text-gray-500" href="#">Services</Link>
      <Link className="text-black hover:text-gray-500" href="#">About</Link>
      <Link className="text-black hover:text-gray-500" href="#">Contact</Link>
  </nav>

  <div className="flex justify-center space-x-5">
      <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
      <Image src="/fblogo.webp" width={20} height={20} alt=""/>
     </Link>
    
  </div>
  <p className="text-center text-gray-700 font-medium">&copy; 2023 Minerva Sales Corporation. All rights reservered.</p>
</footer> 


  </>
  )
}

(Products as PageWithLayout).layout = HomePageLayout
export default Products
