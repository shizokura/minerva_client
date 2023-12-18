import React, { FC, useState, useEffect, SyntheticEvent } from 'react'
import SideNavDash from '@/components/sideNavDash'
import Head from 'next/head'
import { TbSettings, TbUsers } from 'react-icons/tb'
import styles from '@/styles/admin/content.module.scss'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/router'
import 'react-toastify/dist/ReactToastify.css';
import { Toaster, toast } from 'sonner'

const Settings: FC = () => {

  const [ users, setUsers ] = useState<[]>()
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [phone, setPhone] = useState("");
  const [shipping, setShipping] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [ user, setUser ] = useState(null)
  const [ userId, setUserId ] = useState("")

  useEffect(() => {
    const cookies = Cookies.get("ecom_token");
    if (cookies) {
      const { userID }: any = jwtDecode(cookies)
      setUserId(userID)
    }
  }, [])

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
  }, [router, userId ]);


  useEffect(() => {

    users?.map(({email, profile}: any) => {
      setEmail(email)
      setFirstName(profile.firstname)
      setLastName(profile.lastname)
      setShipping(profile.shipping)
      setPhone(profile.phone)
    })
  }, [ users ])

  const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));

  const userEditForm = async (e: SyntheticEvent) => {
    e.preventDefault();

    const response = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/user/updateAccountDetails/${router.query.id}`, {
      method: "PATCH",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstname: firstName,
        lastname: lastName,
        phone: phone,
        shipping: shipping,
        email: email,
        adminUserID: userId // get userId current login
      })
    });

    if (!response.ok) {throw new Error("There is something error while updating");}

    else {
      toast.promise(promise, {
      loading: 'Loading...',
      success: (products) => {
        return `Updated administrator profile succesfully`;
      },
      error: 'Error',
    });

    return response.json();
  };
}

console.log(firstName)
  return (

    <>
<SideNavDash/>

    <div className="h-screen bg-gray-200">
    <div className="flex w-full h-[1050px] bg-gradient-to-r from-amber-200 to-yellow-500 flex-col bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="pt-20 md:pl-96 md:pt-[80px] lt:pl-20 lg:pl-96 sm:pl-24">
                    <div className="p-4 md:p-8">
                        <h1 className="text-black text-center font-bold pb-8 text-4xl md:text-5xl lg:text-6xl">Update Profile Settings</h1>
                            <form encType='multipart/form-data' onSubmit={userEditForm} className="flex flex-col items-center">
                                    <div className="md:w-4/5 lg:w-3/4 xl:w-2/3">
                                            <div className="flex flex-col md:flex-row">
                                                

                                                <label htmlFor="firstname" className="text-lg absolute mt-2.5 text-black font-bold px-1 rounded ">
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
                                                

                                                <label htmlFor="lastname" className="text-lg absolute mt-1.5 text-black font-bold px-1 rounded">
                                                   Last Name
                                                </label>
                                                
                                                <input id="lastname" type="text" name="lastname"
                                                    className="mt-10 py-4 px-4 rounded-md bg-gray-900 text-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-600"
                                                    placeholder="Input last name"
                                                    onChange={(e) => setLastName(e.target.value)} 
                                                    value={lastName}/>

                                           
                                            </div>


                                            <div className="flex flex-col md:flex-row">
                                                

                                                <label htmlFor="email" className="text-lg absolute mt-1.5 text-black font-bold px-1 rounded">
                                                   Email
                                                </label>
                                                
                                                <input id="email" type="email" name="email"
                                                    className="mt-10 py-4 px-4 rounded-md bg-gray-900 text-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-600"
                                                    placeholder="sample@gmail.com"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    value={email}/>

                                           
                                            </div>
                                            <div className="flex flex-col md:flex-row">
                                                

                                                <label htmlFor="shippingAddress" className="text-lg absolute mt-1.5 text-black font-bold px-1 rounded">
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
                    <Toaster richColors/>
</div>
</>

  )
}

export default Settings