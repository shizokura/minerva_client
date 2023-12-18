import React, { FC, useState, useEffect } from 'react'
import  SideNavDash  from '@/components/sideNavDash'
import { TbUser } from 'react-icons/tb'
import Modal from '@/components/Modal';
import {  TbTrash, TbUsers, } from 'react-icons/tb'
import 'react-toastify/dist/ReactToastify.css';
import { Toaster, toast } from 'sonner'
import { FormattedPrice, FormattedDate } from '@/helpers/index'
import { useRouter } from 'next/router';

const CustomerPage: FC = () => {
  
  const router = useRouter()

  const [ userid, setuserid ] = useState("")
  
  const [ users, setUsers ] = useState<[]>()
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
    const fetchData = async () => {
      const response = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/user/getUserCustomer/?skip=${page}&orderby=desc`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
        cache: "default"
      })


      if (!response.ok) {
        throw new Error("There something wrong while fetching data")
      }

      const result = await response.json();

      setUsers(result)

    }

    fetchData();
  }, [ page, users ])

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

  


  return (
    
    <>

<Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className=" bg-gray-800 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 sm:p-7 " >
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Confirm Delete</h1>
            </div>

            <div className="mt-5 flex flex-col justify-center items-center">
              
            <form onSubmit={onFormDelete}>
              
                <div className="grid gap-y-4">
                <p className="text-center divide-x divide-gray-300 dark:divide-gray-700 text-white">
                Are you sure you want to delete this customer
                </p>
                
                <div className="w-full gap-2">
            <input
              type="text"
              value={confirmationInput}
              onChange={handleChange}
              placeholder="Type 'delete' to confirm"
              className="py-3 px-4 w-full rounded-md border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-black"
              required
            />
            </div>
                <div className='flex gap-2'>
                <button
              type="submit"
              className="py-3 px-4 w-50 flex justify-center items-center gap-2 rounded-md border border-transparent font-bold bg-[#FFBD59] text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-md dark:focus:ring-offset-gray-800"
              disabled={confirmationInput.toLowerCase() !== correctInputValue}
            >
              Yes
            </button>                  
            <button type="button" className="py-3 px-4 w-50 flex justify-center items-center gap-2 rounded-md border border-transparent font-bold bg-[#FFBD59] text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-md dark:focus:ring-offset-gray-800" onClick={handleCloseModal}>No</button>
                </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>


        <title>Customer Management</title>


    <SideNavDash/>

    

    <div className="antialiased font-sans bg-gray-200 sm:pl-20 lg:pl-2">
    <div className="container mx-auto px-4 sm:px-8 2xl:ml-[360px] ">
        <div className="py-12">
            <div>
                <h2 className="text-3xl font-roboto font-bold leading-tight sm:text-[20px]">Customer Management</h2>
            </div> 
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden h-[790px] bg-white">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                    USER ID
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                    CUSTOMER NAME
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                    EMAIL ADDRESS
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                    CREATED AT
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                    ACTION
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                        {users?.map(({ userID, id, email, profile, createdAt }: any) => (
                          
                            <tr key={userID}>
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
                                    <p className="text-gray-900 whitespace-no-wrap">{profile.firstname} {profile.lastname}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                    {email}
                                    </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                    {FormattedDate(createdAt)}
                                    </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
                                    <span
                                        className="relative inline-block px-3 py-1 font-bold text-black leading-tight">
                                        <button onClick={() => {
                              handleOpenModal();
                              setUserId(userID)
                            }} > <TbTrash size={25} /> </button>
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


export default CustomerPage