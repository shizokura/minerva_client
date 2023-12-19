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
import Cookie from 'js-cookie'

const EditInventoryPage = () => {

  const router = useRouter();
    const [ category, setCategory ] = useState("");
  const [ status, setStatus ] = useState("")
  const productsAvailability = ["In Stock", "Out of Stock"]
  const productsCateg = ["Tires", "Tire Mags", "Car Battery", "Oils", "Car Filters"]

  const [ users, setUsers ] = useState<[]>()

  const [ productCategory, setProductCategory ] = useState('');
  const [ productStock, setProductStock ] = useState('');

  const [ isOpen, setIsOpen ] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [ isOpen1, setIsOpen1 ] = useState(false);

  const toggleDropdown1 = () => {
    setIsOpen1(!isOpen1);
  };

  const [ productsD, setProductsD ] = useState<[]>()

  const [ userId, setUserId ] = useState("")

  useEffect(() => {
    const cookies = Cookie.get("ecom_token");
    if (cookies) {
      const { userID }: any = jwtDecode(cookies)
      setUserId(userID)
    }
  }, [])

  const [products, setProducts] = useState({
    name: '',
    quantity: '',
    price: '',
    description: '',
    category: '',
    stock: '',

  });

  const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));

  console.log(products, productStock, productCategory)
  const [ selectedImage, setSelectedImage ] = useState<any>([])

  const onHandleImageUpload = (e: any) => {
    setSelectedImage(Array.from(e.target.files))
  }

  const handleGoBack = () => {
    // Trigger the router.back() function
    router.back();

    toast.promise(promise, {
      loading: 'Loading...',
      success: (productsD) => {
        return `Updated product quantity succesfully`;
      },
      error: 'Error',
    });
  }


  useEffect(() => {
    const fetchData = async () => {
    
        const res = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/product/getProductById/${router.query.id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          cache: 'default',
        });
  
        if (!res.ok) {
          throw new Error(`Failed to fetch product data: ${res.status}`);
        }
  
        const result = await res.json();
        setProductsD(result)

        if (result && result.length > 0) {
          const { stock, category } = result[0];
          setProductStock(stock);
          setProductCategory(category);
        }
      
    };

    fetchData();
  }, [router ]);

  console.log(products)

  const EditInventoryForm = async (e: any) => {
    e.preventDefault();

      const response = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/product/updateProductQuantity/${router.query.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quantity: parseInt(products.quantity),
          userID: userId
        }),
      });

      if (!response.ok) {
        throw new Error('There was an error while updating');
      }

      response.json();
  };

  useEffect(() => {
    productsD?.map(({ productID, name, quantity, price, descriptions, category, userID, stock}: any) => {
        setProducts({
          name: name,
          quantity: quantity,
          price: price,
          description: descriptions,
          category: category,
          stock: stock
        })
    })
  }, [productsD])

  console.log(userId)
  return (

    <>
<SideNavDash/>

    <div className="h-screen bg-gray-200">
    <div className="flex w-full h-[1050px] bg-gradient-to-r from-amber-200 to-yellow-500 flex-col bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="pt-10 md:pl-96 md:pt-[46px] lt:pl-20 lg:pl-96 sm:pl-28">
                    <div className="p-4 md:p-8">
                        <h1 className="text-black text-center font-bold pb-8 text-4xl md:text-5xl lg:text-6xl"> Inventory Details</h1>
                            <form encType='multipart/form-data' onSubmit={EditInventoryForm} className="flex flex-col items-center">
                                    <div className="md:w-4/5 sm:w-60 lg:w-3/4 xl:w-2/3">
                                            <div className="flex flex-col md:flex-row">
                                                

                                                <label htmlFor="name" className="text-lg absolute mt-2.5 text-black font-bold px-1 rounded ">
                                                Product Name
                                                </label>
                                                
                                                <input id="name" type="text" name="name"
                                                    className="mt-10 py-4 px-4 pb-4 rounded-md bg-gray-900 text-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-600"
                                                    placeholder="Input product name"
                                                    disabled onChange={(e) => setProducts({...products, name: e.target.value})} 
                                                    defaultValue={products.name}/>

                                           
                                            </div>

                                            <div className="my-4 flex lg:flex-row sm:flex-col md:gap-[620px] lg:gap-[740px] lt:gap-[450px]">
                                                

                                                <div>
                          <label htmlFor="lastName" className="text-lg absolute mt-1.5 text-black font-bold px-1 rounded">Product Status </label>
                          <button name="status"type="button" className="inline-flex justify-center w-[180px] rounded-md border border-gray-700 shadow-sm mt-10 px-4 py-2 bg-gray-900 text-md font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                             onClick={toggleDropdown}
                          >
                           {productStock === "" ? "Select Product Status" : productStock}
    
                            <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 011.414 0 1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                          </button>
                        </div>
                        <div className={`w-full mt-[80px] flex flex-col bg-gray-900 text-md font-medium text-white rounded-md shadow-lg p-4 ${isOpen ? 'w-[175px] absolute z-20' : 'hidden'}`}>
      {isOpen ? (
        productsAvailability.map((name) => (
          <button
          name="stock"
            className='text-left'
            type="button"
            key={name}
            value={name}
            onClick={(e) => setProductStock(e.currentTarget.value)}
            
          >
            {name}
          </button>
        ))
      ) : null}
    </div>
    
    <div>
                          <label htmlFor="lastName" className="text-lg absolute mt-1.5 text-black font-bold px-1 rounded">Product Category</label>
                          <button disabled name="category" type="button" className="inline-flex justify-center w-[180px] rounded-md border border-gray-900 mt-10 shadow-sm px-4 py-2 bg-gray-900  text-md font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                            onClick={toggleDropdown1}
                          >
                          {productCategory === "" ? "Select Product Category" : productCategory}
    
                            <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 011.414 0 1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                          </button>
                        </div>
    
                        <div className={`w-full xl:ml-[895px] flex flex-col md:ml-[190px] md:mt-[80px] text-md font-medium bg-gray-900  text-white rounded-md shadow-lg p-4 ${isOpen1 ? 'w-[175px] absolute z-20' : 'hidden'}`}>
                        {isOpen1 ? productsCateg.map((name) => (
                          <button name="category" className='text-left' 
                          type="button"
                          key={name} 
                          value={name} 
                          onClick={(e) => setProductCategory(e.currentTarget.value)}
                          disabled
                          >
                            {name} 
                            </button>
                        )) : null}
                      </div>
    
                                               
                                                </div>
    
                                                <div className="flex flex-col md:flex-row">
                                                    
    
                                                    <label htmlFor="quantity" className="text-lg absolute mt-1.5 text-black font-bold px-1 rounded">
                                                       Product Price
                                                    </label>
                                                    
                                                    <input id="price" type="text" name="quantity"
                                                        className="mt-10 py-4 px-4 rounded-md bg-gray-900 text-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-600"
                                                        placeholder="ex. 1000"
                                                        disabled 
                                                        onChange={(e) => setProducts({...products, price: e.target.value})} 
                                                        defaultValue={products.price}/>
    
                                               
                                                </div>

                                            

                                            <label htmlFor="price" className=" text-lg absolute -z-8 mt-1.5 text-black font-bold px-1 rounded">
                                                   Product Description
                                                </label>
                                        <textarea id="message"
                                            className="mt-10 py-2 px-4 rounded-md bg-gray-900 text-gray-300 w-full h-[150px] outline-none focus:ring-2 focus:ring-blue-600"
                                            value={products.description} onChange={(e) => setProducts({...products, description: e.target.value})} disabled
                                            name="description"/>
                                                
                                                <div className="flex flex-col md:flex-row">
                                                <label htmlFor="price" className="text-lg absolute mt-1.5 text-black font-bold px-1 rounded">
                                                   Product Quantity
                                                </label>
                                                
                                                <input id="price" type="text" name="price"
                                                    className="mt-10 py-4 px-4 rounded-md bg-gray-900 text-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-600"
                                                    placeholder="ex. 25"
                                                    defaultValue={products.quantity} 
                                                    onChange={(e) => setProducts({...products, quantity: e.target.value})}/>

                                           
                                            </div>

                                           

                                            

                                            

                                            
                                    </div>
                                <button
                                    className="border-2 text-md font-bold mt-5 rounded-md py-2 px-4 bg-[#FFBD59] shadow-md shadow-black hover:bg-yellow-500 text-gray-900 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-900">
                                    Update Product Quantity
                                </button>
                            </form>
                            
                    </div>
                    </div>    
                    </div>
</div>
</>


  )
}

export default EditInventoryPage