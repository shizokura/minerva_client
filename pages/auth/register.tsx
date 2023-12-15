import React, { SyntheticEvent, useState } from 'react'
import Image from 'next/image'
import router, { useRouter } from 'next/router'
import Modal from '@/components/Modal';
import { IoCartOutline, IoMailUnread } from "react-icons/io5";

export default function Register() {

  const router = useRouter();
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ email, setEmail ] = useState("")

  const [ register, setRegister ] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    shipping: "",

  })


  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }
  const [ showPassword, setShowPassword ] = useState(false);

  const [ showCPassword, setShowCPassword ] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleCPasswordVisibility = () => {
    setShowCPassword(!showCPassword);
  };

  const [ retype, retypPassword ] = useState("")

  const [ errorMessages, setErrorMessages ] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    shipping: '',
    phone: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrorMessages = { ...errorMessages };

    // Validate First Name
    if (!/^[A-Za-z\s]+$/.test(register.firstname)) {
      newErrorMessages.firstname = 'Please enter a valid first name (letters and spaces only)';
      isValid = false;
    } else {
      newErrorMessages.firstname = '';
    }

    // Validate Last Name
    if (!/^[A-Za-z]+$/.test(register.lastname)) {
      newErrorMessages.lastname = 'Please enter a valid last name (letters only)';
      isValid = false;
    } else {
      newErrorMessages.lastname = '';
    }

    // Validate Email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(register.email)) {
      newErrorMessages.email = 'Please enter a valid email address';
      isValid = false;
    } else {
      newErrorMessages.email = '';
    }

    // Validate Password
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(register.password)) {
      newErrorMessages.password =
        'Password must be at least 8 characters long, with a mix of uppercase, lowercase, and numbers';
      isValid = false;
    } else {
      newErrorMessages.password = '';
    }

    // Validate Confirm Password
    if (register.password !== register.password) {
      newErrorMessages.confirmPassword = 'Passwords do not match';
      isValid = false;
    } else {
      newErrorMessages.confirmPassword = '';
    }

    // Validate Shipping Address
    if (!register.shipping.trim()) {
      newErrorMessages.shipping = 'Shipping address is required';
      isValid = false;
    } else {
      newErrorMessages.shipping = '';
    }

    // Validate Phone Number
    if (!/^\d{11}$/.test(register.phone)) {
      newErrorMessages.phone = 'Please enter a valid 11-digit phone number';
      isValid = false;
    } else {
      newErrorMessages.phone = '';
    }

    setErrorMessages(newErrorMessages);
    return isValid;
  };

  

  const onHandleRegister = async (e: SyntheticEvent) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      const res = await fetch("https://minervasales-23b0919d60c1.herokuapp.com/user/createCustomer", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: register.email,
          password: register.password,
          firstname: register.firstname,
          lastname: register.lastname,
          phone: register.phone,
          shipping: register.shipping
        })
      })
      return res.json()
    }


  }
  return (



    <div className="h-screen md:flex">
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
      <div
        className="relative overflow-hidden md:flex w-1/2 i justify-around items-center hidden">
        <div>
          <Image src="/loginregister.jpeg" alt="" height={10} width={1000}></Image>
        </div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      </div>
      <div className="flex md:w-1/2 h-screen lg:h-screen justify-center py-10 items-center bg-gradient-to-r  from-[#FFBD59] via-gray-50 to-[#FFBD59]">
        <form onSubmit={onHandleRegister}>
          <h1 className="text-gray-800 font-bold text-2xl mb-1">Welcome!</h1>
          <p className="text-sm font-normal text-gray-600 mb-7">Create an account in <span className='font-medium text-[#FFBD59]'>Minerva Sales Corporation</span></p>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input
                className="pl-2 outline-none border-none"
                type="text"
                name=""
                id=""
                placeholder="First Name"
                pattern="^[A-Za-z\s-]+$"
                title="Please enter a valid first name (letters only)"
                onChange={(e) => setRegister({ ...register, firstname: e.target.value })}
              />
            </div>

            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>

              <input
                className="pl-2 outline-none border-none"
                type="text"
                name="lastname"
                id=""
                placeholder="Last Name"
                pattern="^[A-Za-z\s-]+$"
                title="Please enter a valid last name (letters only)"
                onChange={(e) => setRegister({ ...register, lastname: e.target.value })}
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
              </svg>

              <input
                className="pl-2 outline-none border-none"
                type="text"
                name=""
                id=""
                placeholder="Email Address"
                pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                title="Please enter a valid email address"
                onChange={(e) => setRegister({ ...register, email: e.target.value })}
              />
            </div>

            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>

              <input
                className="pl-2 outline-none border-none"
                type={showPassword ? "text" : "password"}
                name=""
                id=""
                placeholder="Password"
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                title="Password must be at least 8 characters long, with a mix of uppercase, lowercase, and numbers"
                onChange={(e) => setRegister({ ...register, password: e.target.value })}
              />
              <button onClick={togglePasswordVisibility} className="focus:outline-none ml-2">
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm51.3 163.3l-41.9-33C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5zm-88-69.3L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8z" /></svg>
                )}
              </button>
            </div>

            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>

              <input
                className="pl-2 outline-none border-none"
                type={showCPassword ? "text" : "password"}
                name=""
                id=""
                placeholder="Confirm Password"
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                title="Password must be at least 8 characters long, with a mix of uppercase, lowercase, and numbers"
              />
              <button onClick={toggleCPasswordVisibility} className="focus:outline-none ml-2">
                {showCPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm51.3 163.3l-41.9-33C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5zm-88-69.3L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8z" /></svg>
                )}
              </button>
            </div>

            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>

              <input
                className="pl-2 outline-none border-none"
                type="text"
                name=""
                id=""
                placeholder="Shipping Address"
                onChange={(e) => setRegister({ ...register, shipping: e.target.value })}
              />
            </div>


            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
              </svg>

              <input
                className="pl-2 outline-none border-none"
                type="tel"
                name=""
                id=""
                placeholder="Phone Number"
                pattern="^\d{11}$"
                title="Please enter a valid 10-digit phone number"
                onChange={(e) => setRegister({ ...register, phone: e.target.value })}
              />
            </div>

          </div>
          <button type="submit" className="block w-full bg-[#FFBD59] mt-4 py-2 rounded-2xl text-black font-semibold mb-2" onClick={handleOpenModal}>Register</button>
          {/* Display error messages */}
          {Object.values(errorMessages).map((error, index) => (
            error && <p key={index} className="text-red-500 text-sm">{error}</p>
          ))}
          <span className="text-sm ml-2"> Already have an Account? <span onClick={() => router.push("/auth/login")} className="text-sm hover:text-blue-500 cursor-pointer">Login.</span></span>
        </form>
      </div>
    </div>

  )
}


