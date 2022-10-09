import React, {useEffect, useState} from 'react'
import axios from "axios"
export const Menu = ({cat}) => {
const [post, setPost]=useState([])

useEffect(()=>{
  const fetchData = async ()=>{
    try {
      const res = await axios.get(`http://localhost:8800/api/posts/?cat=${cat}`)
      setPost(res.data)
    } catch (error) {
      console.log(err)
    }
  }
  fetchData()
},[cat])

  return (
		<div className='flex flex-col w-52'>
			<h1 className='font-bold text-3xl'>Other post</h1>
			{post.map((e) => (
				<div key={e.id} className='w-full flex flex-col mt-4 items-center'>
					<img src={`../../public/upload/$(post?.img)`} className='object-cover h-[200px] w-full' />
					<h2 className='text-slate-500 text-2xl'>{e.title}</h2>
					<button className='border border-slate-300 px-2 py-2 font-semibold text-xl rounded-md mt-4 shadow-lg hover:shadow-xl hover:shadow-slate-300 hover:-translate-y-1 duration-300 text-slate-400 hover:text-slate-600 '>
						Read more...
					</button>
				</div>
			))}
		</div>
	)
}

export default Menu