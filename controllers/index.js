const  JWT = require('jsonwebtoken')
const { users, countries } = require('../model')

// jwt
let token = newUser => {
	return JWT.sign({
		iss: 'ola',
		sub: newUser._id,
		iat: new Date().getTime(),
		exp: new Date().setDate( new Date().getDate() + 1)
	}, 'secret');	
}

module.exports = {
	signin: (req, res) => {
		console.log([...users, req.body])
		let authToken = token(req.body);
		res.json({
			Bearer: authToken
		})
	},
	login: async (req, res) => {
		console.log("I got here!")
	},
	addCountry: (req, res) => {
		res.json({
			countries: [...countries, req.body.country]
		})
	},
	allCountries: (req, res) => {
		res.json({ countries })
	},
	deleteCountry: (req, res) => {
		const { country } = req.body
		const result = countries.filter(filterCounty => filterCounty !== country)
		res.json({ country: result })
	}
}