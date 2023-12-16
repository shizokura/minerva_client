import HomePageLayout from '@/layout/homepagelayout'
import PageWithLayout from '@/layout/pagewithlayout'
import React, { FC, SyntheticEvent, useEffect, useState } from 'react'
import PaymentModal from '@/components/PaymentModal';
import { FormattedPrice } from '@/helpers/index'
import Image from 'next/image'
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie'
import { useRouter } from 'next/router';
import { Toaster, toast } from 'sonner'
import { HiInformationCircle } from "react-icons/hi";
import { IoMailUnread } from 'react-icons/io5';
import { GiCardPickup } from "react-icons/gi";
import { IoIosCash } from "react-icons/io";
import { FaRegCreditCard } from "react-icons/fa";
import Gcash from "./gcashlogi.webp"
import Link from 'next/link';

const Checkout: FC = () => {

    const payments = [
        { name: "Pay via GCASH", value: "GCASH", },
        { name: "Pay via Maya", value: "MAYA" },
        { name: "Pay Upon Pick Up - Cash", value: "CASH" },
        { name: "Pay Upon Pick Up - Card", value: "CARD" },
        { name: "Pay via Bank Transfer - Chinabank", value: "BANK" }

    ]

    const [ paymenthod, setPaymethod ] = useState("")
    const [ isModalOpen, setIsModalOpen ] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

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

    console.log(cookies)

    useEffect(() => {
        const dataProducts = JSON.parse(localStorage.getItem("products") as any)
        if (dataProducts) {
            setProducts(dataProducts as any)
        }
    }, [ cookies ])

    const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));

    const onHandlePlaceOrder = async (e: SyntheticEvent) => {
        e.preventDefault();


        if (!cookies) {
            toast.warning(`Please login first to checkout products.`)
            return;
        }
    
        products?.map(async ({ productID, quantity }: any) => {
    
    
            const res = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/order/createOrders`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productID: productID, quantity, userID: cookies, payment: paymenthod })
            })
            if (!res.ok) {
                throw new Error("There's something wrong in placing order")
            }
            localStorage.removeItem("products")
            return res.json();
    
    
        })
    
    
    
    
    }

    const handleGoBack = () => {
        // Trigger the router.back() function
        router.push("/");

        toast.promise(promise, {
            loading: 'Loading...',
            success: (productsD) => {
                return `Order created. Please check your email for further details.`;
            },
            error: 'Error',
        });
    }



    return (

        <div className='mt-20 lg:mt-36'>
        <PaymentModal isOpen={isModalOpen} onClose={handleCloseModal}>
                                        <div className="bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 overflow-y-auto max-h-[80vh] max-w-3xl mx-auto">
                        <div className="p-4 sm:p-7 " >
                            <div className="text-center">
                            <h1 className="pl-4 flex gap-2 text-2xl font-bold text-gray-800 dark:text-white">Payment Information <HiInformationCircle size="30px" /></h1>
                            </div>
        
                            <div className="mt-5 flex flex-col justify-center items-left">
                            <div className="text">
                            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Pay Upon Pickup - Card</h1>
                            </div>
                            <p className="pt-1 text-center divide-x divide-gray-300 dark:divide-gray-700 text-white">
                                Pay your order in shop. Just present your order form to the counter and settle your payment using any debit or credit card
                            </p>
        
                            <hr className="my-5 border-t border-gray-300 dark:border-gray-700" />
        
                            <div className="text">
                            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Pay Upon Pickup - Cash</h1>
                            </div>
                            <p className="pt-1 text-center divide-x divide-gray-300 dark:divide-gray-700 text-white">
                            Pay your order in shop. Just present your order form to the counter and settle your payment using cash.
                            </p>
        
                            <hr className="my-5 border-t border-gray-300 dark:border-gray-700" />
        
                            <div className="text">
                            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Pay via Maya</h1>
                            </div>
                            <p className="pt-1 text-center divide-x divide-gray-300 dark:divide-gray-700 text-white pb-8">
                                You may pay prior pickup using Maya. Scan the QR code or enter the account number and wait for the acknowledgement receipt in your email. Kindly screenshot or keep any proof of payment that you may present for any inquiries.
                            </p>
        
                            <Image src="/mayapayment.jpg" width={20} height={20}  alt=""/>
        
                            <hr className="my-5 border-t border-gray-300 dark:border-gray-700" />
        
                            <div className="text">
                            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Pay via Gcash</h1>
                            </div>
                            <p className="pt-1 text-center divide-x divide-gray-300 dark:divide-gray-700 text-white pb-8">
                                You may pay prior pickup using Gcash. Scan the QR code or enter the account number and wait for the acknowledgement receipt in your email. Kindly screenshot or keep any proof of payment that you may present for any inquiries.
                            </p>
        
                            <Image src="/gcashpayment.jpg" width={20} height={20} alt = ""/>
        
                            <hr className="my-5 border-t border-gray-300 dark:border-gray-700" />
        
                            <div className="text">
                            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                                Pay via Bank Transfer (Chinabank)
                            </h1>
                            </div>
                            <p className="pt-1 text-center divide-x divide-gray-300 dark:divide-gray-700 text-white">
                            You may pay prior to pickup via Bank Transfer. The only available bank partner right now is Chinabank. Kindly see the deposit details below. After payment, keep any proof of payment and present the acknowledgement receipt in your email upon pickup.
                            </p>
                            <div className="mt-3">
                            <p className="mb-1  text-white ">Bank: CHINA BANKING CORPORATION</p>
                            <p className="mb-1  text-white">Acct Name: MINERVA SALES CORPORATION</p>
                            <p className=" text-white">Acct No.: 1266 000 00 660</p>
                            </div>
                            
                            </div>
                        </div>
                        </div>
              </PaymentModal>
        
                            <div className="flex flex-col items-center bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
                           
                            </div>
                            <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
                            <div className="px-4 pt-8">
                                <p className="text-xl font-medium">Order Summary</p>
                                <p className="text-gray-400">Check your items and select a suitable payment method.</p>
                                <div className="h-[350px] mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6 overflow-y-auto">
                                {
                        products?.map(({ id,  name, category, total, quantity, image, price}: any) => (
                                <div key={name} className="flex flex-col rounded-lg bg-white sm:flex-row">
                                    <div className="mt-4 h-24 w-28 rounded-md border object-cover object-center">
                                    {image.length > 0 && (
                                        <Image src={image[1]} alt={name} height={150} width={150}/>
                                      )}     
                                    </div>
                                    <div className="flex w-full flex-col px-4 py-4">
                                    <span className="font-semibold">{name}</span>
                                    <span className="float-right text-gray-400">{category}</span>
                                    <p className="text-lg font-bold">{FormattedPrice(price)}</p>
                                    </div>
                                </div>
                                            ))
                                        } 
        
                                </div>
        
                                <p className="mt-8 text-lg font-medium">Delivery Options</p>
                                <form className="mt-5 grid gap-6">
                                <div className="relative">
                                    <input className="peer hidden" id="radio_1" type="radio" name="radio" checked />
                                    <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                                    <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_1">
                                    <div className="w-14 object-contain">
                                        <GiCardPickup size={60}/>
                                    </div>
                                    <div className="ml-5">
                                        <span className="mt-2 font-semibold">Pickup Only</span>
        
                                    </div>
                                    </label>
                                </div>
                                </form>
                            </div>
                            <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                                <p className="text-xl font-medium">Payment Details  <button onClick={handleOpenModal} className='w-6'><HiInformationCircle size="20px" /></button></p>
                                <p className="text-gray-400">Choose your preferred payment method. Click the icon above for more information.</p>
                                <div className="">
                                <form onSubmit={onHandlePlaceOrder} className="mt-5 grid gap-6">
                                                {payments.map(({ name, value, icons } : any ) => (
                                                    <button key={name} value={value} onChange={(e) => setPaymethod(e.currentTarget.value)} className="flex items-center justify-between w-full bg-white rounded-md border-2 border-gray-200 p-4 focus:outline-none">
                                                        <label className="flex items-center">
                                                        <input required type="radio" className="form-radio h-5 w-5 text-yellow-600" name="paymentMethod" />
                                                        <span className="ml-2 text-sm text-gray-700">{name}</span>
                                    
                                                        </label>
                                                    </button>
                                                ))}
                                                                        <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium text-gray-900">Total</p>
                                                <p className="text-2xl font-semibold text-gray-900">{FormattedPrice(products?.reduce((a: any, b: any) => (a + b?.total), 0) as any)}</p>
                                            </div>
                                                
                                                                        <button className="mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">Place Order</button>
                                </form>
        
                                            </div>
                                {/* {payments.map(({ name, value, icons } : any ) => (
                                <div className="relative">
                                    <button value={value} onChange={(e) => setPaymethod(e.currentTarget.value)} className="flex items-center justify-between w-full bg-white rounded-md border-2 border-gray-200 p-4 focus:outline-none">
                                    <input className="peer hidden" id="radio_1" type="radio" name="paymentMethod"  />
                                    
                                    <span className="form-radio text-yellow-600 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                                    <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_1">
                                    <div className="w-14 object-contain">
                                    {icons}
                                    </div>
                                    <div className="ml-5">
                                        <span className="mt-2 font-semibold">{name}</span>
        
                                    </div>
                                    </label>
                                    </button>
                                </div>
                                
                                ))} */}
        
                                
        
                    
                                            
        
                            </div>
                            </div>
        
                    <footer className="py-10 mt-2 lg:mt-[90px] w-screen flex flex-col space-y-10 justify-center bg-gradient-to-r from-[#FFBD59] via-gray-100 to-[#FFBD59]">
        
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
         <Toaster richColors  />
        </div>
    )

}

(Checkout as PageWithLayout).layout = HomePageLayout
export default Checkout