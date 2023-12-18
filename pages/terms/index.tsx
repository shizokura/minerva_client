import Link from 'next/link'
import React, { FC, FormEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import HomePageLayout from '@/layout/homepagelayout'
import PageWithLayout from '@/layout/pagewithlayout'

const About: FC = () => {
    return (
        <>

<div className="flex min-h-screen items-center justify-center">
    <section  className="px-40">
                    <div  className="mb-24 text-center">
                        <h3  className="block antialiased font-sans font-semibold relative mb-5 mt-10 text-center text-2xl leading-tight tracking-normal text-black"> We’ve got answers </h3>
                        <h1  className="block antialiased font-sans relative my-5 text-center text-4xl font-bold leading-tight tracking-normal text-black md:text-5xl"> Frequently Asked Questions </h1>
                        <p  className="block antialiased font-sans relative my-5 mx-auto text-center text-lg font-normal leading-relaxed tracking-normal text-gray-600 md:text-xl lg:max-w-4xl"> Check out what other people are usually interested in! </p>
                    </div>
        <div  className="grid grid-cols-12 ">
        <hr  className="my-6 border-blue-gray-50"/>
            <h5  className="block antialiased tracking-normal font-sans text-xl 
            leading-snug text-inherit mt-6 mb-1 font-semibold !text-black"> Can you use Tailwind CSS with Angular? </h5>
            <div  className="block antialiased font-sans text-base leading-relaxed 
            mb-4 font-normal text-gray-600"> Yes, you can surely use the Tailwind CSS 
            framework with Angular. Tailwind CSS is a popular utility-first CSS framework that can be integrated into Angular projects. It provides a set of pre-designed utility classNamees that can help streamline your styling and layout efforts when building Angular applications. Check our documentation that explains how you can easily integrate them. </div>

        </div>
        <div className="w-full pt-5 px-4 mb-8 mx-auto ">
            <div className="text-sm text-gray-700 py-1">
                Made with <a className="text-gray-700 font-semibold" href="https://david-ui-angular.com/?ref=tailwindcomponents" target="_blank">David UI Angular</a> by <a href="https://www.creative-tim.com?ref=tailwindcomponents" className="text-gray-700 font-semibold" target="_blank"> Creative Tim</a>.
            </div>
        </div>
        
    </section>
    
</div>

    
          <footer className="py-10 -mt-10 lg:mt-0 w-screen flex flex-col space-y-10 justify-center bg-gradient-to-r from-[#FFBD59] via-gray-200 to-[#FFBD59]">
    
          <nav className="flex justify-center flex-wrap gap-6 text-gray-500 font-medium">
        <Link className="text-black hover:text-gray-500" href="/">Home</Link>
        <Link className="text-black hover:text-gray-500" href="/product">Products</Link>
        <Link className="text-black hover:text-gray-500" href="/service">Services</Link>
        <Link className="text-black hover:text-gray-500" href="/about">About</Link>
        <Link className="text-black hover:text-gray-500" href="/contact">Contact</Link>
    </nav>
    
    <div className="flex justify-center space-x-5">
        <Link href="https://www.facebook.com/MinervaSalesCorp" target="_blank" rel="noopener noreferrer">
            <Image src="/fblogo.webp" alt = "" width={20} height={10}/>
       </Link>
      
    </div>
    <p className="text-center text-gray-700 font-medium">&copy; 2023 Minerva Sales Corporation. All rights reserved.</p>
    </footer>
    
    
    </>
      )
    }
    
    (About as PageWithLayout).layout = HomePageLayout
    export default About
