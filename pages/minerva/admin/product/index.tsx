import styles from '@/styles/admin/content.module.scss'
import AdminPageLayout from '@/layout/adminpagelayout'
import PageWithLayout from '@/layout/pagewithlayout'
import React, { FC, useState, useEffect, SyntheticEvent } from 'react'
import Head from 'next/head'
import { TbEdit, TbTrash, TbUsers, TbFolders, TbHexagonPlus } from 'react-icons/tb'
import router, { useRouter } from 'next/router'
import Image from 'next/image'
import Modal from '@/components/Modal';
import { FormattedPrice } from '@/helpers/index'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
import 'react-toastify/dist/ReactToastify.css';
import { Toaster, toast } from 'sonner'

const ProductPage: FC = () => {

  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ page, setPage ] = useState(0)
  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setTimeout(() => {
      setIsModalOpen(false);
    }, 2000);
  }

  const [ users, setUsers ] = useState<[]>()
  const [ userid, setuserid ] = useState("")
  const [ productid, setProductID ] = useState("")
  const [ userId, setUserId ] = useState("")
  const [ productId, setProductId ] = useState("")
  const [ products, setProducts ] = useState<[]>()


  useEffect(() => {
    const cookies = Cookies.get("ecom_token") as any
    const { userID }: any = jwtDecode(cookies) as any
    setUserId(userID)
  }, [ userId ])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/product/getAllProduct/?skip=${page}&orderby=desc`, {
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

  const router = useRouter();


  const onFormDelete = async () => {
    const res = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/product/deleteProduct/${productId}`, {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userID: userId
      })
    })

    if (!res.ok) {
      alert("There something is eror while updating")
    } else {
      {
        products?.map(({ userId, id, productID, name, category, price, stock, image, description, }: any) => (

          toast.warning(`${name} has been deleted`)

        ))
      }
    }
    return res.json()
  }



  return (
    <div>
      <Head>
        <title>Product Management</title>
      </Head>
      <Toaster richColors />
      <div className={styles.titleHead}>
        <div className={styles.icon}><TbFolders size={50} /></div>
        Product Management
      </div>
      <div className={styles.container}>
        <div className={styles.title}>Products List
          <button className="py-2 flex font-large absolute top-5 right-5 text-black bg-[#FFBD59] hover:bg-[#FFBD59] focus:ring-yellow-200 rounded-lg text-sm px-5 text-center" onClick={() => router.push("/minerva/admin/product/addproduct")}> <TbHexagonPlus className='mr-2' size={25} />Add New Product</button>
        </div>
        <div className={styles.divider}></div>

        <div className={styles.tablecontainer}>
          <ul className={styles.responsiveTable}>
            <li className={styles.tableHeader}>
              <div className={styles.col1}>PRODUCT IMAGE</div>
              <div className={styles.col2}>PRODUCT ID</div>
              <div className={styles.col3}>PRODUCT NAME</div>
              <div className={styles.col4}>PRODUCT STATUS</div>
              <div className={styles.col5}>CATEGORY</div>
              <div className={styles.col6}>PRICE</div>
              <div className={styles.col7}>ACTION</div>
            </li>

            {products?.map(({ userId, id, productID, name, category, price, stock, image, description, }: any) => (

              <li key={productID} className={styles.tableRow}>
                <div className={styles.col1} data-label="Product Image">
                  {image.length > 0 && (
                    <Image src={image[ 1 ]} alt={name} height={120} width={120} />
                  )}
                </div>
                <div className={styles.col2} data-label="Product Id">{id}</div>
                <div className={styles.col3} data-label="Product Name">{name}</div>
                <div className={styles.col4} data-label="Stock">{stock}</div>
                <div className={styles.col5} data-label="Category">{category}</div>
                <div className={styles.col6} data-label="Price">{FormattedPrice(price)}</div>
                <div className={styles.col7} data-label="Action">
                  <button onClick={() => router.push(`/minerva/admin/product/editproduct/${productID}`)} className={styles.col7}> <TbEdit size={25} /> </button>
                  <button onClick={() => {
                    handleOpenModal();
                    setProductId(productID)
                  }}
                    className={styles.col7}> <TbTrash size={25} /> </button>
                </div>
              </li>


            ))}


            {/*  */}
          </ul>
        </div>

        <div className={styles.pagination}>
          <button disabled={page === 0} className=' bg-[#FFBD59] hover:bg-blue-700 text-white font-bold mx-4 py-2 px-4 rounded' onClick={() => setPage(() => page - 1)}>Prev</button>
          <button className='bg-[#FFBD59] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => setPage(() => page + 1)}>Next</button>
        </div>

      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className=" bg-gray-800 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 sm:p-7 " >
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Confirm Delete</h1>
            </div>

            <div className="mt-5 flex flex-col justify-center items-center">
              <form onSubmit={onFormDelete}>

                <div className="grid gap-y-4">
                  <p className="text-center divide-x divide-gray-300 dark:divide-gray-700 text-white">
                    Are you sure you want to delete this product?
                  </p>
                  <div className='flex gap-2'>
                    <button type="submit" className="py-3 px-4 flex w-40 justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-[#FFBD59] text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" onClick={() => router.push("/minerva/admin/product")}>Yes</button>
                    <button type="button" className="py-3 px-4 w-40 flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-[#FFBD59] text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" onClick={handleCloseModal}>No</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </div>

  )
}

(ProductPage as PageWithLayout).layout = AdminPageLayout
export default ProductPage