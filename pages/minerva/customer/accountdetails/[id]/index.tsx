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

    <div className={styles.bodyEditCustomer}>
    <Toaster richColors  />
    <div className='lg:pl-[555px] pt-80'>
    <div className="flex mx-10 lg:w-[800px] lg:h-[800px] bg-gradient-to-r rounded-3xl from-amber-200 to-yellow-500 flex-col bg-white bg-clip-border text-gray-700 shadow-md">
               <div className="pt-20 md:pl-0 md:pt-[80px]">
               <h1 className="text-black text-center font-bold pb-8 text-4xl md:text-5xl lg:text-4xl">Update Profile Settings</h1>
   
                       <div className="p-4 md:p-8">
                               <form encType='multipart/form-data' onSubmit={userEditForm} className="flex flex-col items-center">
                                       <div className="md:w-4/5 lg:w-3/4 xl:w-2/3">
                                               <div className="flex flex-col md:flex-row">
                                                   
   
                                                   <label htmlFor="firstname" className="text-md lg:text-lg absolute mt-2.5 text-black font-bold px-1 rounded ">
                                                      First Name
                                                   </label>
                                                   
                                                   <input id="firstname" type="text" name="firstname"
                                                       className="mt-10 py-4 px-4 pb-4 rounded-md bg-gray-900 text-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-600"
                                                       placeholder="Input first name"
                                                       onChange={(e) => setFirstName(e.target.value)}
                                                       value={firstName}
                                                       required/>
   
                                              
                                               </div>
   
                                               <div className="flex flex-col md:flex-row">
                                                   
   
                                                   <label htmlFor="lastname" className="text-md lg:text-lg absolute mt-1.5 text-black font-bold px-1 rounded">
                                                      Last Name
                                                   </label>
                                                   
                                                   <input id="lastname" type="text" name="lastname"
                                                       className="mt-10 py-4 px-4 rounded-md bg-gray-900 text-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-600"
                                                       placeholder="Input last name"
                                                       onChange={(e) => setLastName(e.target.value)} 
                                                       value={lastName}/>
   
                                              
                                               </div>
   
   
                                               <div className="flex flex-col md:flex-row">
                                                   
   
                                                   <label htmlFor="email" className="text-md lg:text-lg absolute mt-1.5 text-black font-bold px-1 rounded">
                                                      Email
                                                   </label>
                                                   
                                                   <input id="email" type="email" name="email"
                                                       className="mt-10 py-4 px-4 rounded-md bg-gray-900 text-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-600"
                                                       placeholder="sample@gmail.com"
                                                       onChange={(e) => setEmail(e.target.value)}
                                                       value={email}/>
   
                                              
                                               </div>
                                               <div className="flex flex-col md:flex-row">
                                                   
   
                                                   <label htmlFor="shippingAddress" className="text-md lg:text-lg absolute mt-1.5 text-black font-bold px-1 rounded">
                                                      Shipping Address
                                                   </label>
                                                   
                                                   <input id="shippingAddress" type="text" name="shippingAddress"
                                                       className="mt-10 py-4 px-4 rounded-md bg-gray-900 text-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-600"
                                                       placeholder="ex. Espana Blvd., Sampaloc, Manila, Philippines 1008."
                                                       onChange={(e) => setShipping(e.target.value)}
                                                       value={shipping}/>
   
                                              
                                               </div>
   
                                               <div className="flex flex-col md:flex-row">
                                                   
   
                                                   <label htmlFor="phone" className="text-lg absolute mt-1.5 text-black font-bold px-1 rounded">
                                                      Phone Number
                                                   </label>
                                                   
                                                   <input id="phone" type="text" name="phone"
                                                       className="mt-10 py-4 px-4 rounded-md bg-gray-900 text-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-600"
                                                       placeholder="ex. 0912 345 6789"
                                                       onChange={(e) => setPhone(e.target.value)}
                                                       defaultValue={phone}/>
   
                                              
                                               </div>
                                               </div>   
                                   <button
                                       className="border-2 text-md font-bold mt-5 rounded-md py-2 px-4 bg-[#FFBD59] shadow-md shadow-black hover:bg-yellow-500 text-gray-900 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-900">
                                       Update Details
                                   </button>
                               </form>
                               
                       </div>
                       </div>    
                       </div>
                       </div>
                       <section className="relative w-full mt-10 flex flex-col items-center justify-center text-center text-white ">
             <footer className="py-10 w-full flex flex-col space-y-10 justify-center bg-gradient-to-r from-gray-100 via-[#FFBD59] to-gray-100">
   
   <nav className="flex justify-center flex-wrap gap-6 text-gray-500 font-medium">
       <Link className="text-black hover:text-gray-500" href="#">Home</Link>
       <Link className="text-black hover:text-gray-500" href="#">Products</Link>
       <Link className="text-black hover:text-gray-500" href="#">Services</Link>
       <Link className="text-black hover:text-gray-500" href="#">About</Link>
       <Link className="text-black hover:text-gray-500" href="#">Contact</Link>
   </nav>
   
   <div className="flex justify-center space-x-5">
       <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
           <img src="https://img.icons8.com/fluent/30/000000/facebook-new.png" />
      </Link>
     
   </div>
   <p className="text-center text-gray-700 font-medium">&copy; 2023 Minerva Sales Corporation. All rights reservered.</p>
   </footer>
   
             </section>
           </div>

  )
}

(AccountDetails as PageWithLayout).layout = HomePageLayout
export default AccountDetails