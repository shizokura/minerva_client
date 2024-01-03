
import React, { FC, SyntheticEvent, useEffect, useState } from 'react'
import Head from 'next/head'
import { TbEdit, TbFile, TbFiles, TbShoppingBag, TbTrash, TbUsers } from 'react-icons/tb'
import { useRouter} from 'next/router'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { FormattedPrice, FormattedDate } from '@/helpers/index'
import { format } from 'date-fns'
import { Toaster, toast } from 'sonner'
import SideNavDash from '@/components/sideNavDash'
import styles from '@/styles/customer/customer.module.scss'
import HomePageLayout from '@/layout/homepagelayout'
import PageWithLayout from '@/layout/pagewithlayout'
import Link from 'next/link'
import Image from 'next/image'

const ViewOrdersPage: FC = ({}) => {

  const router = useRouter();
  
  const [ isOpen, setIsOpen ] = useState(false);
  const [ userId, setUserId ] = useState("")

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [ isOpen1, setIsOpen1 ] = useState(false);

  const toggleDropdown1 = () => {
    setIsOpen1(!isOpen1);
  };

  const [ ordersD, setOrdersD ] = useState<[]>()
  
  

  useEffect(() => {
    const cookies = Cookies.get("ecom_token")
    if (cookies) {
      const { userID }: any = jwtDecode(cookies)
      setUserId(userID)
    }
  }, [])

  const [ orders, setOrders ] = useState({
    orders: "",
    payment: "",
    total: "",
    createdAt: "",
    name: "",
    status: "",
    reason: "",
    proofPayment: "",
  })

  const [ orderID, setOrderID ] = useState("")

  const [ status, setStatus ] = useState("")
  const orderStatus =["Preparing Order", "Order Cancelled", "Ready for Pick-Up", "Order Completed"];

  const [ reason, setReason ] = useState("")


  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/order/getmyorders/${router.query.id}`, {
        method: "GET",      
        headers: { 'Content-Type': 'application/json' },
        cache: "default"
      })

      const result = await res.json();
      setOrdersD(result)
  }

    fetchData()
  }, [router, orders.total, ordersD])

  useEffect(() => {
    ordersD?.map(({ orderID, name, orders, payment, total, createdAt, User, status, Reason, proofPayment}: any) => {

      name === null ?
      
      User.map(({ profile }: any) => (
        setOrders({
          orders: orders,
          payment: payment,
          createdAt: createdAt,
          total,
          name: `${profile.firstname} ${profile.lastname}`,
          status: status,
          reason: Reason[0],
          proofPayment: proofPayment
        })

      )) : setOrders({
          orders: orders,
          payment: payment,
          createdAt: createdAt,
          total,
          name: name,
          status: status,
          reason: Reason[0]?.reason,
          proofPayment: proofPayment
      })
  })}, [ordersD])

  const [ selectedImage, setSelectedImage ] = useState<any>([])

  const onHandleImageUpload = (e: any) => {
    setSelectedImage(Array.from(e.target.files))
  }

  const promise = () => new Promise((resolve) => setTimeout(resolve, 5000));

  const UploadProof = async (e :any) => {
  
    e.preventDefault();
    const fd = new FormData();

    for(const image of selectedImage) {
      fd.append("file", image)
    }

    const response = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/order/uploadProofPayment/${router.query.id}`, {
      method: "PUT",  
      body: fd
    })

    if(!response.ok) 
    {
      toast.warning("Please complete all fields")
    }
   else {
          toast.promise(promise, {
          loading: 'Loading...',
          success: (products) => {
            return `Uploaded proof of payment successfully`;
          },
          error: 'Error',
        });
  }

  }

  

  const orderEditForm = async (e: SyntheticEvent) => {
    e.preventDefault();

    if(reason.length === 0) {
      const response = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/order/updateOrderStatus/${router.query.id}`, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: status,
        adminUserID: userId//get userId current login
      })
    })
    if(!response.ok) throw new Error("There is something error while updating")

    return response.json();

    } else {
      const response = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/order/updateOrderStatus/${router.query.id}`, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        reason: reason,
        status: status,
        adminUserID: userId//get userId current login
      })
    })
    if(!response.ok) throw new Error("There is something error while updating")

    return response.json();

    }

 
  }

  const handleGoBack = () => {
    // Trigger the router.back() function
    router.back();

    toast.promise(promise, {
      loading: 'Loading...',
      success: (productsD) => {
        return `Updated order status succesfully`;
      },
      error: 'Error',
    });
  }

