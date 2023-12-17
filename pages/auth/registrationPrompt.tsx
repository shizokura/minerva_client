import React, { useState, SyntheticEvent } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Modal from '@/components/Modal';
import HomePageLayout from '@/layout/homepagelayout'
import PageWithLayout from '@/layout/pagewithlayout'
import styles from '@/styles/customer/customer.module.scss'
import { IoCartOutline, IoMailUnread } from "react-icons/io5";
import { IoMdArrowDropright } from "react-icons/io";
import { FaUserClock } from "react-icons/fa6";
import Link from 'next/link';

export default function RegistrationPrompt() {

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
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Confirm Registration</h1>
            </div>

            <div className="mt-5 flex flex-col justify-center items-center">
              <IoMailUnread size={60} className="text-white mb-3" />
              <p className="text-center divide-x divide-gray-300 dark:divide-gray-700 text-white">
                The verification link for the registration of your account is now sent to the email you provided. Please see the email, if you cannot see an email from us, please double-check the spam folder.
              </p>
            </div>
          </div>
        </div>
      </Modal>


    </div>
  )
}
(RegistrationPrompt)