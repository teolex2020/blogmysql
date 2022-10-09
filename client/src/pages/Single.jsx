import React from 'react'
import axios from 'axios'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import moment from 'moment'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext.jsx'
import Menu from '../components/Menu.jsx'
import DOMPurify from 'dompurify'



const Single = () => {
	const [post, setPost] = React.useState({})

	const navigate = useNavigate()
	const location = useLocation()
	const postId = location.pathname.split('/')[2]

	const { currentUser } = useContext(AuthContext)
console.log(currentUser)


	React.useEffect(() => {
		const fetchPost = async () => {
			try {
				const res = await axios.get(`http://localhost:8800/api/posts/${postId}`)
				setPost(res.data)
			} catch (error) {
				console.log(error)
			}
		}
		fetchPost()
	}, [postId])

	const handleDelete = async () =>{
		try {
			await axios.delete(`http://localhost:8800/api/posts/${postId}`)
		} catch (error) {
			console.log(error)
		}
	}

	const getText = (html)=>{
		const doc = new DOMParser().parseFromString(html, "text/html")
return doc.body.textContent
	}

	return (
		<div className='container mx-auto flex gap-5'>
			<div className='flex w-3/4 flex-col border-r border-slate-300 px-3'>
				<div className=' '>
					<img
						src={`../upload/${post?.img}`}
						alt=''
						className='object-cover h-[300px] w-full'
					/>
				</div>
				<div className='flex items-center gap-5 justify-between mt-8'>
					<div className='flex gap-4'>
						{post.userImg && (
							<img
								width={50}
								height={50}
								alt=''
								className='rounded-full'
								src={post.userImg}
							/>
						)}
						<div>
							<span>{post.username}</span>
							<p className='text-sm'>Posted {moment(post.day).fromNow()}</p>
						</div>
					</div>
					<div className='flex gap-2'>
						{currentUser.username === post.username && (
							<Link to={`/write?edit=2`} state={post}>
								<svg
									className='w-6 h-6 cursor-pointer'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										fillRule='evenodd'
										d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
										clipRule='evenodd'
									/>
								</svg>
							</Link>
						)}
						<svg
							onClick={handleDelete}
							className='w-6 h-6 cursor-pointer'
							fill='currentColor'
							viewBox='0 0 20 20'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
						</svg>
					</div>
				</div>
			</div>
			<h1>{post.title}</h1>
			<p
				dangerouslySetInnerHTML={{
					__html: DOMPurify.sanitize(post.desc),
				}}
			></p>
			<div>
				<Menu cat={post.cat} />
			</div>
		</div>
	)
}

export default Single
