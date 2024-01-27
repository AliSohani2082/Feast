"use client"
import React, { useState } from 'react'
import { PostType } from '../page'
import { PostItem } from './postItem'
import { Input } from '@/components/ui/input'

type ExploreCompProps = {
  data: PostType[]
}

const ExploreComp: React.FC<ExploreCompProps> = ({ data }) => {
  const [search, setSearch] = useState<string>()

  return (
    <div>
      <Input
        placeholder="search through posts"
        className='mb-4'
        value={search}
        onChange={(e) => setSearch(e.target.value)}  
      />
      <div className="explore-container overflow-auto flex flex-row flex-wrap justify-start gap-4">
        {data.filter((tp) => tp.name.includes(search || "") || tp.creator.includes(search || "")).map((tp, index) => (
          <PostItem key={index} item={tp}/>
        ))}
      </div>
    </div>
  )
}

export default ExploreComp