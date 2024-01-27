import React from 'react'
import UserComp from './(components)/UserComp'

type UserPageProps = {
  params: {
    userId: string,
  }
}

const UserPage: React.FC<UserPageProps> = ({ params }) => {
  return (
    <UserComp userId={params.userId}/>
  )
}

export default UserPage