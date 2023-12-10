import styles from '@/styles/admin/content.module.scss'
import AdminPageLayout from '@/layout/adminpagelayout'
import PageWithLayout from '@/layout/pagewithlayout'
import React, { FC, useState, useEffect, SyntheticEvent } from 'react'
import Head from 'next/head'
import { TbUsers } from 'react-icons/tb'
import { useRouter } from 'next/router'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
import 'react-toastify/dist/ReactToastify.css';
import { Toaster, toast } from 'sonner'

const EditCustomerPage: FC = () => {

  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [usersId, setUsersId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [shipping, setShipping] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const cookies = Cookies.get("ecom_token");
    if (cookies) {
      const { userID }: any = jwtDecode(cookies);
      setUserId(userID);
    }
  }, []);

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

        // Check if the result array is not empty
        if (result && result.length > 0) {
          const userProfile = result[0].profile;

          setFirstName(userProfile.firstname);
          setLastName(userProfile.lastname);
          setPhone(userProfile.phone);
          setShipping(userProfile.shipping);
          setEmail(result[0].email);
        } else {
          console.error("User data not found or empty array.");
          // Handle the case where user data is not available
        }
      };
      
    fetchData();
  }, [router ]);

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

    if (!response.ok) throw new Error("There is something error while updating");

    return response.json();
  };

   // Log the values before sending the request
   console.log('Form Values:', {
    firstname: firstName,
    lastname: lastName,
    phone: phone,
    shipping: shipping,
    email: email,
    adminUserID: userId
  });

  return (
    <div>
      <Head>
        <title>Customer Profile Settings</title>
      </Head>

      <div className={styles.titleHead}>
        <div className={styles.icon}><TbUsers size={50} /></div>
        Customer Profile Settings
      </div>

      <div className={styles.container}>
        <div className={styles.title}>Edit Profile Details</div>
        <div className={styles.divider}></div>

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
                <button type="submit" className="relative left-80  text-black bg-[#FFBD59] hover:bg-[#FFBD59] focus:ring-yellow-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={() => router.back()}>Update Customer Profile</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

(EditCustomerPage as PageWithLayout).layout = AdminPageLayout;
export default EditCustomerPage;
