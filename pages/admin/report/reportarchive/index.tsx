
import React, { FC, useState, useEffect } from 'react'
import Head from 'next/head'
import { TbFilter, TbEye, TbArchive } from 'react-icons/tb'
import router from 'next/router'
import { format } from 'date-fns'
import { FormattedDate } from '@/helpers'
import SideNavDash from '@/components/sideNavDash'

const AuditLog: FC = () => {

  const [ orderBy, setOrderBy ] = useState("")
    const [ page, setPage] = useState(0)
      

    const [ isOpen, setIsOpen ] = useState(false);
    const [ archive, setArchive ] = useState<[]>()
    const [ archiveId, setArchiveId ] = useState("")
    const [ search, setSearch ] = useState("")
  const [ productSearch, setProductSearch ] = useState<any>(null)
  
    const [ dateFilters, setDateFilters ] = useState("Daily")
    const filters =["Daily", "Weekly", "Monthly"];
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const [ isOpen1, setIsOpen1 ] = useState(false);
  
    const toggleDropdown1 = () => {
      setIsOpen1(!isOpen1);
    };
  
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/product/getSearchProduct/?search=${search}`, {
          method: "GET",
          headers: { 'Content-Type': 'application/json' },
        })
        const result = await response.json()
        setProductSearch(result)
      }
      fetchData()
    }, [ productSearch, search ])
  
    useEffect(() => {
      const fetchData = async () => {
        const res = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/archive/getAllArchive/?filter=${dateFilters}&skip=${page}&orderby=desc`, {
          method: "GET",
          headers: { 'Content-Type': 'application/json' },
          cache: "default"
        })
  
        const result = await res.json();
        setArchive(result)
      }
      fetchData()
    }, [ archive ])

    console.log(archive)

  return (
    <>


        <title>Report Archive</title>


    <SideNavDash/>

    <div className="absolute z-20 top-[40px] right-72 flex items-center w-[140px] lg:w-[220px] mx-auto bg-white border-2 border-black rounded-md text-sm " x-data="{ search: '' }">
          <div className="w-full">
          
            <input type="search" className="w-full px-4 py-1 text-gray-800 rounded-lg focus:outline-none "
              placeholder="search" onChange={(e) => setSearch(e.target.value)}/>
          </div>
          
          <div>
            <button type="submit" className="flex items-center border-2 bg-[#FFBD59] justify-center w-12 h-12 text-white rounded-r-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </div>
        </div> 

    <div className="antialiased font-sans bg-gray-200 sm:pl-20 lg:pl-2">
    <div className="container mx-auto px-4 sm:px-8 2xl:ml-[360px] ">
        <div className="py-12">
            <div>
                <h2 className="text-3xl font-roboto font-bold leading-tight sm:">Report Archive</h2>
            </div> 
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden h-[790px] bg-white">
                <div className="absolute top-6 right-6 mb-6">
                                <div className="relative inline-block text-left">
                                  <div>
                                    <button type="button" className="flex mt-8 gap-4 justify-center lg:mr-6 lg:w-[220px] sm:w-10 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                                      onClick={toggleDropdown}
                                    >
                                      <span className='lg:flex sm:hidden'>
                                    {dateFilters === "" ? "Filters" : dateFilters}
                                    </span>
                                     <span className='pt-[2px]'><TbFilter/></span>
                                    </button>
                                  </div>
                                  <div className={`w-full bg-white flex flex-col rounded-md shadow-lg bg-primary-100 p-4 text-primary-600 ${isOpen ? 'w-[220px] absolute z-10' : 'hidden'}`}>
                {isOpen ? (
                  filters.map((name) => (
                    <button
                    name="filters"
                      className='text-left'
                      type="button"
                      key={name}
                      value={name}
                      onClick={(e) => setDateFilters(e.currentTarget.value)}
                    
                      >
                      {name}
                    </button>
                  ))
                ) : null}
              </div></div>
              </div>

                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                    Archive ID
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                   Administrator Name
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                   Date Created
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                   File Type
                                </th>

                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-[#FFBD59] text-left text-md font-bold text-black uppercase tracking-wider">
                                   Action
                                </th>

                            </tr>
                        </thead>
                        <tbody>

          {archive?.map(({ archieveID, id, startDate, firstname, lastname, endDate, createdAt, User, updatedAt}: any) => (
                            <tr key={archieveID}>
                                <td className="z-40 px-5 py-5 border-b border-gray-200 bg-white text-md">
                                    <div className="flex items-center">
                                        <div className="ml-3">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                            {id}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
                                    <p className="text-gray-900 whitespace-no-wrap">{firstname} {lastname}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                    {FormattedDate(createdAt)}
                                    </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
                                    <p className="text-gray-900 whitespace-no-wrap">Sales Report</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
                                <button onClick={() => router.push(`/admin/report/reportarchive/viewreportarchive/${archieveID}`)}> <TbEye className='ml-5' size={25} /> </button>
                                </td>
                            </tr>
                             ))
                        }
                             <tr>
                              <td className="px-5 bg-white text-sm"></td>
                            </tr> 
                             
                                
                        </tbody>
                    </table>
                    
                    <div
                        className="px-5 py-5 bg-white border-t  flex items-center justify-center xs:flex-row xs:justify-center          ">
                        <div className="inline-flex mt-2 xs:mt-0 gap-4">
                            <button disabled={page === 0 }
                                className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l" onClick={() => setPage(()=> page - 1)}>
                                Prev
                            </button>
                            <button
                                className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r" onClick={() => setPage(() => page + 1)}>
                                Next
                            </button>
                        </div>
                    </div>
                    
                    </div>
                </div>
            </div>
        </div>
    </div>


  </>


    

  )
}


export default AuditLog