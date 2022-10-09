import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"


const Register = () => {
	const navigate = useNavigate()
const [inputs, setInputs]=React.useState({
	username:"",
	email:"",
	password:""
})
const [err, setErr]=React.useState(null)

const handChange = (e) => {
	setInputs((prev)=>({...prev, [e.target.name]:e.target.value}))
}



const handleSumbit = async (e) => {
e.preventDefault()
try {
	await axios.post('http://localhost:8800/api/auth/register', inputs)
	navigate("/login")
} catch (error) {
	setErr(error.response.data)

}

}

	return (
		<div className='w-screen h-screen  bg-slate-300 flex justify-center '>
			<div className='w-72 h-[420px] rounded-md flex flex-col items-center gap-3 px-3 sm:shadow-lg sm:shadow-slate-400 mt-44'>
				<h1 className='text-5xl font-semibold mt-8'>Register</h1>
				<form className='w-full h-full flex flex-col  gap-3 mb-2'>
					<input
						onChange={handChange}
						required
						name='username'
						type='text'
						placeholder='Username'
						className='w-full h-10 rounded-md pl-3 shadow-md shadow-slate-500 mt-6 cursor-pointer'
					/>
					<input
						onChange={handChange}
						required
						name='email'
						type='email'
						placeholder='Email'
						className='w-full h-10 rounded-md pl-3 shadow-md shadow-slate-500  cursor-pointer'
					/>
					<input
						onChange={handChange}
						required
						name='password'
						type='password'
						placeholder='Password'
						className='w-full h-10 rounded-md pl-3 shadow-md shadow-slate-500 cursor-pointer'
					/>
					{err && <p className='text-red-500'>{err}</p>}
					<button
						onClick={handleSumbit}
						className=' shadow-md hover:shadow-slate-500 px-10 py-2  bg-gradient-to-t from-slate-400 to-slate-300 rounded-md  hover:border-slate-400 font-semibold mt-8 '
					>
						Register
					</button>

					<div>
						<p className='text-sm font-semibold'>
							Do you have an account?
							<Link to='/login'>
								<span className='text-green-500 underline cursor-pointer'>
									Login
								</span>
							</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Register