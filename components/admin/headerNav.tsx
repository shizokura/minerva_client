import React, {  useState, useEffect } from 'react'
import styles from '@/styles/admin/header.module.scss'
import { TbUsers } from 'react-icons/tb'
import { useRouter, } from 'next/router'
import Link from 'next/link'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
import { useLocalStorageValue } from '@react-hookz/web'

export default function HeaderAdminNavBar() {
  
  return (
    <div className={styles.container}>
      <div className={styles.Hello}>
        Hello Admin
      </div>
    </div>
  )
}
