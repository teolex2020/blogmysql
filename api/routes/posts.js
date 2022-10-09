import express from "express"
import { getPosts, getPost, deletePost, updatePost, addPost } from "../controllers/post.js"
const route = express.Router()



route.get("/", getPosts)
route.get('/:id', getPost)
route.post('/', addPost)
route.delete('/:id', deletePost)
route.put('/:id', updatePost)


export default route