'use client'
import { CreatePostForm } from '@/app/(root)/createPost/components/CreatePostForm'
import { getPost } from '@/lib/api'
import { IPost } from '@/types'
import React, { useEffect } from 'react'

type Props = {
  postId: string
}

const UpdateComp = ({ postId }: Props) => {
  const [post, setPost] = React.useState<IPost>()
  const [ingredients, setIngredients] = React.useState<{
    amountType: string
    ingredientId: string;
    amount: number;
  }[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const postRaw = await getPost(postId)
      console.log('dd')
      const postData = JSON.parse(postRaw.data)
      setPost({
        // id: Number(postId),
        name: postData.post[0][2],
        description: postData.post[0][3],
        imageUrl: postData.post[0][4],
        steps: postData.step.sort((a: any, b: any) => a[1] - b[1]).map((step: any) => step[0]),
        ingredients: postData.ingredient.map((ingredient: any) => ({
          name: ingredient[0],
          amount: ingredient[2],
          amountType: ingredient[1] || '',
        })),
      })
    }
    fetchData()
  }, [postId])
  
  return (
    <CreatePostForm initialData={post} ingredientsData={ingredients}/>
  )
}

export default UpdateComp