/**
 *
 * @param {*} user
 * @param {*} opts
 * @returns
 */
function if_admin(user, opts) {
	if (user["Role.isAdmin"]) {
		return opts.fn(this);
	}
}
/**
 *
 * @param {*} user
 * @param {*} value
 * @param {*} opts
 * @returns
 */
function if_role(user, value, opts) {
	if (
		String(user["Role.name"]).toLocaleLowerCase() ===
			String(value).toLocaleLowerCase() ||
		user["Role.isAdmin"]
	) {
		return opts.fn(this);
	} else return opts.inverse(this);
}

module.exports = {
	if_admin,
	if_role,
};
