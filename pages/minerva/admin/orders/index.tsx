import React, { FC, useState, useEffect, SyntheticEvent } from 'react'
import styles from '@/styles/admin/content.module.scss'
import Head from 'next/head'
import PageWithLayout from '@/layout/pagewithlayout'
import AdminPageLayout from '@/layout/adminpagelayout'
import router, { useRouter } from 'next/router'
import { TbEdit, TbShoppingBag, } from 'react-icons/tb'
import Modal from '@/components/Modal';
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
import { FormattedPrice, FormattedDate } from '@/helpers/index'
import { Toaster, toast } from 'sonner'

const Orders: FC = () => {

  const [ page, setPage ] = useState(0)

  const [ isModalOpen, setIsModalOpen ] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setTimeout(() => {
      setIsModalOpen(false);
    }, 5000);
  }

  const [ profile, setProfile ] = useState<[]>()
  const [ users, setUsers ] = useState<[]>()
  const [ orders, setOrders ] = useState<[]>()
  const [ userId, setUserId ] = useState("")


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/order/?skip=${page}&orderby=desc`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
        cache: "no-cache"
      })

      if (!response.ok) throw new Error("There is something wrong while fethcing")

      const result = await response.json();

      setOrders(result)
    }

    fetchData()
  }, [])

  const [ userid, setUserID ] = useState();
  const router = useRouter();


  useEffect(() => {
    const cookies = Cookies.get("ecom_token") as any
    const { userID }: any = jwtDecode(cookies) as any
    setUserId(userID)
  }, [ userId ])

  const onSubmitDeleteProduct = async (e: SyntheticEvent) => {
    e.preventDefault();

    const res = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/order/deleteProduct/${router.query.id}`, {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...orders, userID: userid,
      })
    })


    if (!res.ok) {
      alert("There something wrong while updating..")
    } else {
      alert("Successfully Deleted")
      router.push("/minerva/admin/product")
    }

    return res.json();
  }
  console.log(orders)


  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className=" bg-gray-800 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 sm:p-7 " >
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Confirm Delete</h1>
            </div>

            <div className="mt-5 flex flex-col justify-center items-center">
              <form>
                <div className="grid gap-y-4">
                  <p className="text-center divide-x divide-gray-300 dark:divide-gray-700 text-white">
                    Are you sure you want to delete this order?
                  </p>
                  <div className='flex gap-2'>
                    <button type="submit" className="py-3 px-4 flex w-40 justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-[#FFBD59] text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" onClick={() => router.push("/auth/changePassReqSuccess")}>Yes</button>
                    <button type="submit" className="py-3 px-4 w-40 flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-[#FFBD59] text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" onClick={handleCloseModal}>No</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>

      <Head>
        <title>Order</title>
      </Head>
      <div className={styles.titleHead}>
        <div className={styles.icon}><TbShoppingBag size={50} /></div>
        Orders
      </div>

      <div className={styles.container}>
        <div className={styles.title}>Orders List</div>
        <div className={styles.divider}></div>

        <div className={styles.tablecontainer}>
          <ul className={styles.responsiveTable}>
            <li className={styles.tableHeader}>
              <div className={styles.col1O}>ORDER ID</div>
              <div className={styles.col2O}>CUSTOMER NAME</div>
              <div className={styles.col3O}>DATE ORDERED</div>
              <div className={styles.col4O}>AMOUNT</div>
              <div className={styles.col5O}>PAYMENT</div>
              <div className={styles.col6O}>ORDER STATUS</div>
              <div className={styles.col7O}>ACTION</div>
            </li>


            {orders?.map(({ userID, orderID, orders, total, payment, status, createdAt, User }: any) => (
              User.map(({ profile }: any) => (
                <li key={orderID} className={styles.tableRow}>
                  <div className={styles.col1O} data-label="Order ID">{orders}</div>

                  <div className={styles.col2O} data-label="Customer Name"> {profile.firstname} {profile.lastname} </div>

                  <div className={styles.col3O} data-label="Date Ordered">{FormattedDate(createdAt)}</div>
                  <div className={styles.col4O} data-label="Amount">{FormattedPrice(total)}</div>
                  <div className={styles.col5O} data-label="Payment Method">{payment}</div>
                  <div className={styles.col6O} data-label="Order Status"><span>{status}</span></div>
                  <div className={styles.col7O} data-label="Action">
                    <button onClick={() => router.push(`/minerva/admin/orders/editorders/${orderID}`)} className={`${styles.col7} pl-4`}> <TbEdit size={25} /> </button>
                    {/* <button onClick={handleOpenModal} className={styles.col7}> <TbTrash size={25} /> </button> */}
                  </div>
                </li>
              ))
            ))}

          </ul>
        </div>

        <div className={styles.pagination}>
          <button disabled={page === 0} className=' bg-[#FFBD59] hover:bg-blue-700 text-white font-bold mx-4 py-2 px-4 rounded' onClick={() => setPage(() => page - 1)}>Prev</button>
          <button className='bg-[#FFBD59] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => setPage(() => page + 1)}>Next</button>
        </div>

      </div>
      <Toaster richColors />
    </div>

  )
}

(Orders as PageWithLayout).layout = AdminPageLayout
export default Orders