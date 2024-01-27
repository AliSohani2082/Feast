'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { createComment } from '@/lib/api'
import { useAuth } from '@/context/AuthContext'
import { redirect } from 'next/navigation'
import Link from 'next/link'

type CommentSectionProps = {
  userId: number
  username: string
  comments: any
  postId: number
}

const CommentSection: React.FC<CommentSectionProps> = ({ username, comments, postId, userId }) => {
  const { user, isAuthenticated } = useAuth()
  const [commentText, setCommentText] = useState<string>("")
  return (
    <>
      <div className='mb-2 w-full flex flex-row justify-center items-center gap-2'>
        <Input value={commentText} onChange={(e) => setCommentText(e.target.value)} className='flex-1' placeholder='Tell use what you think about this post...'/>
        <Button
          onClick={async () => {
            if (!isAuthenticated) {
              redirect('/sign-up')
            }
            const result = await createComment({
              userid: Number(user?.id),
              postid: postId,
              content: commentText,
            })
            result
          }}
        >
          Comment
        </Button>
      </div>
      <div className='flex flex-col gap-2 justify-start items-stretch w-full'>
        {comments.map((cm: {
          username: string,
          profile_image: string,
          content: string
        }) => {
          // const userRaw = await getUserById(comment.userId)
          // const user = JSON.parse(userRaw.data)
          // console.log("user:.............", user)
          return (
            <Card className='flex flex-row p-3 justify-start items-center w-full' key={cm.username}>
              <div className='flex flex-row justify-start items-center gap-2'>
                <Link href={`/user/${cm.username}`}>
                  <img className='w-8 h-8 rounded-full' src={cm.profile_image} />
                </Link>
                <div className='flex flex-col justify-start items-start'>
                  <span className='text-sm'>{cm.username}</span>
                  <span className='text-xs'>{cm.content}</span>
                </div>
              </div>
            </Card>
          )  
        })}
      </div>
    </>
  )
}

export default CommentSection