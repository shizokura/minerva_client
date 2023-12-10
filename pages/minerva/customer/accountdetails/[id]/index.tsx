import HomePageLayout from '@/layout/homepagelayout'
import PageWithLayout from '@/layout/pagewithlayout'
import React, { FC, useState, useEffect, SyntheticEvent } from 'react'
import styles from '@/styles/customer/customer.module.scss'
import { TbUsers } from 'react-icons/tb'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/router'
import { Toaster, toast } from 'sonner'
import Link from 'next/link'

const AccountDetails: FC = () => {

  const router = useRouter();
  const [ userId, setUserId ] = useState("");
  const [ usersId, setUsersId ] = useState("");
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ phone, setPhone ] = useState("");
  const [ shipping, setShipping ] = useState("");
  const [ email, setEmail ] = useState("");

  const [ users, setUsers ] = useState<[]>()

  useEffect(() => {
    const cookies = Cookies.get("ecom_token");
    if (cookies) {
      const { userID }: any = jwtDecode(cookies)
      setUserId(userID)
    }
  }, [])

  console.log(userId)

  const promise = () => new Promise((resolve) => setTimeout(resolve, 1000));

  useEffect(() => {
    const fetchData = async () => {

      const res = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/user/getUsersId/${router.query.id}`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
        cache: "default",
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch user data: ${res.status}`);
      }

      const result = await res.json();
      setUsers(result)
    };

    fetchData();
  }, [ router ]);

  const userEditForm = async (e: SyntheticEvent) => {
    e.preventDefault();

    const response = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/user/updateAccountDetails/${userId}`, {
      method: "PATCH",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstname: firstName,
        lastname: lastName,
        phone: phone,
        shipping: shipping,
        email: email,
        userID: userId // get userId current login
      })
    });

    if (!response.ok) throw new Error("There is something error while updating");
    else {
      toast.promise(promise, {
        loading: 'Loading...',
        success: (user) => {
          return `Updated account details succesfully`;
        },
        error: 'Error',
      });
    }

    return response.json();
  };

  // Log the values before sending the request
  console.log('Form Values:', {
    firstname: firstName,
    lastname: lastName,
    phone: phone,
    shipping: shipping,
    email: email,
    userId: userId
  });

  useEffect(() => {

    users?.map(({ email, profile }: any) => {
      setEmail(email)
      setFirstName(profile.firstname)
      setLastName(profile.lastname)
      setShipping(profile.shipping)
      setPhone(profile.phone)
    })
  }, [ users ])

  return (

    <div className={styles.bodyProducts}>
      <Toaster richColors />
      <section className="relative mt-4 h-screen pb-12 mb-16 flex flex-col items-center justify-center text-center text-black ">

        <div className={styles.containerEdit}>
          <div className={styles.titleEdit}><TbUsers size={50} className="mr-4" />View and Edit Account Details</div>
          <div className={styles.dividerEdit}></div>

          <div className="flex lg:flex-row flex-col items-center py-6 px-4">
            <div className="w-full mx-28 my-20">
              <div className=" w-full mx-auto">
                <form onSubmit={userEditForm} className='grid grid-cols-1 md:grid-cols-2 gap-16'>
                  <div className="mb-6">
                    <label htmlFor="firstName" className="text-sm font-medium text-gray-900 block mb-2">First Name</label>
                    <input
                      name="firstname"
                      type="text"
                      id="firstName"
                      onChange={(e) => setFirstName(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="Input first name"
                      value={firstName}
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="lastName" className="text-sm font-medium text-gray-900 block mb-2">Last Name</label>
                    <input name="lastname" type="text" id="lastName" onChange={(e) => setLastName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Input last name" value={lastName} required />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2">Email Address</label>
                    <input name="email" type="email" id="email" onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@gmail.com" value={email} required />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="shippingAddress" className="text-sm font-medium text-gray-900 block mb-2">Shipping Address</label>
                    <input name="shipping" type="text" onChange={(e) => setShipping(e.target.value)} id="shippingAddress" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="ex. Espana Blvd., Sampaloc, Manila, Philippines 1008." value={shipping} required />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="phoneNumber" className="text-sm font-medium text-gray-900 block mb-2">Phone Number</label>
                    <input name="phone" type="tel" id="phoneNumber" onChange={(e) => setPhone(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="ex. 905-441-4300" value={phone} required />
                  </div>
                  <br></br>
                  <button type="submit" className="relative left-80  text-black bg-[#FFBD59] hover:bg-[#FFBD59] focus:ring-yellow-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Update Customer Profile</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*  */}
      <section className="relative mt-18 flex flex-col items-center justify-center text-center text-white ">
        <footer className="h-62 bg-gradient-to-r w-full from-gray-100 via-[#FFBD59] to-gray-100">
          <div className="max-w-screen-xl mt-2 px-2 py-8 mx-auto sm:px-6 lg:px-8">
            <div className="relative top-4 grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div>
                <img src="/logo.png" className="mr-5 h-6 sm:h-6" alt="logo" />
                <p className="max-w-xs mt-4 text-sm text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, accusantium.
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

  )
}

(AccountDetails as PageWithLayout).layout = HomePageLayout
export default AccountDetails