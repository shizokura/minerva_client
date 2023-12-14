
import React, { FC, useEffect, useState } from 'react'
import Head from 'next/head'
import { TbEdit, TbTrash, TbUsers, TbFiles, TbCalendar, TbShoppingBag, TbClock, TbGraph, TbFileAnalytics, TbList, TbArchive, TbClipboard, TbMessage, TbSettings2, TbLogout2, TbArrowLeft, TbChevronLeft, TbChevronRight, TbDownload } from 'react-icons/tb'
import { useRouter } from 'next/router'
import ArchivePDF from '@/components/archivePDF'
import Image from 'next/image'
import SideNavDash from '@/components/sideNavDash'


const View: FC = () => {

  const router = useRouter();
  

  const [ archive, setArchive ] = useState<any>(null)
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/archive/getAllArchive/${router.query.id}`, {
        method: "GET",
        cache: "default",
      })
      const result = await res.json();

      setArchive(result)
    }
    fetchData()
  }, [ router, archive ])
  
  console.log(archive)

  return (
    <>
    <SideNavDash/>
    
        <div className="h-screen bg-gray-200">
        <div className="flex w-full h-[1050px] bg-gradient-to-r from-amber-200 to-yellow-500 flex-col bg-white bg-clip-border text-gray-700 shadow-md">
        <div>
        <div className='text-3xl font-roboto font-bold leading-tight lg:ml-[400px] lg:mt-10'>Viewing Report Archive {archive?.id}</div>
        <div ></div>

        <div>

          <div className='flex justify-center'>

      <ArchivePDF generate={archive} /> 

</div>
        </div>
      </div>
                        </div>
    </div>
    </>
  )
}

export default View