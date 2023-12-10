import styles from '@/styles/admin/content.module.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminPageLayout from '@/layout/adminpagelayout'
import PageWithLayout from '@/layout/pagewithlayout'
import React, { FC, useState, useEffect } from 'react'
import Head from 'next/head'
import { TbTrash, TbUsers, } from 'react-icons/tb'
import router from 'next/router'
import Modal from '@/components/Modal';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster, toast } from 'sonner'


const CustomerPage: FC = () => {

  const [ userid, setuserid ] = useState("")

  const [ users, setUsers ] = useState<[]>()
  const [ userId, setUserId ] = useState("")
  const [ page, setPage ] = useState(0)
  const [ isModalOpen, setIsModalOpen ] = useState(false);

  const [ confirmationInput, setConfirmationInput ] = useState('');
  const correctInputValue = 'delete';

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }
  const handleCloseModal = () => {
    setTimeout(() => {
      setIsModalOpen(false);
    }, 5000);
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
  }, [ users ])

  const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setConfirmationInput(e.target.value);
  };

  const onFormDelete = async () => {

    const res = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/user/deleteUser/${userId}`, {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' },
    })

    if (!res.ok) {
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

    <div>
      <Toaster richColors />
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
                      className="py-3 px-4 w-50 flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-[#FFBD59] text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                      disabled={confirmationInput.toLowerCase() !== correctInputValue}
                    >
                      Yes
                    </button>
                    <button type="button" className="py-3 px-4 w-50 flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-[#FFBD59] text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" onClick={handleCloseModal}>No</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>

      <Head>
        <title>Customer Profile</title>
      </Head>
      <div className={styles.titleHead}>
        <div className={styles.icon}><TbUsers size={50} /></div>
        Customer Profile
      </div>
      <div className={styles.container}>
        <div className={styles.title}>Existing Users</div>
        <div className={styles.divider}></div>

        <ul className={styles.responsiveTable}>
          <li className={styles.tableHeader}>
            <div className={styles.col1}>USER ID</div>
            <div className={styles.col2}>Customer Name</div>
            <div className={styles.col3}>Email Address</div>
            <div className={styles.col4}>Action</div>
          </li>

          {users?.map(({ userID, id, email, profile, }: any) => (
            <li key={userID} className={styles.tableRow}>
              <div className={styles.col1} data-label="Job Id">{id}</div>
              <div className={styles.col2} data-label="Customer Name">{profile.firstname} {profile.lastname}</div>
              <div className={styles.col3} data-label="Email Address">{email}</div>
              <div className={styles.col4} data-label="Action">
                {/* <button onClick={() => router.push(`/minerva/admin/customer/editcustomer/${userID}`)} className={styles.col4} > <TbEdit size={25} /> </button> */}
                <button onClick={() => {
                  handleOpenModal();
                  setUserId(userID)
                }} className={styles.col4} > <TbTrash size={25} /> </button>
              </div>
            </li>
          ))}

        </ul>


        <div className={styles.pagination}>
          <button disabled={page === 0} className=' bg-[#FFBD59] hover:bg-blue-700 text-white font-bold mx-4 py-2 px-4 rounded' onClick={() => setPage(() => page - 1)}>Prev</button>
          <button className='bg-[#FFBD59] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => setPage(() => page + 1)}>Next</button>
        </div>          </div>
    </div>




  )
}

(CustomerPage as PageWithLayout).layout = AdminPageLayout
export default CustomerPage