import styles from '@/styles/admin/content.module.scss'
import AdminPageLayout from '@/layout/adminpagelayout'
import PageWithLayout from '@/layout/pagewithlayout'
import React, { FC, SyntheticEvent, useEffect, useState } from 'react'
import Head from 'next/head'
import { TbEdit, TbFile, TbFiles, TbShoppingBag, TbTrash, TbUsers } from 'react-icons/tb'
import { useRouter} from 'next/router'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { FormattedPrice, FormattedDate } from '@/helpers/index'
import { format } from 'date-fns'
import { Toaster, toast } from 'sonner'

const EditOrdersPage: FC = ({}) => {

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
  
  const [ status, setStatus ] = useState("")
  const orderStatus =["Preparing Order", "Order Cancelled", "Ready for Pick-Up"];

  useEffect(() => {
    const cookies = Cookies.get("ecom_token")
    if (cookies) {
      const { userID }: any = jwtDecode(cookies)
      setUserId(userID)
    }
  }, [])

  const [ orders, setOrders ] = useState({
    orders: "",
    status: "",
    payment: "",
    total: "",
    createdAt: "",
  })

  const [ selectedImage, setSelectedImage ] = useState<any>([])

  const onHandleImageUpload = (e: any) => {
    setSelectedImage(Array.from(e.target.files))
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/order/getmyorders/${router.query.id}`, {
        method: "GET",      
        headers: { 'Content-Type': 'application/json' },
        cache: "default"
      })

      const result = await res.json();
      setOrdersD(result)

      if (result && result.length > 0) {
        setStatus(result[0].status);
    }
  }

    fetchData()
  }, [router, orders.total])

  const [ users, setUsers ] = useState<[]>()
  const [ productStatus, setProductStatus ] = useState('');
  const [ orderID, setOrderID ] = useState('');

  useEffect(() => {
    console.log(ordersD)
    ordersD?.map(({ orderID, orders, status, payment, total, createdAt, }: any) => {
      setOrders({
        orders: orders,
        status: status,
        payment: payment,
        createdAt: createdAt,
        total
      })

    })
  }, [ordersD])

  const promise = () => new Promise((resolve) => setTimeout(resolve, 5000));

  const orderEditForm = async (e: SyntheticEvent) => {
    e.preventDefault();

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

  return (

    <div>
      <Head>
        <title>Edit Order</title>
      </Head>
      <Toaster richColors  />
      <div className={styles.titleHead}>
        <div className={styles.icon}><TbShoppingBag size={50} /></div>
        Orders
      </div>

      <div className={styles.container}>
        <div className={styles.title}>Edit Details</div>
        <div className={styles.divider}></div>

        <div className="flex lg:flex-row flex-col items-center py-6 px-4">

          <div className="w-full mx-28 my-20">

            <div className=" w-full mx-auto">

              <form onSubmit={orderEditForm} className='grid grid-cols-1 md:grid-cols-2 gap-16'>
                <div className="mb-6">
                  <label htmlFor="Order ID" className="text-sm font-medium text-gray-900 block mb-2">Order ID</label>
                  <input type="text" id="Order ID" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" defaultValue={orders.orders} name="orders" disabled />
                </div>
                <div className="mb-6">
                  <label htmlFor="customerName" className="text-sm font-medium text-gray-900 block mb-2">Customer Name</label>
                  <input type="text" id="customerName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value='John Doe' disabled />
                </div>

                <div className="mb-6">
                  <label htmlFor="date" className="text-sm font-medium text-gray-900 block mb-2">Date Ordered</label>
                  <input type="text" id="date" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                   defaultValue={orders.createdAt ? format(new Date(orders.createdAt), 'dd MMM yyyy') : ''}disabled />
                </div>

                <div className="mb-6">
                  <label htmlFor="payment" className="text-sm font-medium text-gray-900 block mb-2">Payment Method</label>
                  <input type="text" id="payment" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" defaultValue={orders.payment} disabled />
                </div>

                <div className="mb-6">
                  <label htmlFor="amount" className="text-sm font-medium text-gray-900 block mb-2">Amount</label>
                  <input type="text" id="amount" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                  defaultValue={isFinite(parseFloat((orders.total))) ? FormattedPrice(parseFloat(orders.total)) : ''} disabled />
                </div>

                <div className="mb-6">
                  <div className="relative inline-block text-left">
                    <div>
                      <label htmlFor="status" className="text-sm font-medium text-gray-900 block mb-2">Order Status</label>
                      <button type="button" className="w-[180px] inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                        onClick={toggleDropdown}
                      >
                        {status === "" ? "Set Order Status" : status}

                        <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 011.414 0 1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    <div className={`w-full flex flex-col rounded-md shadow-lg bg-primary-100 p-4 text-primary-600 ${isOpen ? 'absolute z-50' : 'hidden'}`}>
  {isOpen ? (
    orderStatus.map((name) => (
      <button
        name="status"
        className='text-right'
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

                <button type="submit" onClick={handleGoBack} className="relative top-20 left-80 text-black bg-[#FFBD59] hover:bg-[#FFBD59] focus:ring-yellow-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" >Update Order Details</button>
              </form>
            </div>

          </div>

        </div>
      </div>
    </div>

  )
}



(EditOrdersPage as PageWithLayout).layout = AdminPageLayout
export default EditOrdersPage