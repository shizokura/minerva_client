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
const EditProductPage = () => {

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
    const cookies = Cookies.get("ecom_token");
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

  const [ selectedImage, setSelectedImage ] = useState<any>([])

  const onHandleImageUpload = (e: any) => {
    setSelectedImage(Array.from(e.target.files))
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

  const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));
  
  const EditProductForm = async (e: any) => {
    e.preventDefault();
    
    // Use products state directly here
    // const fd = new FormData();
    // fd.append('name', products.name);
    // fd.append('descriptions', products.description);
    // fd.append('category', productCategory);
    // fd.append('price', products.price);
    // fd.append('stock', productStock);
    // fd.append('quantity', products.quantity);
    // fd.append('userID', userId);

      const response = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/product/updateProduct/${router.query.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "name":  products.name,
          "descriptions": products.description,
          "category": productCategory,
          "price": products.price,
          "stock": productStock,
          "quantity": products.quantity,
          "userID": userId
        }),
      });

      if(!response.ok) 
    {
      toast.warning("Please complete all fields.")
    }


  }

  const handleGoBack = () => {
    // Trigger the router.back() function
    router.back();

    toast.promise(promise, {
      loading: 'Loading...',
      success: (productsD) => {
        return `Updated ${products.name} succesfully`;
      },
      error: 'Error',
    });
  }

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

  const handleProductStatusChange = (e: any) => {
    setProductStock(e.currentTarget.value);
    setIsOpen(false);
 };

  return (

    <>
<SideNavDash/>

    <div className="h-screen bg-gray-200">
    <div className="flex w-full h-[1050px] bg-gradient-to-r from-amber-200 to-yellow-500 flex-col bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="pt-10 md:pl-96 md:pt-[46px]">
                    <div className="p-4 md:p-8">
                        <h1 className="text-black text-center font-bold pb-8 text-4xl md:text-5xl lg:text-6xl">Edit Product Details</h1>
                            <form encType='multipart/form-data' onSubmit={EditProductForm} className="flex flex-col items-center">
                                    <div className="md:w-4/5 lg:w-3/4 xl:w-2/3">
                                            <div className="flex flex-col md:flex-row">
                                                

                                                <label htmlFor="name" className="text-lg absolute mt-2.5 text-black font-bold px-1 rounded ">
                                                   Product Name
                                                </label>
                                                
                                                <input id="name" type="text" name="name"
                                                    className="mt-10 py-4 px-4 pb-4 rounded-md bg-gray-900 text-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-600"
                                                    placeholder="Input product name"
                                                    onChange={(e) => setProducts({...products, name: e.target.value})}
                                                    value={products.name}/>

                                           
                                            </div>

                                            <div className="flex flex-col md:flex-row">
                                                

                                                <label htmlFor="price" className="text-lg absolute mt-1.5 text-black font-bold px-1 rounded">
                                                   Product Price
                                                </label>
                                                
                                                <input id="price" type="text" name="price"
                                                    className="mt-10 py-4 px-4 rounded-md bg-gray-900 text-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-600"
                                                    placeholder="ex. 1000"
                                                    onChange={(e) => setProducts({...products, price: e.target.value})} 
                                                    value={products.price}/>

                                           
                                            </div>

                                            <div className="my-4 flex flex-row md:gap-[730px]">
                                                

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
                    <div className={`w-full mt-[80px] flex flex-col bg-gray-900 text-md font-medium text-white rounded-md shadow-lg p-4 ${isOpen ? 'w-[190px] absolute z-10' : 'hidden'}`}>
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
                      <button name="category" type="button" className="inline-flex justify-center w-[180px] rounded-md border border-gray-900 mt-10 shadow-sm px-4 py-2 bg-gray-900  text-md font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                        onClick={toggleDropdown1}
                      >
                      {productCategory === "" ? "Select Product Category" : productCategory}

                        <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 011.414 0 1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                      </button>
                    </div>

                    <div className={`w-full xl:ml-[895px] flex flex-col md:ml-[190px] md:mt-[80px] text-md font-medium bg-gray-900  text-white rounded-md shadow-lg p-4 ${isOpen1 ? 'w-[190px] absolute z-10' : 'hidden'}`}>
                    {isOpen1 ? productsCateg.map((name) => (
                      <button name="category" className='text-left' 
                      type="button"
                      key={name} 
                      value={name} 
                      onClick={(e) => setProductCategory(e.currentTarget.value)}
                      >
                        {name} 
                        </button>
                    )) : null}
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
                                                    value={products.quantity}/>

                                           
                                            </div>

                                            

                                            

                                            <label htmlFor="price" className=" text-lg absolute -z-8 mt-1.5 text-black font-bold px-1 rounded">
                                                   Product Description
                                                </label>
                                        <textarea id="message"
                                            className="mt-10 py-2 px-4 rounded-md bg-gray-900 text-gray-300 w-full h-[150px] outline-none focus:ring-2 focus:ring-blue-600"
                                            value={products.description} onChange={(e) => setProducts({...products, description: e.target.value})}
                                            name="description"/>
                                    </div>
                                <button onClick={handleGoBack}
                                    className="border-2 text-md font-bold mt-5 rounded-md py-2 px-4 bg-[#FFBD59] shadow-md shadow-black hover:bg-yellow-500 text-gray-900 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-900">
                                    Update Product Details
                                </button>
                            </form>
                            
                    </div>
                    </div>    
                    </div>
                    <Toaster richColors/>
</div>
</>


  )
}

export default EditProductPage