import React, { ReactNode } from 'react'
import Sidebar from '@/components/sideNav'
import styles from './adminpagelayout.module.scss'
import HeaderAdminNavBar from '@/components/admin/headerNav'
export default function AdminPageLayout({ children }: { children: ReactNode}) {
  return (
    <div className={styles.container}>
        <Sidebar />
        <div className={styles.bodyContainer}>
        <HeaderAdminNavBar />
          {children}
        </div>

    </div>
  )
}
