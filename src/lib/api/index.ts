import { INewPost, INewUser, Ilogin } from "@/types";
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000", withCredentials: true });

// API.interceptors.request.use((req: any) => {
//   if (localStorage.getItem("profile")) {
//     req.headers.Authorization = `Bearer ${
//       JSON.parse(localStorage.getItem("profile") || "").token
//     }`;
//   }

//   return req;
// });

// api requests
// export const fetchPostsBySearch = (searchQuery) =>
//   API.get(
//     `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
//       searchQuery.tags
//     }`
//   );
export const createPost = (newPost: INewPost) => API.post("/posts", newPost);
// export const updatePost = (id, updatedPost) =>
//   API.patch(`/posts/${id}`, updatedPost);
// export const deletePost = (id) => API.delete(`/posts/${id}`);
// export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (formData: Ilogin) => API.post("/users/signin", formData);
export const signUp = (formData: INewUser) => API.post("/users/signup", formData);

export const getIngredients = () => API.get("/ingredients");