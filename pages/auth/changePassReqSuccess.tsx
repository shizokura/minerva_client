import React, { useState, SyntheticEvent } from 'react'
import Image from 'next/image'
import router from 'next/router'
import Modal from '@/components/Modal';
import HomePageLayout from '@/layout/homepagelayout'
import PageWithLayout from '@/layout/pagewithlayout'
import styles from '@/styles/customer/customer.module.scss'
import { IoCartOutline } from "react-icons/io5";
import { IoMdArrowDropright } from "react-icons/io";
import { FaUserClock } from "react-icons/fa6";
import { IoMailUnread } from "react-icons/io5";
import Link from 'next/link';

export default function ChangePasswordReqSuccess() {


  const [ isModalOpen, setIsModalOpen ] = useState(true);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.push("/")
  };

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className=" bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 sm:p-7 " >
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 ">Change Password Successful</h1>
            </div>

            <div className="mt-5 flex flex-col justify-center items-center">
              <IoMailUnread size={60} className=" mb-3" />
              <p className="text-center divide-x divide-gray-700 ">
                The verification link for your forgot password request is now sent to the email you provided. Please see the email, if you cannot see an email from us, please double-check the spam folder.
              </p>
            </div>
          </div>
        </div>
      </Modal>


    </div>
  )
}
(ChangePasswordReqSuccess)