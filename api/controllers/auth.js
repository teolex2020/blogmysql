import { db } from '../db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
	//CHECK EXISTING USER
	const q = 'SELECT * FROM users WHERE email = ? OR username = ?'
	try {
		const { password } = req.body
		const salt = await bcrypt.genSaltSync(10)
		const hash = await bcrypt.hashSync(password, salt)

		db.query(q, [req.body.email, req.body.username], (err, data) => {
			if (err) return res.status(500).json(err)
			if (data.length) return res.status(409).json('User already exists!')

			//Hash the password and create a user
			const values = [req.body.username, req.body.email, hash]
			const q = 'INSERT INTO users(`username`,`email`,`password`) VALUES (?)'

			db.query(q, [values], (err, data) => {
				if (err) return res.status(500).json(err)
				return res.status(200).json('User has been created.')
			})
		})
	} catch (error) {
		console.log(error)

		res.status(401).json({ message: 'Failed to add user' })
	}
}
export const login = (req, res) => {
	const q = 'SELECT * FROM users WHERE username = ?'
	db.query(q, [req.body.username], (err, data) => {
		console.log(data[0])
		if (err) return res.json(err)
		if (data.length === 0) return res.status(404).json('User not found')

		const isPasswordCorrect = bcrypt.compareSync(
			req.body.password,
			data[0].password
		)

		if (!isPasswordCorrect)
			return res.status(400).json('wrong username or password')

		const token = jwt.sign({ id: data[0].id }, 'jwtkey')
		const { password, ...other } = data[0]
		res
			.cookie('access_token', token, { httpOnly: true })
			.status(200)
			.json(other)
	})
}

export const logout = (req, res) => {
	res
		.clearCookie('access_token', {
			sameSite: 'none',
			secure: true,
		})
		.status(200)
		.json('User has been logged out.')
}
