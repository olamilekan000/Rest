const passport = require('passport')
const { users } = require('./model')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const _ = require('lodash')

// jwt
passport.use(new JwtStrategy({
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: 'secret'
}, async (payload, done) => {
	try{
		const user = await _.find(users, payload.sub)

		if(user){
			return done(null, user);
		}else{
			return done(null, false);
		}	

	}catch(err){
		return done(err)
	}
}))


// LOCAL STRATEGY
passport.use( new LocalStrategy({
	usernameField: 'name'
}, async (name, password, done) => {

	try{
		console.log(users)
		console.log({name})
		let signedUser = await _.find(users, { name })

		if (!signedUser) {
			return done(null, false, { message: 'Incorrect name.' });
		}

		return done(null, signedUser);
	}catch(error){
		return done(error);
	}
}))

// you can use this jwt to login

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJvbGEiLCJpYXQiOjE1NDc2NTcxNzkyNjksImV4cCI6MTU0Nzc0MzU3OTI2OX0.WCdQqujRavMxnkbu9BjHnHcQq87Nd08TsFoFXcCstp0