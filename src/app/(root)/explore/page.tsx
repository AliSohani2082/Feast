import { Card } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import Image from "next/image";
import { PostItem } from "./components/postItem";
import { redirect } from "next/navigation";
import ExploreComp from "./components/exploreComp";
import { getPosts } from "@/lib/api";

export type PostType = {
  id: number,
  name: string,
  likeCount: number,
  description: string,
  imageUrl: string,
  creator: string,
  creatorImageUrl: string,
}

const ExplorePage = async () => {
  // const testPost: PostType[] = [
  //   {
  //     id: 1,
  //     name: "Food",
  //     likeCount: 0,
  //     description: "this is my food",
  //     imageUrl: "",
  //     creator: "Ali Sohani",
  //     creatorImageUrl: "" 
  //   },
  //   {
  //     id: 2,
  //     name: "another Food",
  //     likeCount: 0,
  //     description: "this is my other food",
  //     imageUrl: "",
  //     creator: "Ali Sohani",
  //     creatorImageUrl: "" 
  //   }
  // ]
  const RawPosts = await getPosts()
  const posts = JSON.parse(RawPosts.data).map((rp: Array<any>) => ({
    id: rp[0],
    name: rp[2],
    description: rp[3],
    imageUrl: rp[4],
    likeCount: rp[5],
    creator: rp[6],
    creatorImageUrl: rp[7]

  }))
  
  
  return (
    <div className="m-3">
      <ExploreComp data={posts}/>
    </div>
  );
};

export default ExplorePage