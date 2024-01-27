'use client'

import Loader from '@/components/shared/Loader'
import { getUser } from '@/lib/api'
import React, { useState, useEffect } from 'react'

type Props = {
  userId: string
}

const UserComp = ({ userId }: Props) => {
  const [data, setData] = useState()
  console.log('dd')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const Data = await getUser(userId)
        console.log("dddd")
        setData(JSON.parse(Data.data))
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]);
  if(!data) return <Loader/>

  return (
    <div>UserComp</div>
  )
}

export default UserComp