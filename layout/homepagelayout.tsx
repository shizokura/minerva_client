import HeaderNavbar from '@/components/headerNav'
import HeaderNavbarAuth from '@/components/headerNavAuth'
import React, { ReactNode, useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'



export default function HomePageLayout({children}: { children: ReactNode}) {
  

  // const [ user, setuser ] = useState("")
  // useEffect(() => {
  //   const cookies = Cookies.get("ecom_token")
  //   setuser(cookies as any)
  // }, [ user ])
  
  return (
    <div>
      <HeaderNavbar />
        {children}
    </div>
  )
}
