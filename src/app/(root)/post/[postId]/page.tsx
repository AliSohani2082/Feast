import PostComp from "./(components)/PostComp"

type PostIdPageProps = {
  params: {
    postId: string
  }
}

export type PostType = {
  id: number,
  name: string,
  description: string,
  imageUrl: string,
  creatorName: string,
  creatorId: number,
  creatorImageUrl: string,
  ingredients: {
    name: string,
    amount: number,
    amountType: string,
  }[],
  steps: {
    number: number,
    instruction: string,
  }[]
}

const PostIdPage: React.FC<PostIdPageProps> = ({ params }) => {
  return (
    <PostComp postId={params.postId}/>
  )
}

export default PostIdPage