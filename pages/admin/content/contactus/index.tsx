import React, { FC, useState, useEffect } from 'react'
import  SideNavDash  from '@/components/sideNavDash'
import { TbEdit, TbUser } from 'react-icons/tb'
import Modal from '@/components/Modal';
import {  TbTrash, TbUsers, } from 'react-icons/tb'
import 'react-toastify/dist/ReactToastify.css';
import { Toaster, toast } from 'sonner'
import { FormattedPrice, FormattedDate } from '@/helpers/index'
import { useRouter } from 'next/router';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

const ContactUs: FC = () => {
  
  const router = useRouter()

  const [ userid, setuserid ] = useState("")
  
  const [ contactUs, setContactUs ] = useState<[]>()
  const [ userId, setUserId] = useState("")
  const [ page, setPage ] = useState(0)
  const [ isModalOpen, setIsModalOpen ] = useState(false);

  const [confirmationInput, setConfirmationInput] = useState('');
  const correctInputValue = 'delete';

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }
  const handleCloseModal = () => {
    setTimeout(() => {
      setIsModalOpen(false);
    }, 2000);
  }

  useEffect(() => {
    const cookies = Cookies.get("ecom_token")
    if (cookies) {
      const { userID }: any = jwtDecode(cookies)
      setUserId(userID)
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/contact/getAllContact/`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
        cache: "default"
      })


      if (!response.ok) {
        throw new Error("There something wrong while fetching data")
      }

      const result = await response.json();

      setContactUs(result)

    }

    fetchData();
  }, [ contactUs ])

  const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setConfirmationInput(e.target.value);
  };

  const onFormDelete =  async () => {
    
    const res = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/user/deleteUser/${userId}`, {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' },
    })

    if(!res.ok) {
      alert("There something is eror while updating")
    } else {
      toast.warning(`Customer account has been deleted`)
    }
    if (confirmationInput.toLowerCase() === correctInputValue) {
      // Proceed with the delete operation
      // ...
      console.log('Deleting...');
      handleCloseModal();
    } else {
      // Display an error message or take other appropriate actions
      console.log('Incorrect confirmation input. Deletion aborted.');
    }

    return res.json()
  }

  console.log(contactUs)


  return (
    
    <>
        <title>Customer Management</title>


    <SideNavDash/>

    <button onClick={() => router.push("/admin/content/contactus/addcontactus")} className=" lt:top-14 s8:absolute s8:right-14 fr:absolute fr:right-14 lt:absolute lt:right-14 lg:absolute lg:right-14 lg:top-12 rounded-xl bg-gradient-to-br from-[#f5e725] to-[#FF5555] px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#f5e725]/50">
    <IoMdAddCircleOutline size={15}/>
    </button>

     <div className="antialiased font-sans bg-gray-200">
    <div className="container mx-auto px-4 sm:px-8 2xl:ml-[360px] ">
        <div className="py-12">
            <div>
                <h2 className="text-3xl font-roboto font-bold leading-tight sm:">Contact Us Management</h2>
            </div> 
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden h-[790px] bg-white">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                    Content ID
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                    title
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                    description
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                    ACTION
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                        {contactUs?.map(({ userID, id, contactsID, title, description }: any) => (
                          
                            <tr key={contactsID}>
                                <td className="z-40 px-5 py-5 border-b border-gray-200 bg-white text-md">
                                    <div className="flex items-center">
                                        <div className="ml-3">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                            {id}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                    {title}
                                    </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                    {description}
                                    </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
                                <span
                                        className="relative inline-block px-3 py-1 font-bold text-black leading-tight">
                                                            <button onClick={() => router.push(`/admin/content/contactus/editcontactus/${contactsID}`)}> <TbEdit size={25} /> </button>
                          </span>
                                </td>
                            </tr>
                             ))}
                             <tr>
                              <td className="px-5 bg-white text-sm"></td>
                              </tr> 
                             
                                
                        </tbody>
                    </table>
                    
                    <div
                        className="px-5 py-5 bg-white border-t  flex items-center justify-center xs:flex-row xs:justify-center          ">
                        <div className="inline-flex mt-2 xs:mt-0 gap-4">
                            <button disabled={page === 0 }
                                className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l" onClick={() => setPage(()=> page - 1)}>
                                Prev
                            </button>
                            <button
                                className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r" onClick={() => setPage(() => page + 1)}>
                                Next
                            </button>
                        </div>
                    </div>
                    
                    </div>
                </div>
            </div>
        </div>
    </div>


  </>
  )
}


export default ContactUs