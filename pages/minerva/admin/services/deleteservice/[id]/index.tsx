import React, { FC, SyntheticEvent, useState, useEffect } from 'react'
import AdminPageLayout from '@/layout/adminpagelayout'
import PageWithLayout from '@/layout/pagewithlayout'
import { useRouter } from 'next/router'
import styles from '@/styles/admin/content.module.scss'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

const Index: FC = () => {

  const [ userid, setUserID ] = useState("")
  const router = useRouter();

  useEffect(() => {
    const cookies = Cookies.get("ecom_token")
    if (cookies) {
      const { userID }: any = jwtDecode(cookies) as any
      setUserID(userID)
    }
  }, [
    userid
  ])

  const onSubmitDeleteServices = async (e: SyntheticEvent) => {
    e.preventDefault();

    const res = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/services/deleteService/${router.query.id}`, {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userID: userid,
      })
    })


    if (!res.ok) {
      alert("There something wrong while updating..")
    } else {
      alert("Successfully Deleted")
      router.push("/minerva/admin/services")
    }

    return res.json();
  }
  return (
    <div className={styles.container}>
      <form onSubmit={onSubmitDeleteServices}>
        <h2>Are you sure do you want to delete this service?</h2>
        <button type="submit">Delete</button>
      </form>
    </div>
  )
}


(Index as PageWithLayout).layout = AdminPageLayout
export default Index