import Head from 'next/head'
import { TbEdit, TbTrash, TbUsers, TbFiles, TbCalendar, TbShoppingBag, TbClock, TbGraph, TbFileAnalytics, TbList, TbArchive, TbClipboard, TbMessage, TbSettings2, TbLogout2, TbArrowLeft, TbChevronLeft, TbChevronRight, TbHexagonPlus, TbHexagonMinus, TbFilter } from 'react-icons/tb'
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
  const [ search, setSearch ] = useState("")
  const [ productSearch, setProductSearch ] = useState<any>(null)

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
      const res = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/product/getAllProductByAsc/?skip=${page}`, {
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

const [ category, setCategory ] = useState("")
const [ productCategory, setProductCategory ] = useState<any>(null)
const [ productFilters, setProductFilters ] = useState("")
const filters =["Tires", "Tire Mags", "Car Battery", "Oils", "Car Filters"];

const [ isOpen, setIsOpen ] = useState(false);

const toggleDropdown = () => {
  setIsOpen(!isOpen);
};


useEffect(() => {
  const fetchData = async () => {
    const response = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/product/getProductsByCategory/?category=${category}&skip=${page}&orderby=${productFilters}`, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' },
    })

    const result = await response.json()
    setProductCategory(result)
  }
  fetchData()
}, [ productCategory ])

useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/product/getSearchProduct/?search=${search}`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
      })
      const result = await response.json()
      setProductSearch(result)
    }
    fetchData()
  }, [ productSearch, search ])



  return (
    <>



        <title>Inventory</title>

    <SideNavDash/>

    <div className="absolute z-20 top-[40px] right-72 flex items-center w-[140px] lg:w-[220px] mx-auto bg-white border-2 border-black rounded-md text-sm " x-data="{ search: '' }">
          <div className="w-full">
          
            <input type="search" className="w-full px-4 py-1 text-gray-800 rounded-lg focus:outline-none "
              placeholder="search" onChange={(e) => setSearch(e.target.value)}/>
          </div>
          
          <div>
            <button type="submit" className="flex items-center border-2 bg-[#FFBD59] justify-center w-12 h-12 text-white rounded-r-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </div>
        </div> 

        <div className="absolute top-6 right-6 mb-6">
                                <div className="relative inline-block text-left">
                                  <div>
                                    <button type="button" className="flex mt-8 gap-4 justify-center lg:mr-6 lg:w-[220px] sm:w-10 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                                      onClick={toggleDropdown}
                                    >
                                      <span className='lg:flex sm:hidden'>
                                    {productFilters === "" ? "Filters" : productFilters}
                                    </span>
                                     <span className='pt-[2px]'><TbFilter/></span>
                                    </button>
                                  </div>
                                  <div className={`w-full bg-white flex flex-col rounded-md shadow-lg bg-primary-100 p-4 text-primary-600 ${isOpen ? 'w-[220px] absolute z-10' : 'hidden'}`}>
                {isOpen ? (
                  filters.map((name) => (
                    <button
                    name="filters"
                      className='text-left'
                      type="button"
                      key={name}
                      value={name}
                      onClick={(e) => setProductFilters(e.currentTarget.value)}
                    
                      >
                      {name}
                    </button>
                  ))
                ) : null}
              </div></div>
              </div>

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
                                    OLD QUANTITY
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                    NEW QUANTITY
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
                        {search ? productSearch?.map(({ userId, id, productID, name, createdAt, category, price, stock, image, description, oldQuantity, newQuantity, updatedAt}: any) => (
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
                                    <div className={`badge ${oldQuantity >= 10 ? 'w-20 bg-[#66ff00]  pl-8 rounded-xl' : 'w-20 bg-[#ff0000] pl-[35px] rounded-xl'}`}>
                                    {oldQuantity}
                                    </div>
                                    </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                    <div className={`badge ${newQuantity >= 10 ? 'w-20 bg-[#66ff00]  pl-8 rounded-xl' : 'w-20 bg-[#ff0000] pl-[35px] rounded-xl'}`}>
                                    {newQuantity}
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
                             )): 
                             category ? productCategory?.map(({ userId, id, productID, createdAt, name, category, price, stock, image, description, oldQuantity, newQuantity, updatedAt}: any) => (
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
                                    <div className={`badge ${oldQuantity >= 10 ? 'w-20 bg-[#66ff00]  pl-8 rounded-xl' : 'w-20 bg-[#ff0000] pl-[35px] rounded-xl'}`}>
                                    {oldQuantity}
                                    </div>
                                    </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                    <div className={`badge ${newQuantity >= 10 ? 'w-20 bg-[#66ff00]  pl-8 rounded-xl' : 'w-20 bg-[#ff0000] pl-[35px] rounded-xl'}`}>
                                    {newQuantity}
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
                               )): 
                        products?.map(({ userId, id, productID, name, category, createdAt, price, stock, image, description, oldQuantity, newQuantity, updatedAt}: any) => (
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
                                    <div className={`badge ${oldQuantity >= 10 ? 'w-20 bg-[#66ff00]  pl-8 rounded-xl' : 'w-20 bg-[#ff0000] pl-[35px] rounded-xl'}`}>
                                    {oldQuantity}
                                    </div>
                                    </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                    <div className={`badge ${newQuantity >= 10 ? 'w-20 bg-[#66ff00]  pl-8 rounded-xl' : 'w-20 bg-[#ff0000] pl-[35px] rounded-xl'}`}>
                                    {newQuantity}
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