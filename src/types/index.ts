export type INavLink = {
  icon: string;
  route: string;
  label: string;
};

export type IUpdateUser = {
  userId: string;
  name: string;
  bio: string;
  imageId: string;
  imageUrl: URL | string;
  file: File[];
};

export type INewPost = {
  userid: string;
  title: string;
  description: string;
  image: string;
  ingredient: Ingredient[]
  step: Step[]
};

export type IUpdatePost = {
  postId: string;
  caption: string;
  imageId: string;
  imageUrl: URL;
  file: File[];
  location?: string;
  tags?: string;
};

export type IUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  bio: string;
};

export type INewUser = {
  full_name: string;
  email: string;
  password: string;
  username: string;
  profile_image: string;
  phone_number: string;
};

export type Ilogin = {
  username: string;
  password: string;
}

// Database
export type Step = {

}

export type Ingredient = {

}

export type Post = {
  id: string;
  imageUrl: string;
  creator: Creator;
  likes: User[];
};

export type Creator = {
  id: string;
  name: string;
  imageUrl: string;
};

export type User = {
  id: string;
};
export type Session = {};
