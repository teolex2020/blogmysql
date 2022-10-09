import React, {useState} from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import moment from 'moment'


const Write = () => {
	const state = useLocation().state

const [value, setValue] = useState(state?.title || '')
const [title, setTitle] = useState(state?.desc || '')
const [file, setFile] = useState(null)
const [cat, setCat] = useState(state?.cat || '')

 const navigate = useNavigate()

const upload = async()=>{
	try {
		const formData = new FormData()
		formData.append("file", file)
		const res = await axios.post("http://localhost:8800/api/upload", formData)
		return res.data
	} catch (error) {
		console.log(err)
	}
}

const handleClick = async()=>{
	e.preventDefault()
	const imgUrl = await upload()
	 try {
			state
				? await axios.put(`http://localhost:8800/api/posts/${state.id}`, {
						title,
						desc: value,
						cat,
						img: file ? imgUrl : '',
				  })
				: await axios.post(`/posts/`, {
						title,
						desc: value,
						cat,
						img: file ? imgUrl : '',
						date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
				  })
			navigate('/')
		} catch (err) {
			console.log(err)
		}
}

	return (
		<div className='flex w-screen h-full container mx-auto gap-5'>
			<div className='flex w-3/4 flex-col flex-1'>
				<input
					type='text'
					className='border border-slate-300 h-10 w-full pl-5'
					placeholder='Title'
				/>
				<ReactQuill
					theme='snow'
					value={value}
					onChange={setValue}
					className='h-full '
				/>
				;
			</div>
			<div className=' w-1/4 '>
				<div className='  shadowOne flex flex-col p-2 mb-10'>
					<h1 className='font-bold text-3xl '>Publish</h1>
					<span>
						<b>Status: </b> Draft
					</span>
					<br />
					<span>
						<b>Visibility: </b> Public
					</span>
					<br />
					<input type='file' id='fileSave' className='hidden' />
					<label htmlFor='fileSave' className=' underline cursor-pointer'>
						Upload image
					</label>
					<br />
					<div className='flex justify-between gap-5 text-lime-900 font-bold '>
						<button className='border px-2 py-0  h-10 w-36 '>
							Save as a draft
						</button>
						<button className='border px-2 py-0 h-10' onClick={handleClick}>
							Publish
						</button>
					</div>
				</div>
				<div className='shadowOne p-3'>
					<h1 className='font-bold text-3xl mb-3'>Category</h1>
					<div className='flex text-lime-900 font-semibold gap-3 cursor-pointer'>
						<input
							type='radio'
							name='cat'
							checked={cat === 'art'}
							onChange={(e) => setCat(e.target.value)}
							value='art'
							id='art'
						/>
						<label htmlFor='art'>Art</label>
					</div>
					<div className='flex text-lime-900 font-semibold gap-3 cursor-pointer'>
						<input
							type='radio'
							name='cat'
							checked={cat === 'science'}
							onChange={(e) => setCat(e.target.value)}
							value='science'
							id='science'
						/>
						<label htmlFor='science'>Science</label>
					</div>
					<div className='flex text-lime-900 font-semibold gap-3 cursor-pointer'>
						<input
							type='radio'
							name='cat'
							checked={cat === 'technology'}
							onChange={(e) => setCat(e.target.value)}
							value='technology'
							id='technology'
						/>
						<label htmlFor='technology'>Technology</label>
					</div>
					<div className='flex text-lime-900 font-semibold gap-3 cursor-pointer'>
						<input
							type='radio'
							name='cat'
							checked={cat === 'cinema'}
							onChange={(e) => setCat(e.target.value)}
							value='cinema'
							id='cinema'
						/>
						<label htmlFor='cinema'>Cinema</label>
					</div>
					<div className='flex text-lime-900 font-semibold gap-3 cursor-pointer'>
						<input
							type='radio'
							name='cat'
							checked={cat === 'design'}
							onChange={(e) => setCat(e.target.value)}
							value='design'
							id='design'
						/>
						<label htmlFor='design'>Design</label>
					</div>
					<div className='flex text-lime-900 font-semibold gap-3 cursor-pointer'>
						<input
							type='radio'
							name='cat'
							checked={cat === 'food'}
							onChange={(e) => setCat(e.target.value)}
							value='food'
							id='food'
						/>
						<label htmlFor='food'>Food</label>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Write
