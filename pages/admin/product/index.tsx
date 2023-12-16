import React, { FC, useState, useEffect, SyntheticEvent } from 'react'
import  SideNavDash  from '@/components/sideNavDash'
import { TbEdit, TbTrash, TbUsers, TbFolders, TbHexagonPlus } from 'react-icons/tb'
import router, { useRouter } from 'next/router'
import Image from 'next/image'
import Modal from '@/components/Modal';
import { FormattedPrice } from '@/helpers/index'
import { IoMdAddCircleOutline } from "react-icons/io";
import Cookies from 'js-cookie'

import 'react-toastify/dist/ReactToastify.css';
import { Toaster, toast } from 'sonner'
import { jwtDecode } from 'jwt-decode'

const ProductPage = () => {
  const [ isModalOpen, setIsModalOpen ] = useState(false);

  const [ page, setPage] = useState(0)

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setTimeout(() => {
      setIsModalOpen(false);
    }, 1000);
  }
  
  const [ users, setUsers ] = useState<[]>()
  const [ userid, setuserid ] = useState("")
  const [ productid, setProductID ] = useState("")
  const [ userId, setUserId] = useState("")
  const [ productId, setProductId] = useState("")
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

  console.log(products)

  const router = useRouter();


  const onFormDelete =  async () => {
    const res = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/product/deleteProduct/${productId}`, {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userID: userId
      })
    })

    if(!res.ok) {
      alert("There something is eror while updating")
    } else {
      {products?.map(({ userId, id, productID, name, category, price, stock, image, description, }: any) => (

        toast.warning(`${name} has been deleted`)
  
        ))}
    }
    return res.json()
  }
  console.log(productId)
  console.log(userId)
  return (
    <>

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
                  <button type="submit" className="py-3 px-4 flex w-40 justify-center items-center gap-2 rounded-md border border-transparent font-bold bg-[#FFBD59] text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-md dark:focus:ring-offset-gray-800" onClick={handleCloseModal}>Yes</button>
                  <button type="button" className="py-3 px-4 w-40 flex justify-center items-center gap-2 rounded-md border border-transparent font-bold bg-[#FFBD59] text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-md dark:focus:ring-offset-gray-800" onClick={handleCloseModal}>No</button>
                </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>


        <title>Product Management</title>

    <SideNavDash/>


    <div className="antialiased font-sans bg-gray-200">
    <div className="container mx-auto px-4 sm:px-8 2xl:ml-[360px] ">
        <div className="py-12">
        <div className='pt-6 w-full flex gap-20 xl:gap-[1100px]'>
                <h2 className="text-xl md:text-3xl font-roboto font-bold leading-tight">Product Management</h2>
                <button onClick={() => router.push("/admin/product/addproduct")} className="fr:absolute fr:right-14 lt:absolute lt:right-14  rounded-xl bg-gradient-to-br from-[#f5e725] to-[#FF5555] px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#f5e725]/50">
                <IoMdAddCircleOutline size={15}/>
                </button>
            </div> 


            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden h-[790px] bg-white">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                    PRODUCT IMAGE
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                    PRODUCT ID
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                    PRODUCT NAME
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                    PRODUCT STATUS
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                    PRODUCT Category
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                    PRODUCT Price
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                    ACTION
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                        {products?.map(({ id, productID, name, category, price, stock, image, description, }: any) => (
                            <tr key={productID}>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
                                    <div className="flex items-center">
                                        <div className="ml-3">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                            
                                            {image.length > 0 && (
                                              <div className="flex-shrink-0 w-[70px] h-[70px]">
                                                    <Image src={image[1]} alt={name} height={10} width={100} />
                                                    </div>
                                                    )}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
                                    <p className="text-gray-900 whitespace-no-wrap">{id}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                    {name}
                                    </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                    {stock}
                                    </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                    {category}
                                    </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                    {FormattedPrice(price)}
                                    </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
                                    <span
                                        className="relative inline-block px-3 py-1 font-bold text-black leading-tight">
                                                            <button onClick={() => router.push(`/admin/product/editproduct/${productID}`)}> <TbEdit size={25} /> </button>

                                        <button  onClick={() => {
                              handleOpenModal();
                              setProductId(productID) }} > <TbTrash size={25} /> </button>
                                    </span>
                                </td>
                            </tr>
                             ))} 
                                
                        </tbody>
                    </table>
                    
                    <div
                        className="px-5 py-5 bg-white border-t  flex items-center justify-center xs:flex-row xs:justify-center          ">
                        <div className="inline-flex mt-2 xs:mt-0 gap-4">
                            <button disabled={page === 0 }
                                className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l" onClick={() => setPage(()=> page - 1)}>
                                Prev
                            </button>
                            <button
                                className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r" onClick={() => setPage(() => page + 1)}>
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Toaster richColors  />
</div>

  </>
  )
}

export default ProductPage