import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import HomePageLayout from '@/layout/homepagelayout'
import PageWithLayout from '@/layout/pagewithlayout'
import styles from "@/styles/customer/customer.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
import Link from 'next/link';
import { FormattedPrice } from '@/helpers/index'
import Image from 'next/image'
import { useLocalStorageValue } from '@react-hookz/web'
import 'react-toastify/dist/ReactToastify.css';
import { Toaster, toast } from 'sonner'

const ProductDetails: FC = () => {

  const [ products, setProducts ] = useState({
    productID: '',
    name: '',
    quantity: '',
    price: '',
    description: '',
    category: '',
    stock: '',
    image: ''
  });

  const router = useRouter();
  const [ rotate, setRotate ] = useState(false);
  const [ count, setCount ] = useState(1);
  const [ productsTake, setProductsTake ] = useState(10)  // you can set this on default
  const [ filters, setFilters ] = useState("")
  const [ filterProducts, setFilterProducts ] = useState(null)
  const [ search, setSearch ] = useState("")
  const [ productSearch, setProductSearch ] = useState(null)
  const [ page, setPage ] = useState(0)
  const [ userId, setUserId ] = useState("")
  const [ productsD, setProductsD ] = useState<[]>()

  const [ cartPr, setCartPr ] = useState<[]>([])
  const cartProduct = useLocalStorageValue("products")

  useEffect(() => {
    setCartPr(cartProduct.value as unknown as any)
  }, [ cartProduct.value ])


  useEffect(() => {
    setCartPr(cartProduct.value as unknown as any)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/product/getProductById/${router.query.id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          cache: 'no-cache',
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch product data: ${res.status}`);
        }

        const result = await res.json();
        setProductsD(result);


      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchData();
  }, [ router ]);

  useEffect(() => {
    productsD?.map(({ productID, image, name, quantity, price, descriptions, category, userID, stock }: any) => {
      setProducts({
        productID: productID,
        image: image,
        name: name,
        quantity: quantity,
        price: price,
        description: descriptions,
        category: category,
        stock: stock
      })
    })
  }, [ productsD ])

  const onHandleCartItems = () => {
    if (!Array.isArray(cartPr)) {
      cartProduct.set([
        {
          productID: products.productID,
          name: products.name,
          description: products.description,
          quantity: count,
          total: products.price as any * count,
          price: products.price,
          image: products.image,
          category: products.category,
        }
      ])
    } else {
      cartProduct.set([ ...cartPr, {
        productID: products.productID,
        name: products.name,
        description: products.description,
        quantity: count,
        total: products.price as any * count,
        price: products.price,
        image: products.image,
        category: products.category,
      } ])
    }
    toast.success('Product added to cart succesfully')
  }
  const addCount = () => {
    setCount((prev) => prev + 1);
  };

  const minusCount = () => {
    if (count > 0) {
      setCount((prev) => prev - 1);
    }
  };

  // Settings for the react-slick carousel
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (router.isFallback) {
    return (<p>Loading.....</p>)
  }



  return (
    <>
      <Toaster richColors  />
      
      <section className="mt-[100px] lg:mt-[200px] py-10 font-poppins">
              <div className="max-w-6xl px-4 mx-auto">
              <div className="flex flex-wrap mb-24 -mx-4">
              <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
              <div className="sticky top-0 overflow-hidden ">
              <div className="relative mb-6 lg:mb-10 lg:h-96">
             

              {products.image.length > 0 && (
                    <Image src={products.image[2]} alt={products.name} height={220} width={550} />
                  )}


              </div>
              <div className="mt-40 flex-wrap hidden -mx-2 md:flex">

              <div className="w-1/2 p-2 sm:w-1/3">
              <a className="block border border-gray-200 hover:border-blue-400 dark:border-gray-700 shadow-lg dark:hover:border-blue-300" href="#">
              {products.image.length > 0 && (
                    <Image src={products.image[2]} alt={products.name} height={220} width={520} />
                  )}
              </a>
              </div>
              <div className="w-1/2 p-2 sm:w-1/3">
              <a className="block border border-gray-200 hover:border-blue-400 dark:border-gray-700 shadow-lg dark:hover:border-blue-300" href="#">
              {products.image.length > 0 && (
                    <Image src={products.image[1]} alt={products.name} height={220} width={520} />
                  )}              
                </a>
              </div>
              <div className="w-1/2 p-2 sm:w-1/3">
              <a className="block border border-gray-200 hover:border-blue-400 dark:border-gray-700 shadow-lg dark:hover:border-blue-300" href="#">
              {products.image.length > 0 && (
                    <Image src={products.image[0]} alt={products.name} height={220} width={520} />
                  )}               
                  </a>
              </div>
             

              </div>
              </div>
              </div>
              <div className="w-full px-4 md:w-1/2">
              <div className="lg:pl-20">
              <div className="mb-6">
            
              <h2 className="max-w-xl mt-20 mb-6 text-xl font-bold leading-loose tracking-wide text-gray-800 md:text-4xl dark:text-gray-700">
              {products.name}
              </h2>

              <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-700">
              <span>{FormattedPrice(parseInt(products.price))}</span>
              </p>
              </div>
              <div className="mb-6">
              <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">Product Description:</h2>
              <h2 className=" w-[300px] sm:w-[200px] break-all mb-2 text-lg font-bold text-gray-700 dark:text-gray-700">
                {products.description}
              </h2>
              </div>
              <div className="py-6 mb-6 border-t border-b border-gray-200 dark:border-gray-700">
              <span className="text-base text-gray-600 dark:text-gray-700">{products.stock} : {products.quantity}</span>


              </div>
              <div className="mb-6 "></div>
              <div className="flex flex-wrap items-center mb-6">
              <div className="mb-4 mr-4 lg:mb-0">
              <div className="w-28">
              <div className="relative flex flex-row w-full h-10 bg-transparent rounded-lg">
              <button className="w-20 h-full text-gray-600 bg-gray-100 border-r rounded-l outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-300">
              <span onClick={minusCount} className="m-auto text-2xl font-thin">-</span>
              </button>
              <input id="counter" value={count} type="number" onChange={(e) => parseInt(e.target.value) > 0 ? e.target.value : 1} className="flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-100 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black" placeholder="1"/>
              <button  className="w-20 h-full text-gray-600 bg-gray-100 border-l rounded-r outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-300">
              <span onClick={addCount} className="m-auto text-2xl font-thin">+</span>
              </button>
              </div>
              </div>
              </div>
              

              </div>
              <div className="flex gap-4 mb-6">
              <button onClick={onHandleCartItems} className="w-full px-4 py-3 text-center text-gray-200 bg-[#FFBD59] border border-transparent dark:border-gray-700 hover:border-blue-500 hover:text-black hover:bg-[#FFBD59] dark:text-gray-800 dark:bg-[#FFBD59] dark:hover:bg-gray-900 rounded-xl">
              Add to cart</button>
              </div>
              </div>
              </div>
              </div>
              </div>
</section>

<footer className="py-10 -mt-20 w-screen flex flex-col space-y-10 justify-center bg-gradient-to-r from-gray-100 via-[#FFBD59] to-gray-100">

  <nav className="flex justify-center flex-wrap gap-6 text-gray-500 font-medium">
      <Link className="text-black hover:text-gray-500" href="#">Home</Link>
      <Link className="text-black hover:text-gray-500" href="#">Products</Link>
      <Link className="text-black hover:text-gray-500" href="#">Services</Link>
      <Link className="text-black hover:text-gray-500" href="#">About</Link>
      <Link className="text-black hover:text-gray-500" href="#">Contact</Link>
  </nav>

  <div className="flex justify-center space-x-5">
      <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
      <Image src="/fblogo.webp" width={20} height={20} alt=''/>
     </Link>
    
  </div>
  <p className="text-center text-gray-700 font-medium">&copy; 2023 Minerva Sales Corporation. All rights reservered.</p>
</footer> 

</>

  );

};

(ProductDetails as PageWithLayout).layout = HomePageLayout;
export default ProductDetails;

