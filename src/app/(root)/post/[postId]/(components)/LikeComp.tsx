'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'

type LikeCompPrps = {
  username: string,
}

const LikeComp: React.FC<LikeCompPrps> = ({ username }) => {

  const [liked, setLiked] = useState<boolean>(false)

  return (
    <Button className='rounded-full m-3' variant={liked ? "default" : "outline"} onClick={() => setLiked(curr => !curr)}>
      <Heart/>
    </Button>
  )
}

export default LikeComp