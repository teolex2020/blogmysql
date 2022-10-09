import React from 'react'
import Logo from "../img/wing.png"
import {Link} from "react-router-dom"
import { AuthContext } from '../context/authContext'

const Navbar = () => {
const { currentUser, logout } = React.useContext(AuthContext)

  return (
		<div>
			<div className='container mx-auto flex items-center justify-between px-5 py-6'>
				<div className=''>
					<Link to='/'>
						<img src={Logo} alt='LOGO' width={60} height={60} />
					</Link>
				</div>
				<div className='flex gap-5 items-center'>
					<ul className='flex gap-5 font-semibold'>
						<Link to=''>
							<li>ART</li>
						</Link>
						<Link to=''>
							<li>SCIENCE</li>
						</Link>
						<Link to=''>
							<li>TECHNOLOGY</li>
						</Link>
						<Link to=''>
							<li>CINEMA</li>
						</Link>
						<Link to=''>
							<li>DESIGN</li>
						</Link>
						<Link to=''>
							<li>FOOD</li>
						</Link>
					</ul>
					<div className='flex gap-5 justify-center items-center'>
						<span>{currentUser ? currentUser.username : 'Account'}</span>
						{currentUser ? <span onClick={logout} className="cursor-pointer"> Logout </span> : <Link to="/login">Login</Link>}
						<span className='w-16 h-16 bg-slate-400 flex justify-center items-center rounded-full border border-slate-500 text-white hover:bg-white hover:text-black duration-500 font-semibold'>
							<Link to='/write'>Write</Link>
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Navbar