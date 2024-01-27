import React, { cache } from 'react'
import { CreatePostForm } from './components/CreatePostForm'
import { getIngredients } from '@/lib/api'

type Props = {}

const createPostPage = async (props: Props) => {
  
  const ingredients = cache(async () => {
    const ingredientsItem: any = await getIngredients()
    return ingredientsItem.data
  })

  // const ingredientsData = await ingredients()
  
  return (
    <div className='flex flex-col w-3/4 items-center justify-center'>
      <CreatePostForm/>
    </div>
  )
}

export default createPostPage