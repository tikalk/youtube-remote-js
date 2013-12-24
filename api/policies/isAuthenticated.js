/**
 * isAuthenticated
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {
	// User is allowed, proceed to controller
	var is_auth = req.isAuthenticated();
	if (is_auth) {
		return next();
	// User is not allowed
	} else {
		return res.redirect("/login");
	}
};
