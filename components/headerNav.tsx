import React, { useEffect, useState } from 'react'
import { useRouter} from 'next/router'
import Link from 'next/link'
import styles from '@/styles/Navbar/navbar.module.scss'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import Cookies from 'js-cookie'
import { TbMenu2, TbCircleArrowRight , TbBrandWechat ,TbCalendar, TbShoppingBag, TbSettings } from 'react-icons/tb'
import  dynamic from 'next/dynamic'
import { jwtDecode } from 'jwt-decode'


const customer = [
  { name: "Home", url: "/"},  
  {
    name: "Products", url: "/product"
  },
  {
    name: "Services", url: "/services"
  },

  {
    name: "About", url: "/about"
  },
  {
    name: "Contact", url: "/contact"
  }
]


const poppins = Poppins({
  weight: "500",
  subsets: ["latin"]
})






export default function HeaderNavbar() {

  const router = useRouter();

  const [userId, setUserId] = useState("");

  useEffect(() => {
    const cookies = Cookies.get("ecom_token");
    if (cookies) {
      const { userID }: any = jwtDecode(cookies)
      setUserId(userID)
    }
  }, [])

  const dropdownItems = [
    { label: 'Account Details', value: 'Account Details', icon: <TbSettings size="20px" />, url: `/minerva/customer/accountdetails/${userId}` },
    { label: 'View Orders', value: 'View Orders', icon: <TbShoppingBag size="20px" />, url: "/minerva/customer/vieworders" },
    { label: 'View Appointments', value: 'View Appointments', icon: <TbCalendar size="20px" />, url: "/minerva/customer/viewappointments" },
  ];



  const [ mobile, setMobile ] = useState(false)
  const [ user, setUsers ] = useState("")
  const [isOpen, setIsOpen] = useState(false);
  const [ carts, setCartLength ] = useState<[]>()


  // useEffect(() => {
  //   const cartLength = JSON.parse(localStorage.getItem("products") as any)
  //   if(cartLength) setCartLength(cartLength as any)
  // }, [])

  useEffect(() => {
    const cookies = Cookies.get("ecom_token")
    setUsers(cookies as any)
  }, [ user ])


  

  const onHandleLoginBtn = () => {
      router.push("/auth/login")
  }

  const onHandleCartBtn = () => {
    router.push("/cart")
}

  const onHandleMobileNavigation = () => {
    setMobile(() => !mobile)
  }
  return (
    <div className={styles.container}>
      <div className={styles.containerLogo}>
        <Image src="/logo.png" alt="" height={20} width={100} />
        <span className={poppins.className}>Minerva Sales Corporation</span>
      </div>
      {
        mobile ? 
        <div className={styles.mobileContainer}>
          <div className={styles.mobileHeader}>
            <button onClick={onHandleMobileNavigation}>
              <TbMenu2 size={30}/>
            </button>
          </div>
          <div className={styles.mobNavbar}>
          {customer.map(({name, url}) => (
          <Link key={name} className={router.pathname === url ? ` ${poppins.className} ${styles.active} : ${poppins.className}` : `${poppins.className}`}
          onClick={onHandleMobileNavigation}
          href={url}>{name}</Link>
        ))}
          </div>
          <div className={styles.mobileBtns}>
          <button className={styles.loginBtn} type="button" onClick={onHandleLoginBtn}>
               <span className={poppins.className}>Login</span>
          </button>
          <button className={styles.cartBtn}>
                <span className={poppins.className}>Cart (0)</span>
            </button>
        </div>
        </div> : null
      }
      <div className={styles.mobileNavbar}>
        <button onClick={onHandleMobileNavigation}>
           <TbMenu2 size={30} />
        </button>
      </div>
      <div className={styles.webNavBar}>
          <div className={styles.navbar}>
        {customer.map(({name, url}) => (
          <Link key={name} className={router.pathname === url ? ` ${poppins.className} ${styles.active} : ${poppins.className}` : `${poppins.className}`} href={url}>{name}</Link>
        ))}
        </div>
        
          {user ? 
          
          <div className={poppins.className}>
            <div className="relative -top-0 inline-block text-left">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="flex justify-center items-center gap-x-2 px-4 border-none rounded-md bg-[#FFBD59] text-sm font-medium text-white"
            id="dropdown-menu"
            aria-haspopup="true"
            aria-expanded="true"
          >
            Profile
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
      <path stroke-linecap="round"  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
    
          </button>
    
          {isOpen && (
            <div
              className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white opacity-75 ring-1 ring-black ring-opacity-2"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="dropdown-menu"
            >
              <div className="text-right py-1" role="none">
                {dropdownItems.map((item) => (
                  <a 
                    key={item.value}
                    href={item.url}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    <div className='inline-flex gap-x-2 '>
                    {item.label}
                    {item.icon}
                    </div>
    
                  </a>
                ))}
                <button onClick={() => {
                  Cookies.remove("ecom_token")
                  router.push("/auth/login")
                }} type="button"><span className='inline-flex gap-x-2 px-4 py-2 text-sm text-gray-700'>
                  Logout<TbCircleArrowRight size="20px" /></span></button>

              </div>
            </div>
          )}
        </div>
        </div>
         : 
            
         <button className={styles.loginBtn} type="button" onClick={onHandleLoginBtn}>
         <span className={poppins.className}>Login</span>
       </button>}

            <button className={styles.cartBtn} type="button" onClick={onHandleCartBtn}>
            <span className={poppins.className}>Cart</span>
            </button>
           
      </div>
    </div>
  )
}
