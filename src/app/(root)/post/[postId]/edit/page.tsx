import React from 'react'
import UpdateComp from './updateComp'

type Props = {
  params: {
    postId: string
  }
}

const UpdatePage: React.FC<Props> = ({ params }) => {
  
  return (
    <UpdateComp postId={params.postId}/>
  )
}

export default UpdatePage