console.log(router.query.id)
  return (
<>
    <div className={styles.bodyEditCustomer}>
    <Toaster richColors  />
<div className="h-screen pt-72 pl-52">
    <div className="flex w-[1500px] h-[750px] bg-gradient-to-r from-amber-200 to-yellow-500 flex-col bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="pt-10 md:pl-96 lt:pl-20 md:pt-[46px] sm:pl-28">
                    <div className="p-4 md:p-8">
                        <h1 className="text-black text-center font-bold pb-8 text-4xl md:text-5xl lg:text-6xl">View Order Status</h1>
                            <form encType='multipart/form-data' className="flex flex-col items-center">
                                    <div className="md:w-4/5 sm:w-60 lg:w-3/4 xl:w-2/3">
                                            
                                            <div className="flex flex-col md:flex-row gap-4">
                                                

                                                <label htmlFor="name" className="text-lg absolute mt-2.5 text-black font-bold px-1 rounded ">
                                                   Order ID
                                                </label>
                                                
                                                <input id="name" type="text"
                                                    className="mt-10 py-4 px-4 pb-4 rounded-md bg-gray-900 text-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-600"
                                                    placeholder="Input product name"
                                                    defaultValue={orders.orders} name="orders" disabled/>

                                            

                                           
                                            </div>

                                            <div className="flex flex-col md:flex-row gap-4">
                                                

                                                <label htmlFor="price" className="text-lg absolute mt-1.5 text-black font-bold px-1 rounded">
                                                   Date Ordered
                                                </label>
                                                
                                                <input id="price" type="text" name="price"
                                                    className="mt-10 py-4 px-4 rounded-md bg-gray-900 text-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-600"
                                                    placeholder="ex. 1000"
                                                    defaultValue={orders.createdAt ? format(new Date(orders.createdAt), 'dd MMM yyyy') : ''}
                                                    disabled/>

                                                <label htmlFor="price" className="text-lg absolute mt-1.5 lt:ml-[420px] lg:ml-[520px] md:ml-[560px] sm:mt-28 lg:mt-2  text-black font-bold px-1 rounded">
                                                Payment Method
                                                </label>
                                                
                                                <input id="price" type="text" name="price"
                                                    className="mt-10 py-4 px-4 rounded-md bg-gray-900 text-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-600"
                                                    placeholder="ex. 1000"
                                                    defaultValue={orders.payment} disabled />

                                           
                                            </div>

                                            <div className="flex flex-col md:flex-row gap-4">
                                                
                                                <label htmlFor="price" className="text-lg absolute mt-[100px] sm:mt-2 xl:mt-2 text-black font-bold px-1 rounded">
                                                Amount
                                                </label>
                                                
                                                <input id="price" type="text" name="price"
                                                    className="mt-10 py-4 px-4 rounded-md bg-gray-900 text-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-600"
                                                    placeholder="ex. 1000"
                                                    defaultValue={isFinite(parseFloat((orders.total))) ? FormattedPrice(parseFloat(orders.total)) : ''} disabled/>
                                                                                        
                                                <label htmlFor="price" className="text-lg absolute mt-[100px] lg:ml-[520px] sm:mt-2 xl:mt-2 text-black font-bold px-1 rounded">
                                                Status
                                                </label>
                                                
                                                <input id="price" type="text" name="price"
                                                    className="mt-10  w-full py-4 px-4 rounded-md bg-gray-900 text-gray-300 outline-none focus:ring-2 focus:ring-blue-600"
                                                    placeholder="ex. 1000"
                                                    defaultValue={orders.status} disabled/>
                                                                                        {/* <div>
                      <label htmlFor="lastName" className="text-lg absolute mt-1.5 text-black font-bold px-1 rounded">Order Status </label>
                      <button name="status"type="button" className="inline-flex justify-center sm:mr-2 lg:mr-[365px] w-[180px] rounded-md border border-gray-700 shadow-sm mt-10 px-4 py-2 bg-gray-900 text-md font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                        onClick={toggleDropdown}
                      >
                       {status === "" ? "Set Order Status" : status}
                       
                        <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 011.414 0 1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                      </button>
                    </div> */}
                    
                    <div className={`w-full mt-[80px] ml-[555px] flex flex-col bg-gray-900 text-md font-medium text-white rounded-md shadow-lg p-4 ${isOpen ? 'xl:w-[190px] sm:w-40 sm:top-[655px] sm:left-[-395px] absolute lg:left-[680px] lg:w-40 lg:top-[380px] z-20' : 'hidden'}`}>
                    {isOpen ? (
 orderStatus.map((name) => (
    <button
      name="status"
      className='text-left'
      type="button"
      key={name}
      value={name}
      onClick={(e) => setStatus(e.currentTarget.value)}
    >
      {name}
    </button>
  ))
) : null}
</div>


</div>
                                            </div>

                                            { orders.payment === "GCASH" || orders.payment === "MAYA" || orders.payment === "BANK" ?   <div className='flex flex-col mt-4 sm:ml-24'> 
      
                                                <label className="text-lg ml-44 absolute mt-2 text-black font-bold px-1 rounded" htmlFor="file_input">
                                                  Upload Proof of Payment</label>
                                                                <div className='ml-60'>
                                                                <input name="file" className="mt-12 block -ml-16 w-60 text-sm text-gray-900 border border-gray-300 rounded-sm cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none" id="file_input" type="file" accept='image/*'  multiple onChange={onHandleImageUpload}/>
                                                                <p className="mt-2 ml-2 text-sm text-gray-900 dark:text-gray-800" id="file_input_help">PNG, JPG, or JPEG</p>
                                                                </div>
                                                               </div>
                                                                : null}


                                          { orders.status === "Order Cancelled" ?   <div className="absolute bottom-[325px] left-[490px] my-4 flex flex-row">
                                                
                                                
                                        
                                                <label htmlFor="price" className="text-lg absolute mt-1.5 text-black font-bold px-1 rounded">
                                                   Reason for Cancellation
                                                </label>
                                                
                                                <textarea id="reason" name="reason"
                                                    className="w-[495px] h-40 mt-10 py-4 px-4 rounded-md bg-gray-900 text-gray-300 outline-none focus:ring-2 focus:ring-blue-600"
                                                    placeholder="N/A"
                                                    defaultValue={orders.reason}
                                                  
                                                    />

                                    

                                            
</div>
 : null}

                                <button
                                    onClick={UploadProof} className="border-2 text-md font-bold mt-28 rounded-md py-2 px-4 bg-[#FFBD59] shadow-md shadow-black hover:bg-yellow-500 text-gray-900 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-900">
                                    Upload Proof of Payment
                                </button>
                            </form>
                            
                    </div>
                    </div>    
                    </div>
</div>
</div>
                       <section className="absolute top-[850px] w-full mt-10 flex flex-col items-center justify-center text-center text-white ">
             <footer className="py-10 w-full 12:mt-12 flex flex-col space-y-10 justify-center bg-gradient-to-r from-[#FFBD59] via-gray-100 to-[#FFBD59]">
   
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
   
             </section>


</>

  )
}

(ViewOrdersPage as PageWithLayout).layout = HomePageLayout
export default ViewOrdersPage