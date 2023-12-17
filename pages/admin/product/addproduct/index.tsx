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
import SideNavDash from '@/components/sideNavDash'

const AddProductPage = () => {

    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

    const [ isOpen, setIsOpen ] = useState(false);
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const [ isOpen1, setIsOpen1 ] = useState(false);
  
    const toggleDropdown1 = () => {
      setIsOpen1(!isOpen1);
    };
  
    const [ productCateg, setProductCateg ] = useState("");
    const [ productStatus, setProductStatus ] = useState("")
    const productsAvailability =["In Stock", "Out of Stock"];
    const productsCategory = ["Tires", "Car Battery", "Tire Mags", "Oils", "Car Filters" ]
    const [ userid, setUserId ] = useState("")
  
    useEffect(() => {
      const cookies = Cookies.get("ecom_token")
      if (cookies) {
        const { userID }: any = jwtDecode(cookies)
        setUserId(userID)
      }
    }, [])
  
    const [ selectedImage, setSelectedImage ] = useState<any>([])
  
    const [ products, setProducts ] = useState({
      name: "",
      quantity: "",
      price: "",
      description: "",
      category: "",
    })
  
    const onHandleImageUpload = (e: any) => {
      setSelectedImage(Array.from(e.target.files))
    }
  
    const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));
  
    const AddProductForm = async (e :any) => {
  
      e.preventDefault();
      const fd = new FormData();
  
      for(const image of selectedImage) {
        fd.append("file", image)
      }
  
      fd.append("name", products.name)
      fd.append("descriptions", products.description);
      fd.append("category", productCateg);
      fd.append("price",products.price);
      fd.append("stock", productStatus)
      fd.append("quantity", products.quantity)
      fd.append("userID", userid)
      
      const response = await fetch("https://minervasales-23b0919d60c1.herokuapp.com/product/createProduct", {
        method: "POST",  
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
              return `Added a new product succesfully`;
            },
            error: 'Error',
          });
    }
  
    }
  
    console.log({
      'file': selectedImage, 
      'name': products.name,
      'descriptions': products.description,
      'category': productCateg,
      'price': products.price,
      'stock': productStatus,
      'quantity': products.quantity,
  
    })

    const handleProductStatusChange = (e: any) => {
      setProductStatus(e.currentTarget.value);
      setIsOpen(false);
   };

   const handleProductCategoryChange = (e: any) => {
    setProductCateg(e.currentTarget.value);
    setIsOpen(false);
 };

 
  return (

    <>
<SideNavDash/>
<Toaster richColors/>
    <div className="h-screen bg-gray-200">
    <div className="flex w-full h-[1080px] bg-gradient-to-r from-amber-200 to-yellow-500 flex-col bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="pt-10 md:pl-96 lt:pl-20 lg:pl-96 md:pt-[46px]">
                    <div className="p-4 md:p-8">
                        <h1 className="text-black text-center font-bold pb-8 text-4xl md:text-5xl lg:text-6xl">Add New Product</h1>
                            <form encType='multipart/form-data' onSubmit={AddProductForm} className="flex flex-col items-center">
                                    <div className="xs:w-[300px] md:w-4/5 lg:w-3/4 xl:w-2/3">
                                            <div className="flex flex-col md:flex-row">
                                                

                                                <label htmlFor="name" className="text-lg absolute mt-2.5 text-black font-bold px-1 rounded ">
                                                   Product Name
                                                </label>
                                                
                                                <input id="name" type="text" name="name"
                                                    className="mt-10 py-4 px-4 pb-4 rounded-md bg-gray-900 text-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-600"
                                                    placeholder="Input product name"
                                                    onChange={(e) => setProducts({...products, name: e.target.value})}/>

                                           
                                            </div>

                                            <div className="flex flex-col md:flex-row">
                                                

                                                <label htmlFor="price" className="text-lg absolute mt-1.5 text-black font-bold px-1 rounded">
                                                   Product Price
                                                </label>
                                                
                                                <input id="price" type="text" name="price"
                                                    className="mt-10 py-4 px-4 rounded-md bg-gray-900 text-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-600"
                                                    placeholder="ex. 1000"
                                                    onChange={(e) => setProducts({...products, price: e.target.value})} 
                                                    />

                                           
                                            </div>

                                            {/* <div className="flex flex-col md:flex-row">
                                                

                                                <label htmlFor="price" className="text-lg absolute mt-1.5 text-black font-bold px-1 rounded">
                                                   Product Quantity
                                                </label>
                                                
                                                <input id="quantity" type="text" name="quantity"
                                                    className="mt-10 py-4 px-4 rounded-md bg-gray-900 text-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-600"
                                                    placeholder="ex. 99"
                                                    onChange={(e) => setProducts({...products, quantity: e.target.value})} 
                                                    />

                                           
                                            </div> */}

                                            <div className="my-4 flex flex-row md:gap-[730px] lt:gap-[250px] lg:gap-[600px]">
                                                

                                            <div>
                      <label htmlFor="lastName" className="text-lg absolute mt-1.5 text-black font-bold px-1 rounded">Product Status </label>
                      <button name="status"type="button" className="inline-flex justify-center xs:w-[140px] lg:w-[250px] rounded-md border border-gray-700 shadow-sm mt-10 px-4 py-2 bg-gray-900 text-md font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                        onClick={toggleDropdown}
                      >
                       {productStatus === "" ? "Select Product Status" : productStatus}

                        <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 011.414 0 1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    <div className={`w-full mt-[80px] ml-2 flex flex-col bg-gray-900 text-md font-medium text-white rounded-md shadow-lg p-4 ${isOpen ? 'xl:w-[190px] absolute z-20' : 'hidden'}`}>
        {isOpen ? (
          productsAvailability.map((name) => (
            <button
              name="stock"
              className='text-left'
              type="button"
              key={name}
              value={name}
              onClick={handleProductStatusChange}
            >
              {name}
            </button>
          ))
        ) : null}
      </div>

<div>
                      <label htmlFor="lastName" className="text-lg absolute mt-1.5 text-black font-bold px-1 rounded">Product Category</label>
                      <button name="category" type="button" className="inline-flex justify-center xs:w-[140px] lg:w-[250px]  rounded-md border border-gray-900 mt-10 shadow-sm px-4 py-2 bg-gray-900  text-md font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                        onClick={toggleDropdown1}
                      >
                      {productCateg === "" ? "Select Product Category" : productCateg}

                        <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 011.414 0 1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                      </button>
                    </div>

                    <div className={`w-full lg:ml-[840px] flex flex-col md:ml-[190px] md:mt-[80px] text-md font-medium bg-gray-900  text-white rounded-md shadow-lg p-4 ${isOpen1 ? 'xl:w-[190px] absolute z-20' : 'hidden'}`}>
                    {isOpen1 ? (productsCategory.map((name) => (
                    <button 
                    name="category" 
                    className='text-left' 
                    type="button"
                    key={name} 
                    value={name} 
                    onClick={handleProductCategoryChange}
                    >
                        {name} 
    </button>
)) ): null}
                  </div>

                                           
                                            </div>

                                            <div className="flex flex-col md:flex-row">
                                                

                                                <label htmlFor="quantity" className="text-lg absolute mt-1.5 text-black font-bold px-1 rounded">
                                                   Product Quantity
                                                </label>
                                                
                                                <input id="price" type="text" name="quantity"
                                                    className="mt-10 py-4 px-4 rounded-md bg-gray-900 text-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-600"
                                                    placeholder="ex. 25"
                                                    onChange={(e) => setProducts({...products, quantity: e.target.value})}
                                                    />

                                           
                                            </div>

                                            <div className="flex flex-col md:flex-row">
                                                

                                            <div className='flex flex-col mt-4 ml-[120px] xl:ml-[430px]'> 
<label className="text-lg absolute mt-2 text-black font-bold px-1 rounded" htmlFor="file_input">Upload photo</label>
                <input name="file" className="mt-12 block -ml-16 w-60 text-sm text-gray-900 border border-gray-300 rounded-sm cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none" id="file_input" type="file" accept='image/*'  multiple onChange={onHandleImageUpload}/>
                <p className="mt-2 ml-2 text-sm text-gray-900 dark:text-gray-800" id="file_input_help">PNG, JPG, or JPEG</p>
                </div>

                                           
                                            </div>

                                            

                                            <label htmlFor="price" className=" text-lg absolute -z-8 mt-1.5 text-black font-bold px-1 rounded">
                                                   Product Description
                                                </label>
                                        <textarea id="message"
                                            className="mt-10 py-2 px-4 rounded-md bg-gray-900 text-gray-300 w-full h-[150px] outline-none focus:ring-2 focus:ring-blue-600"
                                            onChange={(e) => setProducts({...products, description: e.target.value})}
                                            name="description"/>
                                    </div>
                                <button
                                    className="border-2 text-md font-bold mt-5 rounded-md py-2 px-4 bg-[#FFBD59] shadow-md shadow-black hover:bg-yellow-500 text-gray-900 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-900">
                                    Add New Product
                                </button>
                            </form>
                            
                    </div>
                    </div>    
                    </div>
</div>
</>


  )
}

export default AddProductPage