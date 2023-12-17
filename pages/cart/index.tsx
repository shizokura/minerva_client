import HomePageLayout from '@/layout/homepagelayout'
import PageWithLayout from '@/layout/pagewithlayout'
import React, { FC, useState, useEffect, SyntheticEvent } from 'react'
import styles from '@/styles/customer/customer.module.scss'
import router from 'next/router'
import { useLocalStorageValue } from '@react-hookz/web'
import { FormattedPrice } from '@/helpers/index'
import Image from 'next/image'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Cart: FC = () => {

  const [ products, setProducts ] = useState<[]>()
  const [ cookies, setCookies ] = useState("");
  const router = useRouter();

  useEffect(() => {
    const cookies = Cookies.get("ecom_token");
    if (cookies) {
      const { userID }: any = jwtDecode(cookies)
      setCookies(userID)
    }
  }, [ cookies ])

  useEffect(() => {
    const dataProducts = JSON.parse(localStorage.getItem("products") as any)
    if (dataProducts) {
      setProducts(dataProducts as any)
    }
  }, [])


  return (
    <div className={styles.bodyCart}>

<section className="h-screen py-12 sm:py-16 lg:py-20">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-40 flex items-center justify-center">
            <h1 className="mt-20 lg:mt-6 lg:ml-12 text-2xl font-semibold text-white">Your Cart</h1>
          </div>

    <div className="absolute left-4 ml-4 lt:left-[220px] lg:top-[190px] lg:left-[600px] mx-auto mt-8 max-w-md md:mt-12">
      <div className="w-80 mt-2 h-[600px] sm:h-[700px] 12:h-[680px] lt:w-[900px] lt:h-[500px] sm:w-[350px] lg:h-[920px] lg:w-[700px] lg:mt-20 rounded-3xl bg-white shadow-lg">
      

        <div className="overflow-y-auto xs:h-[410px] lt:h-[300px]  12:h-[500px] sm:h-[420px] lg:h-[700px] px-4 py-6 sm:px-8 sm:py-10 rounded-3xl">
    

{
                products?.map(({ productID,  name, category, total, quantity, image, price}: any) => (
                  
                  <div key = {productID} className=" flow-root">
                    {/* <button
                                        className="absolute top-4 -right-56 bg-red-500 text-white font-semibold py-2 px-4 rounded-2xl hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-red-800">
  Clear Cart
</button> */}
                    <div className=" my-2">
                      
                          <div className=" flex  flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                                <div className="shrink-0 relative">
                                  <span className="absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow sm:-top-2 sm:-right-2">{quantity}</span>
                                  {image.length > 0 && (
                                <Image src={image[1]} alt={name} height={120} width={120}/>
                              )}                       
                             </div>
        
                                <div className="relative flex flex-1 flex-col justify-between">
                                        <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                                            <div className="pr-8 sm:pr-5">
                                              <p className="text-base font-semibold text-gray-900">{name}</p>
                                              <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">{category}</p>
                                            </div>
                      
                                            <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                              <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">{FormattedPrice(price)}</p>
                                            </div>
                                      </div>
                  
                                        <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                                          <button
                                          onClick={() => {
                                            
                                                const removeItem =  products?.filter((a: any) => a.productID !== productID )
                                                setProducts(removeItem as any)
                                                localStorage.setItem('products', JSON.stringify(removeItem));
                                              
                                          } 
                                        }
                                          type="button" className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900">
                                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" className=""></path>
                                            </svg>
                                          </button>
                                        </div>
                              </div>
                        </div>
                        
                    </div>
                  </div>
                ))
        } 
           
           
          </div>
          <div className='pl-12 pr-12 pb-12'>
          <hr className="mx-0 lt:mt-10 xs:mt-[50px] mt-[-120px] sm:mt-[120px] 12:mt-[40px]  lg:mt-6 mb-0 h-0 border-r-0 border-b-0 border-l-0 border-t border-solid border-gray-300" /> 
          <div className="lg:mt-6 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Total</p>
            <p className="text-2xl font-semibold text-gray-900">
              {FormattedPrice(products?.reduce((a: any, b: any) => (a + b.total), 0))}
            </p>
          </div>

          <div className="mt-6 text-center">
       
                  <button 
                  onClick={() => router.push("/checkout")}
                  type="button" className="group inline-flex w-full items-center justify-center rounded-md bg-orange-500 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
                    Checkout
                    <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:ml-8 ml-4 h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                  </div>
        </div>

      </div>
    </div>
      </div>
    </section>
       
    <footer className="py-10 mt-80 lt:mt-[300px] lg:mt-[404px] w-screen flex flex-col space-y-10 justify-center bg-gradient-to-r from-[#FFBD59] via-gray-100 to-[#FFBD59]">

    <nav className="flex justify-center flex-wrap gap-6 text-gray-500 font-medium">
    <Link className="text-black hover:text-gray-500" href="/">Home</Link>
    <Link className="text-black hover:text-gray-500" href="/product">Products</Link>
    <Link className="text-black hover:text-gray-500" href="/services">Services</Link>
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

(Cart as PageWithLayout).layout = HomePageLayout
export default Cart