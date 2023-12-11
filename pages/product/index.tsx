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
    { name: "Tires", icon: <GiCarWheel size="40px" />, value: "Tire" },
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
  }, [ category, filterProducts, page, productCategory ])

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
    <div className={styles.bodyProductPage}>
      <section className="relative h-screen flex flex-col items-center justify-center text-center text-white ">
        <div className='absolute top-[200px] left-[310px]'>
          <button type="button" className="inline-flex justify-center w-[150px] rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
            onClick={toggleDropdown}
          >

            Price Filters

            <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 011.414 0 1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        <div className={`bg-white flex flex-col rounded-md shadow-lg bg-primary-100 p-4 text-black ${isOpen ? 'w-[160px] absolute top-[240px] left-[300px] z-10' : 'hidden'}`}>
          {isOpen ? (
            filtersOptions.map(({ name, value }) => (
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
        <div className="absolute top-[250px] left-20 max-w-2xl mx-auto">

          <aside className="absolute opacity-80 w-96" aria-label="Sidebar">

            <div className={styles.category}>
              <div className="absolute top-12 left-8 flex items-center w-80 mx-auto bg-white border-2 border-black rounded-md " x-data="{ search: '' }">
                <div className="w-full">

                  <input type="search" className="w-full px-4 py-1 text-gray-800 rounded-lg focus:outline-none "
                    placeholder="search" onChange={(e) => setSearch(e.target.value)} />
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
              <div className="px-20 py-8 overflow-y-auto rounded-2xl bg-[#FFBD59]">
                <div className="pt-16 space-y-2">
                  {productCategoryLInk.map(({ name, icon, value }: any) => (
                    <div key={name} className='mt-16 justify-center h-20 '>

                      <button value={value} onClick={(e) => setCategory(e.currentTarget.value)} className=" text-black font-semibold hover:bg-white hover:px-16 hover:w-full flex items-center align-center justify-center gap-5 ml-3 text-2xl">
                        {icon}
                        <span>
                          {name}
                        </span></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

        </div>
        <div className="absolute top-[120px] ml-60 left-96 grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {search ? productSearch?.map(({ productID, name, category, price, stock, image, description, quantity }: any) => (
            <div key={productID} onClick={() => handleClick(productID)}>
              <div className="mx-auto mt-2 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-[#FFBD59] shadow-md duration-300 hover:scale-105 hover:shadow-lg">
                {image.length > 0 && (
                  <Image src={image[ 0 ]} alt={name} height={120} width={320} />
                )}
                <div className="p-4">

                  <h2 className="mb-2 text-lg font-medium dark:text-black text-gray-900">{name}</h2>

                  <p className="text-sm mb-2 dark:text-black text-black">{description}</p>
                  <div className="flex items-center">
                    <p className="mr-2 text-lg font-bold flex text-black dark:text-black">{FormattedPrice(price)} </p>
                  </div>
                </div>
                <button

                  className="absolute bottom-0 right-0 mx-2 my-2 px-4 py-2 transition ease-in duration-200 uppercase rounded-full text-black font-bold hover:bg-black hover:text-white border-2 border-gray-900 focus:outline-none"><IoIosEye size="18px" /></button>

              </div>

            </div>
          )) : category ? productCategory?.map(({ productID, name, category, price, stock, image, description, quantity }: any) => (
            <div key={productID} onClick={() => handleClick(productID)}>
              <div className="mx-auto mt-2 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-[#FFBD59] shadow-md duration-300 hover:scale-105 hover:shadow-lg">
                {image.length > 0 && (
                  <Image src={image[ 0 ]} alt={name} height={120} width={320} />
                )}
                <div className="p-4">

                  <h2 className="mb-2 text-lg font-medium dark:text-black text-gray-900">{name}</h2>

                  <p className="text-sm mb-2 dark:text-black text-black">{description}</p>
                  <div className="flex items-center">
                    <p className="mr-2 text-lg font-bold flex text-black dark:text-black">{FormattedPrice(price)} </p>
                  </div>
                </div>
                <button

                  className="absolute bottom-0 right-0 mx-2 my-2 px-4 py-2 transition ease-in duration-200 uppercase rounded-full text-black font-bold hover:bg-black hover:text-white border-2 border-gray-900 focus:outline-none"><IoIosEye size="18px" /></button>

              </div>

            </div>
          )) :
            products?.map(({ userId, id, productID, name, category, price, stock, image, description, quantity }: any) => (
              <div key={productID} onClick={() => handleClick(productID)}>
                <div className="mx-auto mt-2 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-[#FFBD59] shadow-md duration-300 hover:scale-105 hover:shadow-lg">
                  {image.length > 0 && (
                    <Image src={image[ 0 ]} alt={name} height={120} width={320} />
                  )}
                  <div className="p-4">

                    <h2 className="mb-2 text-lg font-medium dark:text-black text-gray-900">{name}</h2>

                    <p className="text-sm mb-2 dark:text-black text-black">{description}</p>
                    <div className="flex items-center">
                      <p className="mr-2 text-lg font-bold flex text-black dark:text-black">{FormattedPrice(price)} </p>
                    </div>
                  </div>
                  <button

                    className="absolute bottom-0 right-0 mx-2 my-2 px-4 py-2 transition ease-in duration-200 uppercase rounded-full text-black font-bold hover:bg-black hover:text-white border-2 border-gray-900 focus:outline-none"><IoIosEye size="18px" /></button>

                </div>

              </div>
            ))}


          {/* Pagination section */}
          <div className={styles.pagination}>
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


      </section>

      {/*  */}
      <section className="relative top-[200px] flex flex-col items-center justify-center text-center text-white ">
        <footer className="h-62 bg-gradient-to-r w-full from-gray-100 via-[#FFBD59] to-gray-100">
          <div className="max-w-screen-xl mt-2 px-2 py-8 mx-auto sm:px-6 lg:px-8">
            <div className="relative top-4 grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div>
                <img src="/logo.png" className="mr-5 h-6 sm:h-6" alt="logo" />
                <p className="max-w-xs mt-4 text-sm text-gray-600">
                  Let us make your trips more comfortable and safe. Leave the worries behind and let{"'"}s begin our journey!
                </p>
                <div className="flex mt-8 space-x-6 text-gray-600">
                  <Link href="https://www.facebook.com/MinervaSalesCorp" className="hover:opacity-75" target="_blank" rel="noreferrer">
                    <span className="sr-only"> Facebook </span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </Link>
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
                  </nav>
                </div>
                <div>
                  <p className="font-medium text-black">
                    Legal
                  </p>
                  <nav className="flex flex-col mt-1 space-y-1 text-sm text-black">
                    <Link href="" className="hover:opacity-75" > Terms &amp; Conditions </Link>
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

(Products as PageWithLayout).layout = HomePageLayout
export default Products
