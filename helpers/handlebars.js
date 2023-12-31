const moment = require("moment");

moment.locale("fr");
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
function list_article(articles = [], opts) {
	const articleName = articles.map((a) => a.name);
	return articleName.join("+");
}
/**
 *  Tenir compte du format de moment
 * @param {string} date
 * @param {string} format
 */
function dateFormat(date, date_format = "LL") {
	return moment(date).format(date_format.toString());
}
/**
 *
 * @param {number} val1
 * @param {number} val2
 * @param {string} operator
 * @returns
 */
function calculate(val1, val2, operator) {
	switch (operator) {
		case "multi":
			return val1 * val2;
		case "plus" || "add":
			return val1 + val1;
		case "minus" || "subs":
			return val1 - val2;
		case "div" || "division":
			return val1 / val2;
		case "modulo":
			return val1 % val2;
		default:
			return val1 + val2;
	}
}
module.exports = {
	if_admin,
	if_role,
	list_article,
	dateFormat,
	calculate,
};
