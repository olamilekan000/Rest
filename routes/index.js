let router = require('express-promise-router')();
const controllers = require('../controllers/index')
const passport = require('passport')

router.route('/signin')
	.post(controllers.signin)

router.route('/login')
	.post(passport.authenticate('local', { session: false }), controllers.login)

router.route('/countries')
	.get(controllers.allCountries)

router.route('/countries')
	.put(controllers.addCountry)	

router.route('/countries')
	.delete(controllers.deleteCountry)

module.exports = router