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

        <div className="h-screen pt-24 pb-28 grid grid-cols-3">

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

                            <img src="/mayapayment.jpg"></img>

                            <hr className="my-5 border-t border-gray-300 dark:border-gray-700" />

                            <div className="text">
                                <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Pay via Gcash</h1>
                            </div>
                            <p className="pt-1 text-center divide-x divide-gray-300 dark:divide-gray-700 text-white pb-8">
                                You may pay prior pickup using Gcash. Scan the QR code or enter the account number and wait for the acknowledgement receipt in your email. Kindly screenshot or keep any proof of payment that you may present for any inquiries.
                            </p>

                            <img src="/gcashpayment.jpg"></img>

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

            <div className="lg:col-span-2 col-span-3 bg-indigo-50 space-y-8 px-12">
                <div className="mt-8 p-4 relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md">
                    <div className="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
                        <div className="text-yellow-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 sm:w-5 h-6 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="text-sm font-medium ml-3">Checkout</div>
                    </div>
                    <div className="text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4">Complete your shipping and payment details below.</div>
                    <div className="absolute sm:relative sm:top-auto sm:right-auto ml-auto right-4 top-4 text-gray-400 hover:text-gray-800 cursor-pointer">
                    </div>
                </div>
                <div className="rounded-md">
                    <form onSubmit={onHandlePlaceOrder}>
                        <section>
                            <div className="mt-6">
                                <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">Delivery Option</h2>
                                <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
                                    <button className="flex items-center justify-between w-full bg-white rounded-md border-2 border-gray-200 p-4 focus:outline-none">
                                        <label className="flex items-center">
                                            <input type="radio" className="form-radio h-5 w-5 text-yellow-600" checked /><span className="ml-2 text-sm text-gray-700">Pickup</span>
                                        </label>
                                    </button>
                                </fieldset>
                            </div>
                        </section>
                        <section>
                            <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">Payment Information <span className='pl-8 text-sm text-gray-400'> (Click here for more information) </span></h2>
                            <div className='absolute top-[315px] left-[270px]'>
                                <button onClick={handleOpenModal}><HiInformationCircle size="30px" /></button>
                            </div>
                            <fieldset className=" bg-white shadow-lg rounded text-gray-600">
                                {payments.map(({ name, value, icons }: any) => (
                                    <button key={name} value={value} onChange={(e) => setPaymethod(e.currentTarget.value)} className="flex items-center justify-between w-full bg-white rounded-md border-2 border-gray-200 p-4 focus:outline-none">
                                        <label className="flex items-center">
                                            <input type="radio" className="form-radio h-5 w-5 text-yellow-600" name="paymentMethod" />
                                            <span className="ml-2 text-sm text-gray-700">{name}</span>

                                        </label>
                                    </button>
                                ))}




                            </fieldset>


                        </section>
                        <button onClick={handleGoBack} type="submit" className="relative top-56 submit-button px-4 py-3 rounded-full bg-[#FFBD59] text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors">
                            Place Order Now
                        </button>
                    </form>
                </div>
                <div className=" rounded-md">

                </div>

            </div>


            <div className="overflow-y-auto col-span-1 bg-white lg:block hidden">
                <h1 className="py-6 border-b-2 text-xl text-gray-600 px-8">Order Summary</h1>
                {
                    products?.map(({ id, name, category, total, quantity, image, price }: any) => (
                        <ul key={id} className=" py-6 border-b space-y-6 px-8">
                            <li className=" grid grid-cols-6 gap-2 border-b-1">

                                <div className="col-span-1 self-center">
                                    {image.length > 0 && (
                                        <Image src={image[ 1 ]} alt={name} height={120} width={120} />
                                    )}
                                </div>
                                <div className="flex flex-col col-span-3 pt-2">
                                    <span className="text-gray-600 text-md font-semi-bold">{name}</span>
                                    <span className="text-gray-400 text-sm inline-block pt-2">{category}</span>
                                </div>
                                <div className="col-span-2 pt-3">
                                    <div className="flex items-center space-x-2 text-sm justify-between">
                                        <span className="text-gray-400">{quantity}</span>
                                        <span className="text-yellow-400 font-semibold inline-block">{FormattedPrice(price)}</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    ))
                }
                <div className="px-8 border-b">
                </div>

            </div>
            <div className="absolute bottom-0 right-0 font-semibold text-xl px-8 flex justify-between py-8 text-gray-600 gap-72 ">
                <span>Total</span>
                <span>{FormattedPrice(products?.reduce((a: any, b: any) => (a + b?.total), 0) as any)}</span>
            </div>
            <Toaster richColors />
        </div>
    )

}

(Checkout as PageWithLayout).layout = HomePageLayout
export default Checkout