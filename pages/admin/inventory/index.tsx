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
import SideNavDash from '@/components/sideNavDash'


const InventoryPage = () => {

  const router = useRouter();
  const [ productId, setProductId] = useState("")

  const [quantityToUpdate, setQuantityToUpdate] = useState("");

  const [ isModalOpen, setIsModalOpen ] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [ page, setPage] = useState(0)
  const [ quantity, setQuantity ] = useState("");

  const [ products, setProducts ] = useState<[]>()
  const [ userId, setUserId] = useState("")

  const [inventoryQ, setInventoryQ] = useState({
    quantity: '',
  });

  // useEffect(() => {
  //   const cookies = Cookies.get("ecom_token");
  //   if (cookies) {
  //     const { userID }: any = jwtDecode(cookies)
  //     setUserId(userID)
  //   }
  // }, [userId])

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
    <>



        <title>Inventory</title>

    <SideNavDash/>


    <div className="antialiased font-sans bg-gray-200 sm:pl-20 lg:pl-2">
    <div className="container mx-auto px-4 sm:px-8 2xl:ml-[360px] ">
        <div className="py-12">
            <div>
                <h2 className="text-3xl font-roboto font-bold leading-tight">Inventory</h2>
            </div> 
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden h-[790px] bg-white">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                    ID
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                    NAME
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                    STATUS
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                    QUANTITY
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                    UPDATED AT
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                    CATEGORY
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                    PRICE
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                    ACTION
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                        {products?.map(({ userId, id, productID, name, category, price, stock, image, description, quantity, updatedAt}: any) => (
                            <tr key={productID}>
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
                                    <div className={`badge ${quantity >= 10 ? 'w-20 bg-[#66ff00]  pl-8 rounded-xl' : 'w-20 bg-[#ff0000] pl-[35px] rounded-xl'}`}>
                                    {quantity}
                                    </div>
                                    </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-md ">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                    
                                    {FormattedDate(updatedAt)}

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
                                                            <button onClick={() => router.push(`/admin/inventory/editinventory/${productID}`)}> <TbEdit size={25} /> </button>

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
</div>

  </>
  )
}

export default InventoryPage