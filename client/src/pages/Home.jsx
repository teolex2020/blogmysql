import React , {useState} from 'react'
import { useEffect } from 'react'
import axios from "axios"
import {useLocation, Link} from "react-router-dom"


const Home = () => {

	const cat = useLocation().search
	

const [posts, setPosts] = useState([])


useEffect(()=>{
const fethcData = async ()=>{
	try {
		const res = await axios.get(`http://localhost:8800/api/posts/${cat}`)
		setPosts(res.data)
	} catch (error) {
		console.log(error)
	}
}
fethcData()
}, [cat])


	return (
		<div>
			<div className='container mx-auto px-16  '>
				{posts ? (
					posts.map((post) => (
						<div
							className='flex flex-col sm:flex-row mt-10 sm:mt-24 gap-16  sm:odd:flex-row-reverse w-full '
							key={post.id}
						>
							<div className='sm:min-w-[400px] relative'>
								<img
									src={post.img}
									className='object-cover max-h-[400px] min-w-[400px] z-10'
								></img>
								<div className='w-full h-full bg-slate-400 absolute -top-2 -right-2 -z-10 opacity-60 min-w-[400px]'></div>
								<div className='w-full h-full bg-slate-400 absolute -top-4 -right-4 -z-10 opacity-60 min-w-[400px]'></div>
							</div>
							<div className='space-y-10 w-full'>
								<h2 className='font-semibold text-3xl'>{post.title}</h2>
								<div className='text-slate-400'>{post.desc}</div>
								<Link to='/post/:id'>
									<button className='border border-slate-300 px-8 py-2 font-semibold text-xl rounded-md mt-4 shadow-lg hover:shadow-xl hover:shadow-slate-300 hover:-translate-y-1 duration-300 text-slate-400 hover:text-slate-600'>
										Read more...
									</button>
								</Link>
							</div>
						</div>
					))
				) : (
					<div>No posts</div>
				)}
			</div>
		</div>
	)
}

export default Home
