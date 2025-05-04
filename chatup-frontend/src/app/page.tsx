"use client"
import React from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import LoadingPage from './loading/page'

const Page = () => {
  const [isLoading, setIsloading] = useState(true);
  const router = useRouter()

  //set loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsloading(false); // Stop loading after 4 seconds
      router.push("/login"); // Navigate to the login page
    }, 4000);

    // Clean up the timer
    return () => clearTimeout(timer);
  }, [router]);

  
  
  //display loading page during delay
  if (isLoading) {
    return<LoadingPage/>
  }
  return null
}

export default Page
