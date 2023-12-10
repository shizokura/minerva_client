import styles from '@/styles/admin/content.module.scss'
import AdminPageLayout from '@/layout/adminpagelayout'
import PageWithLayout from '@/layout/pagewithlayout'
import React, { FC, useEffect, useState, } from 'react'
import Head from 'next/head'
import { TbEdit, TbFile, TbFiles, TbTrash, TbUsers } from 'react-icons/tb'
import router from 'next/router'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import 'react-toastify/dist/ReactToastify.css';
import { Toaster, toast } from 'sonner'


interface InputProp {
  labelTitle: string;
  defaultValue: string;
  updateFormValue: (value: string) => void;
}

const AddProductPage: FC<InputProp> = ({ labelTitle, defaultValue, updateFormValue }) => {

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
      alert("Please complete all fields")
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

  return (

    <div>
      <Head>
        <title>Add Product</title>
      </Head>

      <div className={styles.titleHead}>
        <div className={styles.icon}><TbFiles size={50} /></div>
        Product Management
      </div>

      <div className={styles.container}>
        <div className={styles.title}>Add Product Details</div>
        <div className={styles.divider}></div>

        <div className="flex lg:flex-row flex-col items-center py-6 px-4">


          <div className="w-full mx-28 my-20">


            <div className=" w-full mx-auto">

              <form encType='multipart/form-data' onSubmit={AddProductForm} className='grid grid-cols-1 md:grid-cols-2 gap-16'>
                <div className="mb-6">
                  <label htmlFor="productName" className="text-sm font-medium text-gray-900 block mb-2">Product Name</label>
                  <input type="text" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e) => setProducts({...products, name: e.target.value})}
                   placeholder="Input product name"/>
                </div>

                <div className="mb-6">
                  <div className="relative inline-block text-left">
                    <div>
                      <label htmlFor="lastName" className="text-sm font-medium text-gray-900 block mb-2">Product Status <span className='text-gray-400'>(Please always choose Product Status)</span></label>
                      <button type="button" className="inline-flex justify-center w-[220px] rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                        onClick={toggleDropdown}
                      >
                       {productStatus === "" ? "Select Product Status" : productStatus}

                        <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 011.414 0 1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    <div className={`w-full flex flex-col rounded-md shadow-lg bg-primary-100 p-4 text-primary-600 ${isOpen ? 'w-[220px] absolute z-10' : 'hidden'}`}>
  {isOpen ? (
    productsAvailability.map((name) => (
      <button
      name="status"
        className='text-left'
        type="button"
        key={name}
        value={name}
        onClick={(e) => setProductStatus(e.currentTarget.value)}
      
        aria-required>
        {name}
      </button>
    ))
  ) : null}
</div>
                  </div>
                </div>

                <div className="mb-6">
                      <label htmlFor="price" className="text-sm font-medium text-gray-900 block mb-2">Product Price</label>
                      <input name="price" type="text" id="productPrice" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
                      focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={products.price} onChange={(e) => setProducts(({...products, price: e.target.value}))} placeholder="ex. 999"/>
                    </div>

                <div className="mb-6">
                  <div className="relative inline-block text-left">
                    <div>
                      <label htmlFor="lastName" className="text-sm font-medium text-gray-900 block mb-2">Product Category <span className='text-gray-400'>(Please always choose Product Category)</span> </label>
                      <button name="category" type="button" className="inline-flex justify-center w-[220px] rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                        onClick={toggleDropdown1}
                      >
                      {productCateg  === "" ? "Select Product Category" : productCateg}

                        <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 011.414 0 1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    <div className={`w-full flex flex-col rounded-md shadow-lg bg-white p-4 text-primary-600 ${isOpen1 ? ' w-[220px] absolute z-10' : 'hidden'}`}>
                    {isOpen1 ? productsCategory.map((name) => (
                      <button className='text-left' 
                      name="category"
                      type="button"
                      key={name} 
                      value={name} 
                      onClick={(e) => setProductCateg(e.currentTarget.value)}
                      aria-required>
                        {name} 
                        </button>
                    )) : null}
                  </div>
                  </div>
                </div>

                    

                    <div className="mb-6">
                      <label htmlFor="productName" className="text-sm font-medium text-gray-900 block mb-2">Product Quantity</label>
                      <input name="price" type="text" id="productQuantity" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
                      focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={products.quantity} onChange={(e) => setProducts(({...products, quantity: e.target.value}))} placeholder="ex. 99"/>
                    </div>

                <div className="mb-6">
                  <label htmlFor="description" className="text-sm font-medium text-gray-900 block mb-2">Product Description</label>
                  <textarea id="descriptions" 
                 name="descriptions" value={products.description} placeholder="Input your product description here" required 
                  onChange={(e) => setProducts({
                   ...products, description: e.target.value
                  })}
                  className="h-40 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 start-0" aria-placeholder="Input your product description here" />
                </div>

                <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-black" htmlFor="file_input">Upload photo</label>
                <input name="file" className="block w-80 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none" id="file_input" type="file" accept='image/*'  multiple onChange={onHandleImageUpload}/>
                <p className="mt-1 text-sm text-gray-900 dark:text-gray-800" id="file_input_help">PNG, JPG, or JPEG</p>
                </div>
                
                  <br></br>
                  
                <button type="submit" className="relative left-80 text-black bg-[#FFBD59] hover:bg-[#FFBD59] focus:ring-yellow-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add New Product</button>
                <Toaster richColors  />
              </form>
            </div>

          </div>

        </div>
      </div>
    </div>

  )
}

(AddProductPage as PageWithLayout).layout = AdminPageLayout
export default AddProductPage