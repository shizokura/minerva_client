import AdminPageLayout from '@/layout/adminpagelayout'
import PageWithLayout from '@/layout/pagewithlayout'
import styles from '@/styles/admin/content.module.scss'
import Head from 'next/head'
import { TbEdit, TbTrash, TbUsers, TbFiles, TbCalendar, TbShoppingBag, TbClock, TbGraph, TbFileAnalytics, TbList, TbArchive, TbClipboard, TbMessage, TbSettings2, TbLogout2, TbArrowLeft, TbChevronLeft, TbChevronRight, TbHexagonPlus, TbHexagonMinus } from 'react-icons/tb'
import React, { FC, useState, useEffect, SyntheticEvent } from 'react'
import router, { useRouter } from 'next/router'
import Image from 'next/image'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { FormattedDate, FormattedPrice } from '@/helpers/index'
import Modal from '@/components/Modal';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster, toast } from 'sonner'

const Inventory: FC = () => {

  const router = useRouter();
  const [ productId, setProductId ] = useState("")

  const [ quantityToUpdate, setQuantityToUpdate ] = useState("");

  const [ isModalOpen, setIsModalOpen ] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [ page, setPage ] = useState(0)
  const [ quantity, setQuantity ] = useState("");

  const [ products, setProducts ] = useState<[]>()
  const [ userId, setUserId ] = useState("")

  const [ inventoryQ, setInventoryQ ] = useState({
    quantity: '',
  });

  useEffect(() => {
    const cookies = Cookies.get("ecom_token");
    if (cookies) {
      const { userID }: any = jwtDecode(cookies)
      setUserId(userID)
    }
  }, [ userId ])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/product/getAllProduct/?skip=${page}&orderby=desc`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
        cache: "no-cache"
      })

      if (!res.ok) {
        throw new Error("There something wrong while fetching data")
      }

      const result = await res.json();

      setProducts(result)

    }

    fetchData();
  }, [ products ])



  const formSubmitProductQuantity = async (e: SyntheticEvent) => {

    e.preventDefault();

    const response = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/product/updateProductQuantity/clpsbkvju00044szkftr76yh6`, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        quantity: quantityToUpdate,
        userID: userId,
      })
    });

    if (!response.ok) {
      alert("There was an error while updating");
    } else {
      toast.success('Customer Account has been deleted')
      // Close the modal after successful update
      setIsModalOpen(false);
    }

    return response.json()

  };

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className=" bg-gray-800 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 sm:p-7 " >
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Update Product Quantity</h1>
            </div>

            <div className="mt-5 flex flex-col justify-center items-center">

              <form>

                <div className="grid gap-y-4">


                  <div className="w-full gap-2">
                    <input
                      name='quantitytoUpdate'
                      type="text"
                      value={quantityToUpdate}
                      onChange={(e) => setQuantityToUpdate(e.target.value)}
                      placeholder="Input quantity"
                      className="py-3 px-4 w-full rounded-md border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-black"
                      required
                    />
                  </div>
                  <div className='flex align-center justify-center items-center gap-2'>
                    <button onSubmit={formSubmitProductQuantity}
                      type="submit"
                      className="py-3 px-4 w-30 flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-[#FFBD59] text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">Update</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
      <Head>
        <title>Inventory</title>
      </Head>
      <div className={styles.titleHead}>
        <div className={styles.icon}><TbClipboard size={50} /></div>
        Inventory
      </div>
      <div className={styles.container}>
        <div className={styles.title}>Inventory</div>
        <div className={styles.divider}></div>

        <div className={styles.tablecontainer}>
          <ul className={styles.responsiveTable}>
            <li className={styles.tableHeader}>
              <div className={styles.col1I}> ID</div>
              <div className={styles.col2I}> NAME</div>
              <div className={styles.col3I}> STATUS</div>
              <div className={styles.col4I}> QUANTITY</div>
              <div className={styles.col5I} >Updated AT</div>
              <div className={styles.col6I}> CATEGORY</div>
              <div className={styles.col7I}> PRICE</div>
              <div className={styles.col8I}>ACTION</div>
            </li>

            {products?.map(({ userId, id, productID, name, category, price, stock, image, description, quantity, updatedAt }: any) => (

              <li key={productID} className={styles.tableRow}>
                <div className={styles.col1I} data-label="Product Id">{id}</div>
                <div className={`${styles.col2I} ${styles.colInvName}`} data-label="Product Name">{name}</div>
                <div className={`${styles.col2I} ${styles.colInvStock}`} data-label="Status">{stock}</div>
                <div
                  className={`${styles.col4I} ${styles.colInvQ} ${quantity >= 10 ? styles.badgeSuccess : styles.badgeCancel}`}
                  data-label="Quantity"
                >{quantity}</div>
                <div className={`${styles.col5I} ${styles.colInvDate}`}>{FormattedDate(updatedAt)}</div>
                <div className={`${styles.col6I} ${styles.colInvCat}`} data-label="Category">{category}</div>
                <div className={`${styles.col7I} ${styles.colInvPrice}`} data-label="Price">{FormattedPrice(price)}</div>
                <div className={`${styles.col8I} ${styles.colInvAction}`} data-label="Action">
                  <div className="flex align-items-center">
                    <button onClick={() => router.push(`/minerva/admin/inventory/editinventory/${productID}`)} className={styles.col7}> <TbEdit size={25} /> </button>
                  </div>
                </div>
              </li>
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

(Inventory as PageWithLayout).layout = AdminPageLayout
export default Inventory