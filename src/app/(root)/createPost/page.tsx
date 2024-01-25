import React from 'react'
import CreatePostForm from './components/CreatePostForm'

const CreatePostPage = ({
  params
}: {
  params: { postId: string }
}) => {
 
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <CreatePostForm/>
    </div>
  )
}

export default CreatePostPage