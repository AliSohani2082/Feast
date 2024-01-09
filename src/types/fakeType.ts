export type Post = {
  id: string;
  imageUrl: string;
  creator: {
    id: string,
    name: string,
    imageUrl: string,
  };
  likes: {
    id: string
  }[]
}
