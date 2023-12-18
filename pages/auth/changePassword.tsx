import React, { useState, SyntheticEvent } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Modal from '@/components/Modal';
import HomePageLayout from '@/layout/homepagelayout'
import PageWithLayout from '@/layout/pagewithlayout'
import styles from '@/styles/customer/customer.module.scss'
import { IoCartOutline } from "react-icons/io5";
import { IoMdArrowDropright } from "react-icons/io";
import { FaUserClock } from "react-icons/fa6";
import Link from 'next/link';

export default function ChangePassword() {

  const router = useRouter();
  const [ isModalOpen, setIsModalOpen ] = useState(true);
  const [ email, setEmail ] = useState("")
  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.push("/")
  };




  const onSubmitChangePass = async (e: SyntheticEvent) => {
    e.preventDefault();
    const res = await fetch("https://minervasales-23b0919d60c1.herokuapp.com/user/requestPasswordReset", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email
      })
    })

    if (res) {
      router.push("/auth/changePassReqSuccess")
    }
    return res.json();
  }

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className=" bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 sm:p-7 " >
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800">Forgot password?</h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Remember your password?
                <a className="text-blue-600 decoration-2 hover:underline font-medium pl-1" href="#">
                  Login here
                </a>
              </p>
            </div>

            <div className="mt-5">
              <form onSubmit={onSubmitChangePass}>
                <div className="grid gap-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold ml-1 mb-2 text-black">Email address</label>
                    <div className="relative">
                      <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm" required aria-describedby="email-error" />
                    </div>
                    <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                  </div>
                  <button type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-[#FFBD59] text-black hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" onClick={() => router.push("/auth/changePassReqSuccess")}>Reset password</button>
                </div>
              </form>
              <p className="mt-3 flex justify-center items-center text-center divide-x divide-gray-300 dark:divide-gray-700">
                <a className="pr-3.5 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-blue-600 dark:text-gray-500 dark:hover:text-gray-200" href="#" target="_blank">
                  Back to Home
                </a>
                <a className="pl-3 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-blue-600 dark:text-gray-500 dark:hover:text-gray-200" href="#">
                  Contact us!
                </a>
              </p>
            </div>
          </div>
        </div>
      </Modal>


    </div>
  )
}
(ChangePassword)
