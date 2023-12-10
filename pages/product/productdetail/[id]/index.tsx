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

  useEffect(() => {
    const cookies = Cookies.get("ecom_token") as any
    const { userID }: any = jwtDecode(cookies) as any
    setUserId(userID)
  }, [ userId ])

  if (router.isFallback) {
    return (<p>Loading.....</p>)
  }


  return (
    <div className={styles.bodyProducts}>
      <Toaster richColors />
      <section className="absolute top-20" id="productdetail">
        <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4 ">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Product Details Div */}
            <div className="w-full lg:w-6/12 items-center mt-8 lg:mt-0">

              {/* ... (your existing code for Product Details) */}
              {/* <!-- Description Div --> */}
              <div className="w-full sm:w-96 md:w-8/12 lg:w-6/12 items-center">
                <div className='lg:absolute top-[150px] left-[200px]'>
                  <p className="mb-16 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-white">
                    <Link href="/"> <span>Home </span> </Link> /<Link href="/products"> <span>Products</span> </Link> / <span> {products.name}</span>
                  </p>
                  <h2 className="font-bold lg:text-5xl text-3xl lg:leading-9 leading-7 text-white mt-4">
                    {products.name}
                  </h2>

                  <p className="w-[750px] font-normal text-base leading-6 text-white mt-7">{products.description}</p>
                  <p className="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 text-white mt-6 ">{FormattedPrice(parseInt(products.price))}</p>

                  <div className="lg:mt-11 mt-10">
                    <div className="flex flex-row justify-between">
                      <p className="font-medium text-base leading-4 text-white">Select quantity</p>
                      <div className="flex">
                        <span onClick={minusCount} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer border border-gray-300 border-r-0 w-7 h-7 flex items-center justify-center pb-1 text-white">
                          -
                        </span>
                        <input id="counter" aria-label="input" className="border border-gray-300 h-full text-center w-14 pb-1" type="text" value={count} onChange={(e) => e.target.value} />
                        <span onClick={addCount} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer border border-gray-300 border-l-0 w-7 h-7 flex items-center justify-center pb-1 text-white">
                          +
                        </span>
                      </div>
                    </div>

                    <hr className="bg-white w-full my-2" />
                    <div className=" flex flex-row justify-between items-center mt-4">
                      <p className="font-medium text-base leading-4 text-white">{products.stock}</p>
                      <div className="flex">


                        <div id="quantity" aria-label="quantity" className="bg-white border border-gray-300 h-full text-center w-14 pb-1 rounded">
                          {products.quantity}
                        </div>

                      </div>
                    </div>
                    <hr className="bg-white w-full mt-4" />
                  </div>

                  <button onClick={onHandleCartItems}
                    className="focus:outline-none focus:ring-2 hover:bg-black focus:ring-offset-2 focus:ring-white-800 font-medium text-base leading-4 text-white bg-gray-800 w-full py-5 lg:mt-12 mt-6" >Add to Cart</button>
                </div>
              </div>
            </div>

            <div className='lg:relative top-[30px] left-[700px]'>
              {/* Carousel and Images Div */}
              <div className="w-full lg:w-6/12 flex flex-col lg:gap-8 sm:gap-6 gap-4">
                {/* Preview Images Carousel */}
                <div className="carousel-container" style={{ maxWidth: "500px" }}> {/* Adjust the maxWidth to your preference */}
                  <Slider {...carouselSettings}>
                    <div>
                      {products.image.length > 0 && (
                        <Image src={products.image[ 2 ]} alt={products.name} height={120} width={520} />
                      )}
                    </div>
                    <div>
                      {products.image.length > 0 && (
                        <Image src={products.image[ 1 ]} alt={products.name} height={120} width={520} />
                      )}
                    </div>
                    <div>
                      {products.image.length > 0 ?
                        <Image src={products.image[ 0 ]} alt={products.name} height={120} width={520} /> : null

                      }
                    </div>
                    {/* Add more image items as needed */}
                  </Slider>
                </div>


                {/* ... (remaining existing code) */}

                {/* Images below Carousel */}
                <div className="w-full grid grid-cols-3 gap-4">
                  {products.image.length > 0 && (
                    <Image src={products.image[ 2 ]} alt={products.name} height={120} width={520} />
                  )}
                  {products.image.length > 0 && (
                    <Image src={products.image[ 1 ]} alt={products.name} height={120} width={520} />
                  )}
                  {products.image.length > 0 && (
                    <Image src={products.image[ 0 ]} alt={products.name} height={120} width={520} />
                  )}
                </div>
              </div>
              <div className="w-full lg:w-4/12 grid lg:grid-cols-1 sm:grid-cols-4 grid-cols-2 gap-6">
                {/* ... (your existing code for additional images) */}
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="absolute w-full top-[900px] flex flex-col items-center justify-center text-center text-white ">
        <footer className="h-62 bg-gradient-to-r w-full from-gray-100 via-[#FFBD59] to-gray-100">
          <div className="max-w-screen-xl mt-2 px-2 py-8 mx-auto sm:px-6 lg:px-8">
            <div className="relative top-4 grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div>
                <img src="/logo.png" className="mr-5 h-6 sm:h-6" alt="logo" />
                <p className="max-w-xs mt-4 text-sm text-gray-600">
                  Let us make your trips more comfortable and safe. Leave the worries behind and let{"'"}s begin our journey!
                </p>
                <div className="flex mt-8 space-x-6 text-gray-600">
                  <Link href="https://www.facebook.com/MinervaSalesCorp" className="hover:opacity-75" target="_blank" rel="noreferrer">
                    <span className="sr-only"> Facebook </span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-8 lg:col-span-2 sm:grid-cols-1 lg:grid-cols-4">
                <div>
                  <p className="font-medium text-black">
                    <Link href="/products" className="hover:opacity-75">Products</Link>
                  </p>
                  <nav className="flex flex-col mt-1 space-y-1 text-sm text-black">
                    <Link href="" className="hover:opacity-75"> Tires </Link>
                    <Link href="" className="hover:opacity-75"> Car Battery </Link>
                    <Link href="" className="hover:opacity-75"> Oils </Link>
                    <Link href="" className="hover:opacity-75"> Tire Mags </Link>
                    <Link href="" className="hover:opacity-75"> Car Filters </Link>
                  </nav>
                </div>
                <div>
                  <p className="font-medium text-black">
                    <Link href="/services" className="hover:opacity-75 "> Services </Link>
                  </p>
                  <nav className="flex flex-col mt-1 space-y-1 text-sm text-black">
                    <Link href="" className="hover:opacity-75"> Oil Change </Link>
                    <Link href="" className="hover:opacity-75"> Change Tire </Link>
                    <Link href="" className="hover:opacity-75"> Alignment </Link>
                  </nav>
                </div>
                <div>
                  <p className="font-medium text-black">
                    Helpful Links
                  </p>
                  <nav className="flex flex-col mt-1 space-y-1 text-sm text-black">
                    <Link href="" className="hover:opacity-75"> Contact </Link>
                    <Link href="" className="hover:opacity-75"> About </Link>
                    <Link href="" className="hover:opacity-75"> Live Chat </Link>
                  </nav>
                </div>
                <div>
                  <p className="font-medium text-black">
                    Legal
                  </p>
                  <nav className="flex flex-col mt-1 space-y-1 text-sm text-black">
                    <Link href="" className="hover:opacity-75" > Privacy Policy </Link>
                    <Link href="" className="hover:opacity-75" > Terms &amp; Conditions </Link>
                    <Link href="" className="hover:opacity-75" > Returns Policy </Link>
                  </nav>
                </div>
              </div>
            </div>
            <p className="mt-9 text-xs text-gray-800">
              © 2023 Minerva Sales Corporation
            </p>
          </div>
        </footer>
      </section>
    </div>

  );

};

(ProductDetails as PageWithLayout).layout = HomePageLayout;
export default ProductDetails;

