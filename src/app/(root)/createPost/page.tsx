import React from 'react'
import { CreatePostForm } from './components/CreatePostForm'

type Props = {}

const createPostPage = (props: Props) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <CreatePostForm/>
    </div>
  )
}

export default createPostPage