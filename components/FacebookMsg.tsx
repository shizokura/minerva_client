"use client";

import React from 'react'
import { FacebookProvider, CustomChat } from 'react-facebook';

const FacebookMsg = () => {
  return (
    <FacebookProvider appId="1050831112784192" chatSupport>
    <CustomChat pageId="391100620918058" minimized={true}/>
  </FacebookProvider>
  )
}

export default FacebookMsg