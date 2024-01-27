'use client'
import React from 'react'

import { PostType } from '../page'
import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { getComments, getPost, getUserById } from '@/lib/api'
import { ingredient } from '@/lib/validation'
import LikeComp from './LikeComp'
import Link from 'next/link'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Separator } from '@/components/ui/separator'
import CommentSection from './CommentSection'
import { ScrollArea } from '@/components/ui/scrollArea'
import { Input } from '@/components/ui/input'
import Loader from '@/components/shared/Loader'
import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'


type Props = {
  postId: string
}

const PostComp = ({ postId }: Props) => {
  const router = useRouter()
  const { isAuthenticated, user } = useAuth()
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState<PostType | null>(null);
  const [creator, setCreator] = useState<any | null>(null);
  console.log(comments)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const commentsResponse = await getComments(Number(postId));
        const postRaw = await getPost(postId);
        const postObject = JSON.parse(postRaw.data);

        const creatorRaw = await getUserById(`${postObject.post[0][1]}`);
        const creatorObject = creatorRaw.data[0];
        

        
        const post: PostType = {
          id: postObject.post[0][0],
          name: postObject.post[0][2],
          description: postObject.post[0][3],
          imageUrl: postObject.post[0][4],
          creatorId: postObject.post[0][1],
          creatorName: creatorObject[4],
          creatorImageUrl: creatorObject[5],
          ingredients: postObject.ingredient.map((ing: any) => ({
            name: ing[0],
            amount: Number(ing[2]),
            amountType: ing[1] || ""
          })),
          steps: postObject.step.sort((a:any, b: any) => Number(a[1]) - Number(b[1])).map((step: any) => ({
            number: Number(step[1]),
            instruction: step[0],
          }))
        }

        setComments(JSON.parse(commentsResponse.data).map((comment: any) => ({
          username: comment.username,
          content: comment.content,
          porfile_image: comment.profile_image
        })));
        setPost(post);
        setCreator(creatorObject);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [postId]);

  if (!post || !creator) {
    // You might want to add loading logic here
    return <Loader/>;
  }
  
  return (
    <div className='w-full h-full p-10 m-10 flex flex-row justify-around items-stretch'>
      <div className='flex flex-col w-2/5 justify-stretch items-start'>
        <img src={post.imageUrl} className='w-[500px] rounded-xl h-[500px] bg-gray-600'/>
        <div className='flex flex-row justify-between items-start w-full mt-5'>
          <div className='flex flex-col justify-start items-start gap-2'>
            <span className='text-2xl font-bold'>{post.name}</span>
            <p className=''>{post.description}</p>
            <Link href={`/user/${post.creatorName}`} className='flex justify-center items-center gap-2'>
              <img src={post.creatorImageUrl} className='rounded-full w-10 h-10 bg-gray-300'/>
              <span className='text-xl font-bold'>{post.creatorName}</span>
            </Link>
          </div>
          <div className='flex flex-col items-center justify-center gap-2'>
            <LikeComp username={post.creatorName}/>
            {isAuthenticated && user?.username === post.creatorName && (
              <Button variant='default' 
              onClick={() => router.push(`/post/${post.id}/edit`)} 
              className='shad-button_ghost w-full flex justify-between items-center'>
                <Edit/>
                <span>Edit Post</span>
              </Button>
            )}
          </div>
        </div>
      </div>
      <ScrollArea className='flex overflow-auto flex-col pl-5 justify-start items-start gap-2 w-1/2'>
        <div className='w-full'>
          <span className='mx-4 mt-10 text-xl'>Ingredients</span>
          <Table>
            <TableCaption>A list of Ingredients included in this post</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Amount Unit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {post.ingredients.map((ing) => (
                <TableRow key={ing.name}>
                  <TableCell>{ing.name}</TableCell>
                  <TableCell>{ing.amount}</TableCell>
                  <TableCell>{ing.amountType}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Separator className='mt-10 mb-4'/>
        <span className='mx-4 text-xl'>Instruction</span>
        <div className='flex flex-col gap-2 justify-start items-stretch w-full'>
          {post.steps.map((step) => (
            <Card key={step.number} className='w-full p-5'>
              <span className='font-bold'>Step {step.number}:</span>
              <p>{step.instruction}</p>
            </Card>
          ))}
        </div>
        <Separator className='mt-10 mb-4'/>
        <span className='mx-4 text-xl'>Comments</span>
        <CommentSection username={post.creatorName} comments={comments} postId={Number(post.id)} userId={post.creatorId}/>
        
      </ScrollArea>   
    </div>
  )
}

export default PostComp