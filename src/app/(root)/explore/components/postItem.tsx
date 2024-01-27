'use client'

import React, { useState } from 'react'
import { Heart } from 'lucide-react'
import { PostType } from '../page'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

type PostItemProps = {
  item: PostType
}

export const PostItem: React.FC<PostItemProps> = ({ item }) => {
  const [liked, setLiked] = useState<boolean>(false)
  const router = useRouter()

  return (
    <div className="w-[300px] cursor-pointer hover:opacity-90">
      <img alt={item.imageUrl} src={item.imageUrl} className="w-full h-[150px] bg-gray-300 mb-3" onClick={() => router.push(`/post/${item.id}`)}/>
      <div className="flex flex-row justify-between items-start">
        <Link href={`/user/${item.creator}`} className="w-10 h-10 bg-gray-300 rounded-full mx-4">
          <img alt="" src={item.creatorImageUrl}/>
        </Link>
        <div className="flex flex-col justify-center items-start gap-1">
          <span className="gruncate text-1xl font-semibold">{item.name}</span>
          <span>{item.creator}</span>
        </div>
        <Button
          onClick={() => setLiked(curr => !curr)}
          className='rounded-full m-3'
          variant={liked ? "default" : "ghost"}
        >
          <Heart />
        </Button>
      </div>
    </div>
  )
}
